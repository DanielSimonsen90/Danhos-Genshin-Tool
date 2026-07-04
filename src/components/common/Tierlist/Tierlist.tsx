import { useEffect, useMemo, useRef, useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, closestCenter, pointerWithin, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
// @ts-ignore
import isEqual from 'lodash/fp/isEqual';

import { generateId } from '@/common/functions/random';
import useOnChange from '@/hooks/useOnChange';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { FormTier, Tier as TierComponent, TierModifyForm } from './components';
import { Entry, Tier, TierlistProps } from './TierlistTypes';
import { getDefaultTiers, generateBlankTier, generateEntry, getDefaultUnsortedTier } from './TierlistFunctions';
import { useStateReset } from '@/hooks/useStateReset';
import useKeybind from '@/hooks/useKeybind';

export default function Tierlist<T, TStorageData extends object>({
  model, items,
  onSearch, onTierChange, onEntryChange,
  ...props
}: TierlistProps<T, TStorageData>) {
  const storageKey = 'storageKey' in props ? props.storageKey ?? '' : 'storage' in props ? props.storage?.key ?? '' : '';
  const onStorageLoaded = 'onStorageLoaded' in props ? props.onStorageLoaded : undefined;
  const onStorageSave = 'onStorageSave' in props ? props.onStorageSave : undefined;
  const [tiers, setTiers, resetTiers] = useStateReset(() => {
    if (!props.defaultTiers) return getDefaultTiers(items);
    const itemsNotIncluded = items.filter(item => !props.defaultTiers?.some(tier => tier.entries.some(entry => {
      if (typeof entry === 'object') return JSON.stringify(entry.item) === JSON.stringify(item);
      return entry === item;
    })));
    if (!itemsNotIncluded.length) return props.defaultTiers;

    const unsortedTier = props.defaultTiers.find(tier => tier.id === 'unsorted');
    const unsortedTierIndex = unsortedTier ? props.defaultTiers.indexOf(unsortedTier) : -1;
    const result = [...props.defaultTiers];

    if (unsortedTierIndex === -1 || !unsortedTier) result.push(getDefaultUnsortedTier(itemsNotIncluded, result.length));
    else result[unsortedTierIndex] = {
      ...unsortedTier,
      entries: [...unsortedTier.entries, ...itemsNotIncluded.map(generateEntry)]
    };

    return result;
  });
  const storageService = useLocalStorage<TStorageData | Array<Tier<T>>>(storageKey, storedData => setTiers(tiers => {
    const resolvedStoredData = typeof storedData === 'function' ? storedData(tiers) : storedData;
    const resolvedStoredTiers = onStorageLoaded?.(resolvedStoredData as TStorageData) ?? resolvedStoredData as Array<Tier<T>>;
    const storedItems = resolvedStoredTiers.flatMap(tier => tier.entries);

    if (storedItems.length === items.length) return resolvedStoredTiers;
    else if (storedItems.length === 0) return getDefaultTiers(items);

    const newItems = items.filter(item => !storedItems.some(storedItem => JSON.stringify(storedItem.item) === JSON.stringify(item)));
    return resolvedStoredTiers.map(tier => tier ? (
      tier.id === 'unsorted'
        ? { ...tier, entries: [...(tier.entries ?? []), ...newItems.map(generateEntry)] }
        : tier
    ) : undefined).filter(Boolean) as Array<Tier<T>>;
  }), onStorageLoaded ? [] : tiers);
  const [newTier, setNewTier] = useState<FormTier<T>>(generateBlankTier(tiers));
  const [search, setSearch] = useState('');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragEndCount, setDragEndCount] = useState(0);
  const isDraggingRef = useRef(false);
  const tiersSnapshotRef = useRef<Tier<T>[] | null>(null);
  const tiersRef = useRef(tiers);
  tiersRef.current = tiers;

  const searchRef = useRef<HTMLInputElement>(null);

  // pointerWithin first: accurate for empty containers (checks if pointer is inside the rect).
  // closestCenter fallback: handles the case where pointer isn't inside any droppable.
  const collisionDetection = (args: Parameters<typeof pointerWithin>[0]) => {
    const within = pointerWithin(args);
    if (within.length > 0) return within;
    return closestCenter(args);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const orderedTiers = useMemo(() => tiers
    .map(tier => ({
      ...tier,
      entries: tier.entries.filter(entry => onSearch(search, entry.item))
    }))
    .sort((a, b) => a.position - b.position),
  [tiers, search, onSearch]);
  const render = useMemo(() => (
    'renderItem' in props ? props.renderItem
      : 'children' in props ? props.children
        : () => 'No render method provided.'
  ), [props]);

  const unsorted = tiers.find(tier => tier.id === 'unsorted')!;
  const tiersWithoutIds = useMemo(() =>
    tiers.map(tier => ({
      ...tier,
      entries: tier.entries.map(entry => ({ ...entry, id: undefined as any }))
    })), [tiers]);

  const defaultTiersWithoutIds = useMemo(() =>
    props.defaultTiers?.map(tier => ({
      ...tier,
      entries: tier.entries.map(entry => ({ ...entry, id: undefined as any }))
    })), [props.defaultTiers]);

  const resetIfChangedRef = useRef<() => void>(() => {});
  resetIfChangedRef.current = () => {
    const contentEqual = isEqual(tiersWithoutIds, defaultTiersWithoutIds);
    if (!contentEqual) resetTiers();
  };
  useOnChange(props.defaultTiers, () => resetIfChangedRef.current());
  useOnChange(tiers, tiers => {
    if (isDraggingRef.current) return;
    const storageData = onStorageSave?.(tiers) ?? tiers;
    storageService.set(storageData);
    onTierChange?.(tiers);
  }, [onStorageSave]);

  // Save after drag ends. Needed because useOnChange is gated during drag,
  // so if onDragOver already placed the item and onDragEnd is a no-op, no
  // state change occurs and useOnChange never fires.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (dragEndCount === 0) return;
    const currentTiers = tiersRef.current;
    const storageData = onStorageSave?.(currentTiers) ?? currentTiers;
    storageService.set(storageData);
    onTierChange?.(currentTiers);
  }, [dragEndCount]);

  useKeybind('f', { ctrlKey: true }, e => {
    e.preventDefault();
    searchRef.current?.focus();
  });

  const activeEntry = activeDragId
    ? tiers.flatMap(t => t.entries).find(e => e.id === activeDragId) ?? null
    : null;

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveDragId(active.id as string);
    isDraggingRef.current = true;
    tiersSnapshotRef.current = tiers;
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const draggableId = active.id as string;
    const overId = over.id as string;

    // Pre-check with ref to skip setTiers entirely for same-tier movement.
    // This avoids queuing unnecessary state updates on every item the ghost passes over.
    // Stale-ref races are safe: the functional updater below re-validates and guards against undefined movedItem.
    const snapshot = tiersRef.current;
    const snapSource = snapshot.find(t => t.entries.some(e => e.id === draggableId));
    const snapDest = snapshot.find(t => t.id === overId) ?? snapshot.find(t => t.entries.some(e => e.id === overId));
    if (!snapSource || !snapDest || snapSource.id === snapDest.id) return;

    setTiers(currentTiers => {
      const sourceTier = currentTiers.find(t => t.entries.some(e => e.id === draggableId));
      const destinationTier = currentTiers.find(t => t.id === overId)
        ?? currentTiers.find(t => t.entries.some(e => e.id === overId));

      if (!sourceTier || !destinationTier || sourceTier.id === destinationTier.id) return currentTiers;

      const movedItem = sourceTier.entries.find(e => e.id === draggableId);
      if (!movedItem) return currentTiers;

      const sourceEntries = sourceTier.entries.filter(e => e.id !== draggableId);
      const destEntries = [...destinationTier.entries];
      const targetIndex = destEntries.findIndex(e => e.id === overId);
      if (targetIndex === -1) destEntries.push(movedItem);
      else destEntries.splice(targetIndex, 0, movedItem);

      return currentTiers.map(t =>
        t.id === sourceTier.id ? { ...t, entries: sourceEntries }
          : t.id === destinationTier.id ? { ...t, entries: destEntries }
            : t
      );
    });
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    isDraggingRef.current = false;
    tiersSnapshotRef.current = null;
    setActiveDragId(null);
    setDragEndCount(c => c + 1);

    if (!over || active.id === over.id) return;

    const draggableId = active.id as string;
    const overId = over.id as string;

    setTiers(currentTiers => {
      const sourceTier = currentTiers.find(t => t.entries.some(e => e.id === draggableId));
      const destinationTier = currentTiers.find(t => t.id === overId)
        ?? currentTiers.find(t => t.entries.some(e => e.id === overId));

      if (!sourceTier || !destinationTier) return currentTiers;

      if (sourceTier.id !== destinationTier.id) {
        // onDragOver didn't handle this cross-tier move (e.g. empty tier)
        const movedItem = sourceTier.entries.find(e => e.id === draggableId);
        if (!movedItem) return currentTiers;
        const sourceEntries = sourceTier.entries.filter(e => e.id !== draggableId);
        const destEntries = [...destinationTier.entries];
        const targetIndex = destEntries.findIndex(e => e.id === overId);
        if (targetIndex === -1) destEntries.push(movedItem);
        else destEntries.splice(targetIndex, 0, movedItem);
        return currentTiers.map(t =>
          t.id === sourceTier.id ? { ...t, entries: sourceEntries }
            : t.id === destinationTier.id ? { ...t, entries: destEntries }
              : t
        );
      }

      // Same tier: reorder
      const oldIndex = sourceTier.entries.findIndex(e => e.id === draggableId);
      const newIndex = sourceTier.entries.findIndex(e => e.id === overId);
      if (newIndex === -1 || oldIndex === newIndex) return currentTiers;
      return currentTiers.map(t =>
        t.id === sourceTier.id ? { ...t, entries: arrayMove(t.entries, oldIndex, newIndex) } : t
      );
    });
  };

  const onDragCancel = () => {
    isDraggingRef.current = false;
    setActiveDragId(null);
    setDragEndCount(c => c + 1);
    if (tiersSnapshotRef.current) {
      setTiers(tiersSnapshotRef.current);
      tiersSnapshotRef.current = null;
    }
  };

  const updateTier = (id: string, newTier: Partial<Tier<T>>) => setTiers(tiers => {
    const index: number = tiers.findIndex(tier => tier.id === id);
    if (index === -1) return [
      ...tiers.filter(tier => tier.id !== 'unsorted'),
      { ...newTier, id: generateId(), entries: [] } as Tier<T>,
      unsorted
    ];

    if (newTier.position !== undefined && tiers.some(tier => tier.position === newTier.position)) {
      const currentPositionedTier = tiers.find(tier => tier.position === newTier.position)!;
      const updatedCurrentPositionedTier = { ...currentPositionedTier, position: tiers[index].position };
      const updatedTier = { ...tiers[index], ...newTier };

      const result = tiers.map(tier => (
        tier.id === updatedCurrentPositionedTier.id ? updatedCurrentPositionedTier
          : tier.id === updatedTier.id ? updatedTier
            : tier
      ));
      const unsorted = result.find(tier => tier.id === 'unsorted')!;
      return result.filter(tier => tier.id !== 'unsorted').concat(unsorted);
    }
    const updatedTier: Tier<T> = { ...tiers[index], ...newTier };
    return [...tiers.slice(0, index), updatedTier, ...tiers.slice(index + 1)];
  });
  const onSendToTier = (entry: Entry<T>, tier: Tier<T>) => setTiers(tiers => {
    const tierContainingItem = tiers.find(tier => tier.entries.some(item => item.id === entry.id));
    if (!tierContainingItem) {
      console.error('Item not found in any tier', { entry, tier, tiers });
      return tiers;
    }

    if (tierContainingItem.id === tier.id) return tiers;

    const updatedTierContainedItem: Tier<T> = { ...tierContainingItem!, entries: tierContainingItem!.entries.filter(item => item.id !== entry.id) };
    const updatedTargetTier: Tier<T> = { ...tier, entries: [...tier.entries, entry] };

    onEntryChange?.(updatedTierContainedItem, updatedTierContainedItem.entries);
    return tiers.map(tier => (
      tier.id === updatedTierContainedItem.id ? updatedTierContainedItem
        : tier.id === updatedTargetTier.id ? updatedTargetTier
          : tier
    ));
  });
  const onMoveToIndex = (entry: Entry<T>, index: number) => setTiers(tiers => {
    const tierContainingItem = tiers.find(tier => tier.entries.some(item => item.id === entry.id));
    if (!tierContainingItem) {
      console.error('Item not found in any tier', { entry, index, tiers });
      return tiers;
    }

    const updatedTierContainedItem: Tier<T> = { ...tierContainingItem!, entries: tierContainingItem!.entries.filter(item => item.id !== entry.id) };
    const updatedTierContainedItemEntries = [...updatedTierContainedItem.entries];
    updatedTierContainedItemEntries.splice(index, 0, entry);

    onEntryChange?.(updatedTierContainedItem, updatedTierContainedItemEntries);

    return tiers.map(tier => (
      tier.id === updatedTierContainedItem.id
        ? { ...updatedTierContainedItem, entries: updatedTierContainedItemEntries }
        : tier
    ));
  });

  return (
    <div className="tier-list-creator">
      <TierModifyForm add tier={newTier} onTierUpdate={(id, tier) => {
        updateTier(id, tier);
        setNewTier(generateBlankTier(tiers)());
      }} submitText='Add tier' />

      <input ref={searchRef} type="search" placeholder={`Search for a ${model.toLowerCase()}...`}
        value={search} onChange={e => setSearch(e.target.value)}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        {orderedTiers.map(tier => (
          <TierComponent<T> key={tier.id}
            {...{
              render,
              tier,
              updateTier,
              onMoveToIndex,
              onSendToTier,
              tiers,
              setTiers,
              unsorted
            }}
            renderCustomEntryContextMenuItems={props.renderCustomEntryContextMenuItems
              ? (entry, item) => props.renderCustomEntryContextMenuItems!(entry as Entry<T>, tier, item)
              : undefined}
          />
        ))}
        <DragOverlay>
          {activeEntry ? (
            <div className="tier__item">
              {render(activeEntry.item, -1)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <button type="reset" className='danger secondary' onClick={() => setTiers(getDefaultTiers(items))}>Reset</button>
    </div>
  );
};
