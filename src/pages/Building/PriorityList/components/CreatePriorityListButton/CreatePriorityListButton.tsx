import { ReactNode } from "react";

type Props = {
  onClick(): void;
  tabBarCollapsed: boolean;
  
  children?: ReactNode
}

export const CreatePriorityListButton = ({ onClick, tabBarCollapsed, children }: Props) => (
  <div className="priority-list-button-container">
    <button className="priority-list-button success secondary" onClick={onClick}>
      {tabBarCollapsed ? <span>+</span> : (children ?? <span>Create a <b>Priority list</b></span>)}
    </button>
  </div>
)