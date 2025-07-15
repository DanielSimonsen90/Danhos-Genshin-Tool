import { useContextMenu } from "@/providers/ContextMenuProvider";

type Props = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  onClone: () => void;
}

export const PriorityListTab = ({ title, onEdit, onDelete, onClone }: Props) => {
  const onContextMenu = useContextMenu(item => [
    item('option', 'Edit', onEdit, '✏️'),
    item('option', 'Delete', onDelete, '🗑️'),
    item('divider'),
    item('option', 'Clone', onClone, '📋'),
  ])

  return (
    <div className="priority-list-tab" onContextMenu={onContextMenu}>
      <span>{title}</span>
      <button className="close" onClick={onDelete}>&times;</button>
    </div>
  );
}