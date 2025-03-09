import { CreatePriorityListButton } from "../CreatePriorityListButton";

type Props = {
  setShowCreationModal: (show: boolean) => void;
}

export const NoTabs = ({ setShowCreationModal }: Props) => (
  <div className="no-tabs">
    <p className="muted">There are currently no priority lists...</p>
    <CreatePriorityListButton onClick={() => setShowCreationModal(true)} children="Create one" />
  </div>
)