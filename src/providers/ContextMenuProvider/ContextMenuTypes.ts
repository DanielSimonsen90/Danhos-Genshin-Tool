import { CreateMenuItem } from "./ContextMenuConstants";

export type ContextMenuContextType = (e: React.MouseEvent) => (items: MenuItems, position?: Position) => {
  ref: React.RefObject<HTMLDivElement>;
  close(): void;
};

type PositionX = 'left' | 'right';
type PositionY = 'top' | 'bottom';
export type Position = `${PositionY}-${PositionX}`;

export type MenuItemTypes = 'option' | 'divider';
export type MenuItemOption = {
  type: 'option';
  label: React.ReactNode;
  action(): void;
  icon?: React.ReactNode;
};
export type MenuItemDivider = {
  type: 'divider';
  label?: string;
};

export type MenuItem = MenuItemOption | MenuItemDivider;

export type MenuItems = (
  MenuItem[]
  | ((creator: typeof CreateMenuItem) => MenuItem[])
);