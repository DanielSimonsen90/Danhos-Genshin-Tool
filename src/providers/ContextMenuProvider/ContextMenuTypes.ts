export type ContextMenuContextType = (e: React.MouseEvent) => (items: MenuItems, position?: Position) => { 
  ref: React.RefObject<HTMLDivElement>;
  close(): void;
};

type PositionX = 'left' | 'right';
type PositionY = 'top' | 'bottom';
export type Position = `${PositionY}-${PositionX}`;
export type MenuItem = {
  label: string;
  action(): void;
  icon?: React.ReactNode;
};

export type MenuItems = (
  MenuItem[]
  | ((creator: (
    label: MenuItem['label'],
    action: MenuItem['action'],
    icon?: MenuItem['icon']
  ) => MenuItem) => MenuItem[])
);