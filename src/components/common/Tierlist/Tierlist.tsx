import { useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// @ts-ignore
import isEqual from 'lodash/fp/isEqual';

import { generateId } from '@/common/functions/random';
import useOnChange from '@/hooks/useOnChange';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { FormTier, Tier as TierComponent, TierModifyForm } from './components';
import { Entry, Tier, TierlistProps } from './TierlistTypes';
import { getDefaultTiers, generateBlankTier, generateEntry } from './TierlistFunctions';
import { useStateReset } from '@/hooks/useStateReset';

export default function Tierlist<T, TStorageData extends object>({
  model, items,
  onSearch, onTierChange, onEntryChange,
  ...props
}: TierlistProps<T, TStorageData>) {
  const storageKey = 'storageKey' in props ? props.storageKey : 'storage' in props ? props.storage.key : '';
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
    const unsortedTierIndex = props.defaultTiers.indexOf(unsortedTier!);
    const result = [...props.defaultTiers];
    result[unsortedTierIndex] = { 
      ...unsortedTier!, 
      entries: [...unsortedTier!.entries, ...itemsNotIncluded.map(generateEntry)] 
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
    ) : undefined).filter(Boolean);
  }), onStorageLoaded ? null : tiers);
  const [newTier, setNewTier] = useState<FormTier<T>>(generateBlankTier(tiers));
  const [search, setSearch] = useState('');

  const orderedTiers = tiers
    .map(tier => {
      const entries = tier.entries.filter(entry => onSearch(search, entry.item))
      return { ...tier, entries }
    })
    .sort((a, b) => a.position - b.position);
  const render = useMemo(() => (
    'renderItem' in props ? props.renderItem
    : 'children' in props ? props.children
    : () => 'No render method provided.'
  ), [props]);

  const unsorted = tiers.find(tier => tier.id === 'unsorted')!;  // Compare content ignoring entry IDs to prevent unnecessary resets
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

    useOnChange(props.defaultTiers, defaultTiers => {
    const contentEqual = isEqual(tiersWithoutIds, defaultTiersWithoutIds);
    
    if (!contentEqual) {
      resetTiers();
    }
  });
  useOnChange(tiers, tiers => {
    const storageData = onStorageSave?.(tiers) ?? tiers;
    storageService.set(storageData);
    onTierChange?.(tiers);
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
    const tierContainingItem: Tier<T> = tiers.find(tier => tier.entries.some(item => item.id === entry.id));

    // Sent to same tier
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
    const tierContainingItem: Tier<T> = tiers.find(tier => tier.entries.some(item => item.id === entry.id));
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

      <input type="search" placeholder={`Search for a ${model.toLowerCase()}...`}
        value={search} onChange={e => setSearch(e.target.value)} 
      />

      <DragDropContext onDragEnd={onDragEnd}>
        {orderedTiers.map(tier => (
          <TierComponent key={tier.id} {...{
            render,
            tier, updateTier, onMoveToIndex, onSendToTier,
            tiers, setTiers,
            unsorted, onSearch
          }} />
        ))}
      </DragDropContext>

      <button type="reset" className='danger secondary' onClick={() => setTiers(getDefaultTiers(items))}>Reset</button>
    </div>
  );
};