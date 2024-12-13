import { ReactNode, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { useContextMenu } from "@/providers/ContextMenuProvider";
import { classNames } from "@/common/functions/strings";

import Modal from "../../Modal";
import { Tier, Entry } from "../TierlistTypes";
import TierModifyForm from "./TierModifyForm";
import EntryComponent from "./Entry";

type Props<T> = {
  tier: Tier<T>;
  render: (item: T) => ReactNode;
  updateTier: (id: string, newTier: Partial<Tier<T>>) => void;

  tiers: Array<Tier<T>>;
  setTiers: React.Dispatch<React.SetStateAction<Tier<T>[]>>;
  unsorted: Tier<T>;
  onSendToTier: (entry: Entry<T>, tier: Tier<T>) => void;
}

export default function Tier<T>({ tier, updateTier, setTiers, render, onSendToTier, tiers, unsorted }: Props<T>) {
  const [showEditModal, setShowEditModal] = useState(false);
  const onContext = useContextMenu([
    {
      icon: '⬆️',
      label: 'Move up',
      action: () => updateTier(tier.id, { position: tier.position - 1 }),
    },
    {
      icon: '✏️',
      label: 'Edit',
      action: () => setShowEditModal(true),
    },
    {
      icon: '⬇️',
      label: 'Move down',
      action: () => updateTier(tier.id, { position: tier.position + 1 }),
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
  const onContextMenu = tier.id === 'unsorted' ? undefined : onContext;

  return (
    <div className="tier" style={{ backgroundColor: tier.color }}>
      <header className='tier__header' onContextMenu={onContextMenu}>
        <h2 className={classNames('tier__title', tier.invert && 'inverted')} onDoubleClick={() => setShowEditModal(true)}>{tier.title}</h2>
      </header>
      <Droppable key={tier.id} droppableId={tier.id} direction='horizontal'>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='tier__items'>
            {tier.items.map((entry, index) => (
              <EntryComponent key={entry.id} {...{ entry, index, onSendToTier, render, tiers, unsorted }} />
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