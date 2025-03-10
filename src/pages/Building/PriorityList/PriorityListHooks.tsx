import { useState } from "react";

import Tierlist from "@/components/common/Tierlist";
import { CharacterImage, ArtifactImage, DomainImage } from "@/components/common/Images";

import { useDataStore, useRegionStore, useRegionData, RegionData } from "@/stores";

import { onUnsortedSearch, getDefaultPriorityLists } from "./PriorityListFunctions";
import useOnChange from "@/hooks/useOnChange";
import { Tier } from "@/components/common/Tierlist/TierlistTypes";

export function usePriorityListTabs() {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();
  const { region, ...regionData } = useRegionData();
  const [priorityLists, setPriorityLists] = useState(
    regionData.priorityLists ?? getDefaultPriorityLists(DataStore)
  );

  const onTierChange = (tierlistTitle: string) => (tiers: Array<Tier<string>>) => setPriorityLists(state => ({
    ...state,
    [tierlistTitle]: {
      ...state[tierlistTitle],
      tiers
    }
  }));

  const deleteTab = (tab: string) => {
    if (!confirm(`Are you sure you want to delete the tab "${tab}"?`)) return;

    let { [tab]: _, ...newPriorityList } = priorityLists;
    if (!Object.keys(newPriorityList).length) newPriorityList = getDefaultPriorityLists(DataStore);
    setPriorityLists(newPriorityList);
  };

  const tabs = Array.from(Object.entries(priorityLists)).map(([tierlistTitle, priorityList]) => {
    const modelType = priorityList.model;
    const items = DataStore[`${modelType}Names`];

    return [
      tierlistTitle,
      <Tierlist key={tierlistTitle} {...{
        items, onUnsortedSearch,
        defaultTiers: priorityList.tiers,
        onTierChange: onTierChange(tierlistTitle)
      }}>
        {modelName => {
          switch (modelType) {
            case 'Character': return <CharacterImage character={modelName} />;
            case 'Artifact': return <ArtifactImage set={modelName} />;
            case 'Domain': return <DomainImage domain={modelName} />;
            default: return `Unknown model for ${modelName}`;
          }
        }}
      </Tierlist>
    ] as const;
  });

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

  return {
    tabs: tabs.map(([key]) => [key, (
      <>
        {/* TODO: Make modifiable */}
        <span>{key}</span>
        <button className="close" onClick={() => deleteTab(key)}>&times;</button>
      </>
    )] as const),
    ...tabs.reduce((props, [key, content]) => ({ ...props, [key]: content }), {})
  };
}
