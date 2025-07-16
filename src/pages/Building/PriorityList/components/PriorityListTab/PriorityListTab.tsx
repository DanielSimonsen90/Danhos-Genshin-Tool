import { useContextMenu } from "@/providers/ContextMenuProvider";

type Props = {
  title: string;
  priorityListIndex: number;
  isLastIndex: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClone: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export const PriorityListTab = ({ 
  title, priorityListIndex, isLastIndex,
  onEdit, onDelete, onClone, onMove 
}: Props) => {
  const onContextMenu = useContextMenu(item => [
    item('divider', `Modify`),
    item('option', 'Clone', onClone, '📋'),
    item('option', 'Edit', onEdit, '✏️'),
    item('option', 'Delete', onDelete, '🗑️'),
    item('divider', `Move`),
    priorityListIndex !== 0 && item('option', 'Move Up', () => onMove('up'), '⬆️'),
    !isLastIndex && item('option', 'Move Down', () => onMove('down'), '⬇️'),
  ])

  return (
    <div className="priority-list-tab" onContextMenu={onContextMenu}>
      <span>{title}</span>
      <button className="close" onClick={onDelete}>&times;</button>
    </div>
  );
}