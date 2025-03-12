import { useContextMenu } from "@/providers/ContextMenuProvider";

type Props = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const PriorityListTab = ({ title, onEdit, onDelete }: Props) => {
  const onContextMenu = useContextMenu(item => [
    item('option', 'Edit', onEdit, '✏️'),
    item('option', 'Delete', onDelete, '🗑️'),
  ])

  return (
    <div className="priority-list-tab" onContextMenu={onContextMenu}>
      <span>{title}</span>
      <button className="close" onClick={onDelete}>&times;</button>
    </div>
  );
}