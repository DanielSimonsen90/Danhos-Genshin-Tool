import { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Entry, Tier } from "../TierlistTypes";
import { useContextMenu } from "@/providers/ContextMenuProvider";

type Props<T> = {
  entry: Entry<T>;
  index: number;

  tiers: Array<Tier<T>>
  unsorted: Tier<T>;
  onSendToTier: (entry: Entry<T>, tier: Tier<T>) => void;
  render: (item: T) => ReactNode;
}

export default function Entry<T>({ entry, index, unsorted, tiers, onSendToTier, render }: Props<T>) {
  const onContextMenu = useContextMenu(tiers.map(tier => tier.items.includes(entry) ? undefined : ({
    icon: '➡️',
    label: `Send to ${tier.title}`,
    action: () => onSendToTier(entry, tier)
  })).filter(Boolean))
  
  return (
    <Draggable key={entry.id} draggableId={entry.id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          className="item"
          onDoubleClick={() => onSendToTier(entry, unsorted)} onContextMenu={onContextMenu}
        >
          {render(entry.item)}
        </div>
      )}
    </Draggable>
  );
}