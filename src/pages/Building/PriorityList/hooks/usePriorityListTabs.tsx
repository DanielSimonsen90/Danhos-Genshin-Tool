import { Dispatch, SetStateAction, useCallback } from "react";

import { CharacterImage, ArtifactImage, DomainImage, MaterialImage, MobImage, WeaponImage } from "@/components/common/Images";
import Tierlist, { Tier } from "@/components/common/Tierlist";
import { useDataStore } from "@/stores";

import type { PriorityLists, PriorityList } from "../PriorityListTypes";
import { getDefaultPriorityLists, onUnsortedSearch } from "../PriorityListFunctions";
import { PriorityListTab } from "../components";

type UsePriorityListTabsProps = {
  priorityLists: PriorityLists;
  setPriorityLists: Dispatch<SetStateAction<PriorityLists>>;
  openUpdateModal: (priorityList?: PriorityList, title?: string) => void;
};

export function usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal }: UsePriorityListTabsProps) {
  const DataStore = useDataStore();  const onTierChange = useCallback((tierlistTitle: string) => (tiers: Array<Tier<string>>) => {
    setPriorityLists(state => ({
      ...state,
      [tierlistTitle]: {
        ...state[tierlistTitle],
        tiers
      }
    }));
  }, [setPriorityLists]);
  const onEdit = useCallback((tierlistKey: string) => {
    const priorityList = priorityLists?.[tierlistKey];
    openUpdateModal(priorityList, tierlistKey);
  }, [priorityLists, openUpdateModal]);
  
  const deleteTab = useCallback((tab: string) => {
    if (!confirm(`Are you sure you want to delete the tab "${tab}"?`)) return;

    let { [tab]: _, ...newPriorityList } = priorityLists;
    if (!Object.keys(newPriorityList).length) newPriorityList = getDefaultPriorityLists(DataStore);
    setPriorityLists(newPriorityList);
  }, [priorityLists, DataStore, setPriorityLists]);

  return Array.from(Object.entries(priorityLists)).map(([tierlistTitle, priorityList]) => {
    const modelType = priorityList.model;
    const items = DataStore[`${modelType}Names`];

    return [
      tierlistTitle,
      {
        title: <PriorityListTab title={tierlistTitle} onEdit={() => onEdit(tierlistTitle)} onDelete={() => deleteTab(tierlistTitle)} />,
        content: (
          <Tierlist key={tierlistTitle} {...{
            model: modelType,
            items, onSearch: onUnsortedSearch,
            defaultTiers: priorityList.tiers,
            onTierChange: onTierChange(tierlistTitle)
          }}>
            {modelName => {
              switch (modelType) {
                case 'Character': return <CharacterImage character={modelName} />;
                case 'Artifact': return <ArtifactImage set={modelName} />;
                case 'Domain': return <DomainImage domain={modelName} />;
                case 'Material': return <MaterialImage material={modelName} />;
                case 'Mob': return <MobImage mob={modelName} />;
                case 'Weapon': return <WeaponImage weapon={modelName} />;
                default: return `Unknown model for ${modelName}`;
              }
            }}
          </Tierlist>
        )
      }
    ] as const;
  });
}