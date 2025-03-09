import { Draggable } from "react-beautiful-dnd";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { Entry, RenderItem, Tier } from "../TierlistTypes";

type Props<T> = {
  entry: Entry<T>;
  index: number;

  tiers: Array<Tier<T>>;
  unsorted: Tier<T>;
  onSendToTier: (entry: Entry<T>, tier: Tier<T>) => void;
  render: RenderItem<T>;
};

export default function Entry<T>({ entry, index, unsorted, tiers, onSendToTier, render }: Props<T>) {
  const onContextMenu = useContextMenu(item => tiers.map(tier => tier.items.includes(entry)
    ? undefined
    : item('option', `Send to ${tier.title}`, () => onSendToTier(entry, tier), '➡️')
  ).filter(Boolean), 'top-right');

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