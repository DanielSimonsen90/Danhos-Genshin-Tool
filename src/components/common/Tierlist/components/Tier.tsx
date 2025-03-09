import { ReactNode, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { useContextMenu } from "@/providers/ContextMenuProvider";
import { classNames } from "@/common/functions/strings";

import Modal from "../../Modal";
import { Tier, Entry, RenderItem } from "../TierlistTypes";
import { generateBlankTier } from "../TierlistFunctions";
import TierModifyForm from "./TierModifyForm";
import EntryComponent from "./Entry";
import { UnsortedSearchList } from "./UnsortedSearchList";

export type Props<T> = {
  tier: Tier<T>;
  render: RenderItem<T>
  updateTier: (id: string, newTier: Partial<Tier<T>>) => void;

  tiers: Array<Tier<T>>;
  setTiers: React.Dispatch<React.SetStateAction<Tier<T>[]>>;
  unsorted: Tier<T>;
  onUnsortedSearch: (search: string, item: T) => boolean;
  onSendToTier: (entry: Entry<T>, tier: Tier<T>) => void;
};

export default function Tier<T>({ tier, updateTier, setTiers, render, onSendToTier, onUnsortedSearch, tiers, unsorted }: Props<T>) {
  const [showEditModal, setShowEditModal] = useState(false);
  const onContext = useContextMenu(item => [
    item('divider', 'Move'),
    item('option',
      'Move up',
      () => updateTier(tier.id, { position: tier.position - 1 }),
      '⬆️'
    ),
    item('option',
      'Move down',
      () => updateTier(tier.id, { position: tier.position + 1 }),
      '⬇️'
    ),

    item('divider', 'Add rows'),
    item('option',
      'Add new above',
      () => setTiers(tiers => {
        const newTiers = [...tiers];
        const newTier = generateBlankTier<T>(tiers)(`New ${tier.title}`);
        newTier.position = tier.position - 1;
        newTiers.splice(tier.position, 0, newTier);
        return newTiers.map((t, i) => ({ ...t, position: i }));
      }),
      '⬆️',
    ),
    item('option',
      'Add new below',
      () => setTiers(tiers => {
        const newTiers = [...tiers];
        const newTier = generateBlankTier<T>(tiers)(`New ${tier.title}`);
        newTier.position = tier.position + 1;
        newTiers.splice(tier.position + 1, 0, newTier);
        return newTiers.map((t, i) => ({ ...t, position: i }));
      }),
      '⬇️',
    ),

    item('divider', 'Modify'),
    item('option',
      'Edit',
      () => setShowEditModal(true),
      '✏️'
    ),
    item('option', 'Clear', () => setTiers(tiers => tiers.map(t => t.id === tier.id ? { ...t, entries: [] } : t)), '🧹'),
    item('option', 'Delete tier', () => setTiers(tiers => tiers.filter(t => t.id !== tier.id)), '🗑️'),
  ]);
  const onContextMenu = tier.id === 'unsorted' ? undefined : onContext;

  return (
    <div className="tier" style={{ backgroundColor: tier.color }}>
      <header className='tier__header' onContextMenu={onContextMenu} onDoubleClick={() => setShowEditModal(true)}>
        <h2 className={classNames('tier__title', tier.invert && 'inverted')}>{tier.title}</h2>
      </header>
      <Droppable key={tier.id} droppableId={tier.id} direction='horizontal'>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='tier__items'>
            <UnsortedSearchList tier={tier} unsorted={unsorted} onSearch={(search, entry) => onUnsortedSearch(search, entry.item)}>
              {(entry, index) => <EntryComponent key={entry.id} {...{ entry, index, onSendToTier, render, tiers, unsorted }} />}
            </UnsortedSearchList>
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