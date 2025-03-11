import { useEffect, useState } from "react";
import TabBar from "@/components/common/TabBar";
import { RegionData, useDataStore, useRegionData, useRegionStore } from "@/stores";

import { CreatePriorityListButton } from "./components";
import { useModifyPriorityList, usePriorityListTabs } from "./PriorityListHooks";
import { PriorityList } from "./PriorityListTypes";
import { getDefaultPriorityLists } from "./PriorityListFunctions";
import useOnChange from "@/hooks/useOnChange";

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
  const tabData = usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal });

  useOnChange(region, (current, previous) => {
    const update = (
      regionData.priorityLists
      ?? getDefaultPriorityLists(DataStore)
    );
    if (JSON.stringify(priorityLists) !== JSON.stringify(update)) setPriorityLists(update);

    if (previous === current) return;
    RegionStore.setState(store => ({
      ...store,
      regions: {
        ...store.regions,
        [previous]: {
          ...store.regions[previous],
          priorityLists
        } as RegionData
      }
    }));
  }, [priorityLists, regionData.priorityLists, RegionStore]);

  useOnChange(priorityLists, () => RegionStore.setRegionData({ priorityLists }));

  return (<>
    <TabBar direction="vertical" collapseArea="tabs" className="priority-list" placeChildrenBeforeTabs
      {...tabData} noTabs={<NoTabs />}
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