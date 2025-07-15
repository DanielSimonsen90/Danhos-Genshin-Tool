import { useState } from "react";

import TabBar from "@/components/common/TabBar";
import useOnChange from "@/hooks/useOnChange";
import { useDataStore, useRegionData, useRegionStore } from "@/stores";

import { CreatePriorityListButton } from "./components";
import { useModifyPriorityList, usePriorityListTabs } from "./hooks";
import { PriorityList } from "./PriorityListTypes";
import { getDefaultPriorityLists } from "./PriorityListFunctions";
import { DebugLog } from '@/common/functions/dev';

const debugLog = DebugLog(DebugLog.DEBUGS.priorityList);

export default function PriorityList() {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();
  const { region, ...regionData } = useRegionData();

  const [priorityLists, setPriorityLists] = useState(
    regionData.priorityLists ?? getDefaultPriorityLists(DataStore)
  );
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
  
  useOnChange(region, (current, previous) => {
    debugLog(`Region changed from ${previous} to ${current}`);

    const update = (
      regionData.priorityLists
      ?? getDefaultPriorityLists(DataStore)
    );
    
    if (JSON.stringify(priorityLists) !== JSON.stringify(update)) setPriorityLists(update);
  }, [regionData.priorityLists, DataStore]);

  useOnChange(priorityLists, priorityLists => RegionStore.setRegionData({ priorityLists }));

  return (<>
    <TabBar direction="vertical" collapseArea="tabs" className="priority-list"
      tabs={tabs} noTabs={<NoTabs />} id={`priority-list-${region}`}
      placeChildrenBeforeTabs
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