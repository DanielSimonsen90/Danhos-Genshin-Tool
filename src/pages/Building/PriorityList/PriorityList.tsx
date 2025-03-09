import { useState } from "react";

import TabBar from "@/components/common/TabBar";

import { CreatePriorityListButton, CreatePriorityListModal } from "./components";
import { usePriorityListTabs } from "./PriorityListHooks";
import { NoTabs } from "./components/NoTabs";

export default function PriorityList() {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const tabData = usePriorityListTabs();

  return (<>
    <TabBar {...tabData} className="priority-list"
      noTabs={<NoTabs setShowCreationModal={setShowCreationModal} />}
    >
      <CreatePriorityListButton onClick={() => setShowCreationModal(true)} />
    </TabBar>

    <CreatePriorityListModal open={showCreationModal} onClose={() => setShowCreationModal(false)} />
  </>);
}