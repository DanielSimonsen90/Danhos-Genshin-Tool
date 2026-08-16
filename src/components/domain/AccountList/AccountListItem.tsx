import { KeyboardEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CharacterImage } from '@/components/common/media/Images';
import { classNames } from '@/common/functions/strings';
import { AccountData } from '@/stores/AccountStore/AccountStoreTypes';

type Props = {
  name: string;
  account: AccountData | undefined;
  selected: boolean;
  onSelect: () => void;
  onMove: (offset: number) => void;
};

/**
 * A single account entry inside {@link AccountList}.
 *
 * Behaves as a radio option — clicking it selects the account — while doubling as a
 * sortable handle, so the whole chip can be dragged to reorder the account.
 * Keyboard users reorder with `Alt + ArrowLeft` / `Alt + ArrowRight`, leaving
 * `Enter` / `Space` free for selection.
 *
 * @param name Account name, also used as the sortable id.
 * @param account Account data used for the avatar; may be undefined for a not-yet-saved account.
 * @param selected Whether this account is the currently selected one.
 * @param onSelect Invoked when the chip is clicked without being dragged.
 * @param onMove Invoked with a positional offset (-1 / 1) when reordering via keyboard.
 */
export default function AccountListItem({ name, account, selected, onSelect, onMove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: name });
  const avatar = account?.avatar ?? account?.traveler;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!e.altKey) return;

    const offset = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
    if (!offset) return;

    e.preventDefault();
    onMove(offset);
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : undefined,
      }}
      {...attributes}
      {...listeners}
      // Overrides the "button" role dnd-kit puts on `attributes`, so the list reads as a radio group.
      role="radio"
      aria-checked={selected}
      className={classNames('account-list__item', selected && 'account-list__item--selected')}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      {avatar && <CharacterImage character={avatar} />}
      <span className="account-list__item-name">{name}</span>
    </button>
  );
}
