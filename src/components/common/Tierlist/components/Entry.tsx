import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";

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


  return (
    <Draggable key={entry.id} draggableId={entry.id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          className="tier__item"
          onDoubleClick={() => onSendToTier(entry, unsorted)} onContextMenu={onContextMenu}
        >
          {render(entry.item, index)}
        </div>
      )}
    </Draggable>
  );
}