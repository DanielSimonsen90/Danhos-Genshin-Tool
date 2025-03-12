import { ReactNode } from "react";
import { NewUserModal, SaveSettingsNotice } from "@/stores/SettingsStore/components";

type Props = {
  children: ReactNode;
};

const SettingsLayer = ({ children }: Props) => (<>
  <SaveSettingsNotice />
  <NewUserModal />
  {children}
</>);

export default SettingsLayer;