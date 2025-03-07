import Modal from "@/components/common/Modal";
import { RegionSettings } from "@/stores/RegionStore/RegionStoreTypes";
import SettingsOption from "@/components/global/Header/components/SettingsModal/SettingsOption";
import { DEFAULT_REGION_DATA } from "@/stores/RegionStore/RegionStoreConstants";
import { useActionState } from "@/hooks/useActionState";

type NewUserData = (
  & Pick<RegionSettings, 'traveler' | 'region'>
)
type Props = {
  newUser: boolean;
  onSubmit: (newUserData: NewUserData) => void;
};

export const NewUserModal = ({ newUser, onSubmit }: Props) => {
  const [submitting, _onSubmit] = useActionState<NewUserData>(data => {
    delete data._form;
    onSubmit(data);
  })
  
  return newUser ? (
    <Modal className="new-user-modal" open={newUser} onClose={() => !submitting && onSubmit(DEFAULT_REGION_DATA)}>
      <form onSubmit={_onSubmit}>
        <h1>You wake up from a deep sleep on a beach in Monstadt...</h1>
        <div className="intro-sentence">
          <span>You wake up as </span>
          <SettingsOption setting="traveler" value={DEFAULT_REGION_DATA['traveler']} />
          <span> in </span>
          <SettingsOption setting="region" value={DEFAULT_REGION_DATA['region']} />
        </div>
        <input type="submit" value="Finish" disabled={submitting} />
      </form>
    </Modal>
  ) : null;
}
