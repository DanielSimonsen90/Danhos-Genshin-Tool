import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Tier } from './TierlistTypes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useOnChange from '@/hooks/useOnChange';
import TierModifyForm, { FormTier } from './components/TierModifyForm';
import { generateId } from '@/common/functions/random';
import TierComponent from './components/Tier';

const rows = 3;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const initialTiers: Tier[] = Array.from({ length: rows }, (_, i) => ({
  id: `tier-${i}`,
  title: `Tier ${i + 1}`,
  color: colors[i],
  invert: false,
  items: Array.from({ length: 5 }, (_, j) => ({
    id: `item-${i}-${j}`,
    content: `Item ${j + 1}`,
  }))
}) as Tier);

export default function Tierlist() {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [newTier, setNewTier] = useState<FormTier>(() => ({ id: generateId() }));
  const localStorage = useLocalStorage<Array<Tier>>('tierlist', setTiers, []);

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

  const updateTier = (id: string, newTier: Partial<Tier>) => {
    setTiers(tiers => {
      const index = tiers.findIndex(tier => tier.id === id);
      if (index === -1) return [...tiers, { id, ...newTier } as Tier];

      const updatedTier = { ...tiers[index], ...newTier };
      return [...tiers.slice(0, index), updatedTier, ...tiers.slice(index + 1)];
    });
  };

  return (
    <div className="tier-list-creator">
      <TierModifyForm add tier={newTier} onTierUpdate={(id, tier) => {
        updateTier(id, tier);
        setNewTier({ id: generateId() });
      }} submitText='Add tier' />

      <DragDropContext onDragEnd={onDragEnd}>
        {tiers.map(tier => <TierComponent key={tier.id} {...{ tier, setTiers, updateTier }} />)}
      </DragDropContext>
    </div>
  );
};
