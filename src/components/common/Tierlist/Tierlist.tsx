import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { generateId } from '@/common/functions/random';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useOnChange from '@/hooks/useOnChange';

import { Entry, Tier, TierlistProps } from './TierlistTypes';
import { FormTier, Tier as TierComponent, TierModifyForm } from './components';
import { getDefaultTiers, generateBlankTier } from './TierlistFunctions';


export default function Tierlist<T>({ items, ...props }: TierlistProps<T>) {
  const [tiers, setTiers] = useState(getDefaultTiers(items));
  const localStorage = useLocalStorage<Array<Tier<T>>>('tierlist', setTiers, tiers);
  const [newTier, setNewTier] = useState<FormTier<T>>(generateBlankTier(tiers));

  const orderedTiers = tiers.sort((a, b) => a.position - b.position);
  const render = useMemo(() => 'renderItem' in props ? props.renderItem : 'children' in props ? props.children : () => 'No render method provided.', [props]);
  const unsorted = tiers.find(tier => tier.id === 'unsorted')!;

  useOnChange(tiers, localStorage.set);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTier = tiers.find(tier => tier.id === source.droppableId)!;
    const destinationTier = tiers.find(tier => tier.id === destination.droppableId)!;
    const sourceItems = [...sourceTier.items];
    const destinationItems = [...destinationTier.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceTier.id === destinationTier.id) {
      sourceItems.splice(destination.index, 0, movedItem);
      setTiers(tiers => tiers.map(tier =>
        tier.id === sourceTier.id ? { ...tier, items: sourceItems } : tier
      ));
    } else {
      destinationItems.splice(destination.index, 0, movedItem);
      setTiers(tiers => tiers.map(tier =>
        tier.id === sourceTier.id ? { ...tier, items: sourceItems }
          : tier.id === destinationTier.id ? { ...tier, items: destinationItems }
            : tier
      ));
    }
  };
  const updateTier = (id: string, newTier: Partial<Tier<T>>) => setTiers(tiers => {
    const index = tiers.findIndex(tier => tier.id === id);
    if (index === -1) return [
      ...tiers.filter(tier => tier.id !== 'unsorted'),
      { ...newTier, id: generateId(), items: [] } as Tier<T>,
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
    const tierContainingItem = tiers.find(tier => tier.items.some(item => item.id === entry.id));
    const updatedTierContainedItem = { ...tierContainingItem!, items: tierContainingItem!.items.filter(item => item.id !== entry.id) };
    const updatedTargetTier = { ...tier, items: [...tier.items, entry] };

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
        setNewTier({ id: generateId() });
      }} submitText='Add tier' />

      <DragDropContext onDragEnd={onDragEnd}>
        {orderedTiers.map(tier => <TierComponent key={tier.id} {...{ tier, setTiers, updateTier, render, onSendToTier, tiers, unsorted }} />)}
      </DragDropContext>

      <button type="reset" className='danger secondary' onClick={() => setTiers(getDefaultTiers(items))}>Reset</button>
    </div>
  );
};
