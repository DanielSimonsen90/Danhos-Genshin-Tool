import { ReactNode, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { useContextMenu } from "@/providers/ContextMenuProvider";
import { classNames } from "@/common/functions/strings";

import Modal from "../../Modal";
import { Tier, Entry } from "../TierlistTypes";
import TierModifyForm from "./TierModifyForm";

type Props<T> = {
  tier: Tier<T>;
  render: (item: T) => ReactNode;
  updateTier: (id: string, newTier: Partial<Tier<T>>) => void;
  setTiers: React.Dispatch<React.SetStateAction<Tier<T>[]>>;
  onSendToUnsorted: (tier: Entry<T>) => void;
}

export default function Tier<T>({ tier, updateTier, setTiers, render, onSendToUnsorted }: Props<T>) {
  const [showEditModal, setShowEditModal] = useState(false);
  const onContext = useContextMenu([
    {
      icon: '✏️',
      label: 'Edit',
      action: () => setShowEditModal(true),
    },
    {
      icon: '🧹',
      label: 'Clear',
      action: () => setTiers(tiers => tiers.map(t => t.id === tier.id ? { ...t, items: [] } : t)),
    },
    {
      icon: '🗑️',
      label: 'Delete tier',
      action: () => setTiers(tiers => tiers.filter(t => t.id !== tier.id)),
    }
  ]);

  return (
    <div className="tier" style={{ backgroundColor: tier.color }} onContextMenu={onContext}>
      <header className='tier__header'>
        <h2 className={classNames('tier__title', tier.invert && 'inverted')}>{tier.title}</h2>
      </header>
      <Droppable key={tier.id} droppableId={tier.id} direction='horizontal'>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='tier__items'>
            {tier.items.map((entry, index) => (
              <Draggable key={entry.id} draggableId={entry.id} index={index}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="item" onDoubleClick={() => onSendToUnsorted(entry)}>
                    {render(entry.item)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <TierModifyForm tier={tier} onTierUpdate={(id, tier) => {
          updateTier(id, tier as Tier<T>);
          setShowEditModal(false);
        }} submitText='Apply edits' />
      </Modal>
    </div>
  );
}