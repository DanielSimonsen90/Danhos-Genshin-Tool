import { ReactNode } from "react";

type Props = {
  onClick(): void;
  
  children?: ReactNode
}

export const CreatePriorityListButton = ({ onClick, children }: Props) => (
  <div className="priority-list-button-container">
    <button className="priority-list-button success secondary" onClick={onClick}>
      {children ?? <>Create a <b>Priority list</b></>}
    </button>
  </div>
)