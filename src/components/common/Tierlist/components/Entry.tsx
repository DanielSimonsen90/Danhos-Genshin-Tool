import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { Entry, RenderItem, Tier } from "../TierlistTypes";
import { CreateMenuItem } from "@/providers/ContextMenuProvider/ContextMenuConstants";
import { MenuItem } from "@/providers/ContextMenuProvider/ContextMenuTypes";

type Props<T> = {
  entry: Entry<T>;
  index: number;

  tiers: Array<Tier<T>>;
  unsorted: Tier<T>;
  onMoveToIndex: (entry: Entry<T>, index: number) => void;
  onSendToTier: (entry: Entry<T>, tier: Tier<T>) => void;
  render: RenderItem<T>;
  renderContextMenuItems?: (item: typeof CreateMenuItem) => Array<MenuItem>;
};

export default function Entry<T>({
  entry, index, unsorted, tiers,
  onMoveToIndex, onSendToTier,
  render, renderContextMenuItems
}: Props<T>) {
  const tier = useMemo(() => tiers.find(tier => tier.entries.some(item => item.id === entry.id))!, [entry.id, tiers]);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.id });

  const onContextMenu = useContextMenu(item => {
    const sendToTiers = [
      item('divider', 'Send To Tiers'),
      ...tiers
        .filter(tier => !tier.entries.includes(entry))
        .map(_tier => item(
          'option',
          `Send to ${_tier.title}`,
          () => onSendToTier(entry, _tier),
          tiers.indexOf(tier) < tiers.indexOf(_tier) ? '⬇️' : '⬆️')
        ),
    ];

    const moveItem = [];
    const moveItemDivider = item('divider', 'Move Item');
    if (index !== 0) moveItem.push(
      moveItemDivider,
      item('option', 'Move to start', () => onMoveToIndex(entry, 0), '⏮️', 'ArrowUp'),
      item('option', 'Move left', () => onMoveToIndex(entry, index - 1), '⬅️', 'ArrowLeft')
    );
    if (index !== tier.entries.length - 1) {
      if (!moveItem.length) moveItem.push(moveItemDivider);
      moveItem.push(
        item('option', 'Move right', () => onMoveToIndex(entry, index + 1), '➡️', 'ArrowRight'),
        item('option', 'Move to end', () => onMoveToIndex(entry, tier.entries.length - 1), '⏭️', 'ArrowDown')
      );
    }
    const customItems = renderContextMenuItems?.(item) ?? [];

    return [
      ...moveItem,
      ...sendToTiers,
      ...customItems
    ];
  }, 'top-right');

  // During drag, all useSortable components re-render on every pointer move (dnd context subscription).
  // Memoize so render() is only called when the item or its position actually changes.
  const content = useMemo(() => render(entry.item, index), [render, entry.item, index]);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : undefined,
      }}
      {...attributes}
      {...listeners}
      className="tier__item"
      onDoubleClick={() => onSendToTier(entry, unsorted)}
      onContextMenu={onContextMenu}
    >
      {content}
    </div>
  );
}
