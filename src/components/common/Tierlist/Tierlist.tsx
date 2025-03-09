import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { generateId } from '@/common/functions/random';
import useOnChange from '@/hooks/useOnChange';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { Entry, Tier, TierlistProps } from './TierlistTypes';
import { FormTier, Tier as TierComponent, TierModifyForm } from './components';
import { getDefaultTiers, generateBlankTier, generateEntry } from './TierlistFunctions';

export default function Tierlist<T, TStorageData extends object>({ items, onUnsortedSearch, ...props }: TierlistProps<T, TStorageData>) {
  const storageKey = 'storageKey' in props ? props.storageKey : 'storage' in props ? props.storage.key : '';
  const onStorageLoaded = 'onStorageLoaded' in props ? props.onStorageLoaded : undefined;
  const onStorageSave = 'onStorageSave' in props ? props.onStorageSave : undefined;

  const [tiers, setTiers] = useState(props.defaultTiers ?? getDefaultTiers(items));
  const storageService = useLocalStorage<TStorageData | Array<Tier<T>>>(storageKey, storedData => setTiers(tiers => {
    const resolvedStoredData = typeof storedData === 'function' ? storedData(tiers) : storedData;
    const resolvedStoredTiers = onStorageLoaded?.(resolvedStoredData as TStorageData) ?? resolvedStoredData as Array<Tier<T>>;
    const storedItems = resolvedStoredTiers.flatMap(tier => tier.entries);
    
    if (storedItems.length === items.length) return resolvedStoredTiers;
    else if (storedItems.length === 0) return getDefaultTiers(items)();

    const newItems = items.filter(item => !storedItems.some(storedItem => JSON.stringify(storedItem.item) === JSON.stringify(item)));
    return resolvedStoredTiers.map(tier => (
      tier.id === 'unsorted'
        ? { ...tier, entries: [...tier.entries, ...newItems.map(generateEntry)] }
        : tier
    ));
  }), onStorageLoaded ? null : tiers);
  const [newTier, setNewTier] = useState<FormTier<T>>(generateBlankTier(tiers));

  const orderedTiers = tiers.sort((a, b) => a.position - b.position);
  const render = useMemo(() => (
    'renderItem' in props ? props.renderItem
    : 'children' in props ? props.children
    : () => 'No render method provided.'
  ), [props]);
  const unsorted = tiers.find(tier => tier.id === 'unsorted')!;

  useOnChange(tiers, tiers => {
    const storageData = onStorageSave?.(tiers) ?? tiers;
    storageService.set(storageData);
  }, [onStorageSave]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTier = tiers.find(tier => tier.id === source.droppableId)!;
    const destinationTier = tiers.find(tier => tier.id === destination.droppableId)!;
    const sourceItems = [...sourceTier.entries];
    const destinationItems = [...destinationTier.entries];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceTier.id === destinationTier.id) {
      sourceItems.splice(destination.index, 0, movedItem);
      setTiers(tiers => tiers.map(tier =>
        tier.id === sourceTier.id ? { ...tier, entries: sourceItems } : tier
      ));
    } else {
      destinationItems.splice(destination.index, 0, movedItem);
      setTiers(tiers => tiers.map(tier =>
        tier.id === sourceTier.id ? { ...tier, entries: sourceItems }
          : tier.id === destinationTier.id ? { ...tier, entries: destinationItems }
            : tier
      ));
    }
  };
  const updateTier = (id: string, newTier: Partial<Tier<T>>) => setTiers(tiers => {
    const index = tiers.findIndex(tier => tier.id === id);
    if (index === -1) return [
      ...tiers.filter(tier => tier.id !== 'unsorted'),
      { ...newTier, id: generateId(), entries: [] } as Tier<T>,
      unsorted
    ];

    if (newTier.position !== undefined && tiers.some(tier => tier.position === newTier.position)) {
      const currentPositionedTier = tiers.find(tier => tier.position === newTier.position)!;
      const updatedCurrentPositionedTier = { ...currentPositionedTier, position: tiers[index].position };
      const updatedTier = { ...tiers[index], ...newTier };
      return tiers.map(tier => (
        tier.id === updatedCurrentPositionedTier.id ? updatedCurrentPositionedTier
          : tier.id === updatedTier.id ? updatedTier
            : tier
      ));
    }
    const updatedTier = { ...tiers[index], ...newTier };
    return [...tiers.slice(0, index), updatedTier, ...tiers.slice(index + 1)];
  });
  const onSendToTier = (entry: Entry<T>, tier: Tier<T>) => setTiers(tiers => {
    const tierContainingItem = tiers.find(tier => tier.entries.some(item => item.id === entry.id));

    // Sent to same tier
    if (tierContainingItem.id === tier.id) return tiers;

    const updatedTierContainedItem = { ...tierContainingItem!, items: tierContainingItem!.entries.filter(item => item.id !== entry.id) };
    const updatedTargetTier = { ...tier, items: [...tier.entries, entry] };

    return tiers.map(tier => (
      tier.id === updatedTierContainedItem.id ? updatedTierContainedItem
        : tier.id === updatedTargetTier.id ? updatedTargetTier
          : tier
    ));
  });

  return (
    <div className="tier-list-creator">
      <TierModifyForm add tier={newTier} onTierUpdate={(id, tier) => {
        updateTier(id, tier);
        setNewTier(generateBlankTier(tiers)());
      }} submitText='Add tier' />

      <DragDropContext onDragEnd={onDragEnd}>
        {orderedTiers.map(tier => (
          <TierComponent key={tier.id} {...{
            render,
            tier, updateTier, onSendToTier,
            tiers, setTiers,
            unsorted, onUnsortedSearch
          }} />
        ))}
      </DragDropContext>

      <button type="reset" className='danger secondary' onClick={() => setTiers(getDefaultTiers(items))}>Reset</button>
    </div>
  );
};
