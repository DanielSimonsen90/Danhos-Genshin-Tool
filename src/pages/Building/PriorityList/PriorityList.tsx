import type { SetStateAction } from "react";
import TabBar from "@/components/common/TabBar";
import { useDataStore, useRegionStore } from "@/stores";

import { CreatePriorityListButton } from "./components";
import { useModifyPriorityList, usePriorityListTabs } from "./hooks";
import { PriorityList, PriorityLists } from "./PriorityListTypes";
import { getDefaultPriorityLists } from "./PriorityListFunctions";

export default function PriorityList() {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();
  const priorityLists = RegionStore.regionData.priorityLists ?? getDefaultPriorityLists(DataStore);

  const setPriorityLists = (newPriorityListsOrUpdater: SetStateAction<PriorityLists>) => {
    const newPriorityLists = typeof newPriorityListsOrUpdater === 'function'
      ? newPriorityListsOrUpdater(priorityLists)
      : newPriorityListsOrUpdater;
    
    RegionStore.setRegionData({ priorityLists: newPriorityLists });
  };

  const [CreateModal, openCreateModal] = useModifyPriorityList({
    crud: 'create',
    priorityLists,
    setPriorityLists
  });
  const [UpdateModal, openUpdateModal] = useModifyPriorityList({
    crud: 'update',
    priorityLists,
    setPriorityLists
  });  
  const tabs = usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal });
  
  return (<>
    <TabBar 
      direction="vertical" 
      collapseArea="tabs" 
      className="priority-list"
      tabs={tabs} 
      noTabs={<NoTabs />} 
      id={`priority-list-${RegionStore.regionData.region}`}
      placeChildrenBeforeTabs
      resizable
      minSize={100}
      initialSize={180}
      maxSize={600}
      cacheContent={false}
    >
      {collapsed => <CreatePriorityListButton tabBarCollapsed={collapsed} onClick={() => openCreateModal()} />}
    </TabBar>

    <CreateModal />
    <UpdateModal />
  </>);
}

const NoTabs = () => (
  <p className="muted">
    <span>
      You have no tabs... which should be impossible.
    </span>
    <span>
      Have you tried <a href="#" onClick={() => window.location.reload()}>refreshing</a>?
    </span>
  </p>
);