import { useMemo } from 'react';
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { AccountContextType } from '@/stores/AccountStore/AccountStoreTypes';

import AccountListItem from './AccountListItem';

type Props = {
  accounts: AccountContextType;
  selectedAccountName: string;
  onChange: (accountName: string) => void;
  onReorder: (accountNames: Array<string>) => void;
};

/**
 * Renders every account as a selectable chip that can also be dragged to reorder the accounts.
 *
 * A plain click selects the account (the chips act as a radio group), while a drag of at least
 * 8px picks the chip up instead — the same activation constraint the Tierlist uses, so the two
 * interactions never fight each other.
 *
 * The account order is the key order of the `accounts` map; `onReorder` receives the full list of
 * names in their new order and the consumer is expected to rebuild the map from it.
 *
 * @example
 * <AccountList
 *   accounts={pendingAccounts}
 *   selectedAccountName={pendingSelectedAccountName}
 *   onChange={setSelectedAccount}
 *   onReorder={names => setPendingAccounts(rebuildInOrder(names))}
 * />
 */
export default function AccountList({ accounts, selectedAccountName, onChange, onReorder }: Props) {
  const names = useMemo(() => Object.keys(accounts), [accounts]);

  // Distance constraint keeps a plain click a selection rather than the start of a drag.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const move = (from: number, to: number) => {
    if (from === -1 || to === -1 || from === to) return;
    if (to < 0 || to >= names.length) return;
    onReorder(arrayMove(names, from, to));
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    move(names.indexOf(active.id as string), names.indexOf(over.id as string));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={names} strategy={horizontalListSortingStrategy}>
        <div className="account-list" role="radiogroup" aria-label="Accounts">
          {names.map(name => (
            <AccountListItem key={name}
              name={name}
              account={accounts[name]}
              selected={name === selectedAccountName}
              onSelect={() => onChange(name)}
              onMove={offset => move(names.indexOf(name), names.indexOf(name) + offset)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
