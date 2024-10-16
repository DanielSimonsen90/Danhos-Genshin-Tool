import Modal from "@/components/common/Modal";
import { Settings } from "../../SettingsStoreTypes";
import { CharacterImage } from "@/components/common/Images";

type Props = {
  newUser: boolean;
  onTravelerSelect: (traveler: Settings['traveler']) => void;
};

export const NewUserModal = ({ newUser, onTravelerSelect }: Props) => {
  return newUser ? (
    <Modal className="new-user-modal" open={newUser} onClose={() => onTravelerSelect('lumine')}>
      <h1>You wake up from a deep sleep on a beach in Monstadt...</h1>
      <p>You wake up as:</p>
      <ul className="traveler-select">
        <li className="traveler-option" title="Lumine">
          <CharacterImage character='Lumine' />
          <button className="brand primary" onClick={() => onTravelerSelect('lumine')}>Lumine</button>
        </li>
        <li className="traveler-option" title="Aether">
          <CharacterImage character='Aether' />
          <button className="brand primary" onClick={() => onTravelerSelect('aether')}>Aether</button>
        </li>
      </ul>
    </Modal>
  ) : null;
}
