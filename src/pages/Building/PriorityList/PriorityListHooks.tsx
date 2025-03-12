import { Dispatch, SetStateAction, useState } from "react";

import { CharacterImage, ArtifactImage, DomainImage } from "@/components/common/Images";
import Tierlist, { Tier, getDefaultTiers } from "@/components/common/Tierlist";
import useOnChange from "@/hooks/useOnChange";

import { useDataStore, useRegionStore, useRegionData, RegionData } from "@/stores";

import { PriorityListTab } from "./components/PriorityListTab";
import { ModifyPriorityListModal, ModifyPriorityListModalParentProps as ModifyModalProps } from "./components";
import { onUnsortedSearch, getDefaultPriorityLists } from "./PriorityListFunctions";
import { ModifyPriorityListPayload, PriorityList, PriorityLists } from "./PriorityListTypes";
import { ABOUT_TO_REPLACE_EXISTING } from "./PriorityListConstants";

type UsePriorityListTabsProps = {
  priorityLists: PriorityLists;
  setPriorityLists: Dispatch<SetStateAction<PriorityLists>>;
  openUpdateModal: (priorityList?: PriorityList, title?: string) => void;
};

export function usePriorityListTabs({ priorityLists, setPriorityLists, openUpdateModal }: UsePriorityListTabsProps) {
  const DataStore = useDataStore();

  const onTierChange = (tierlistTitle: string) => (tiers: Array<Tier<string>>) => setPriorityLists(state => ({
    ...state,
    [tierlistTitle]: {
      ...state[tierlistTitle],
      tiers
    }
  }));

  const onEdit = (tierlistKey: string) => {
    const priorityList = priorityLists?.[tierlistKey];
    openUpdateModal(priorityList, tierlistKey);
  };
  const deleteTab = (tab: string) => {
    if (!confirm(`Are you sure you want to delete the tab "${tab}"?`)) return;

    let { [tab]: _, ...newPriorityList } = priorityLists;
    if (!Object.keys(newPriorityList).length) newPriorityList = getDefaultPriorityLists(DataStore);
    setPriorityLists(newPriorityList);
  };

  return Array.from(Object.entries(priorityLists)).map(([tierlistTitle, priorityList]) => {
    const modelType = priorityList.model;
    const items = DataStore[`${modelType}Names`];

    return [
      tierlistTitle,
      {
        title: <PriorityListTab title={tierlistTitle} onEdit={() => onEdit(tierlistTitle)} onDelete={() => deleteTab(tierlistTitle)} />,
        content: (
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
        )
      }
    ] as const;
  });
}

type UseModifyPriorityListProps = {
  crud: ModifyModalProps['crud'];
  priorityLists?: PriorityLists;
  setPriorityLists?: Dispatch<SetStateAction<PriorityLists>>;
};
export function useModifyPriorityList({ crud, priorityLists, setPriorityLists }: UseModifyPriorityListProps) {
  const DataStore = useDataStore();
  const { setRegionData, ...regionData } = useRegionData();
  const [modifyList, setModifyList] = useState<ModifyPriorityListPayload | null>(null);
  const [open, setOpen] = useState(false);

  const onSubmit = (payload: ModifyPriorityListPayload) => {
    const { title, model, tiers, id } = payload;
    const priorityList: PriorityList = {
      model,
      tiers: priorityLists[id]?.model === model
        ? tiers
        : getDefaultTiers(DataStore[`${model}Names`])()
    };

    const shouldDeleteId = id !== title;
    const isReplacingExisting = priorityLists[title] !== undefined;
    const shouldReplaceExisting = isReplacingExisting && confirm(ABOUT_TO_REPLACE_EXISTING);
    if (isReplacingExisting && !shouldReplaceExisting) return;

    setRegionData(current => {
      const update = ({
        ...current,
        priorityLists: {
          ...priorityLists,
          [title]: priorityList
        }
      }) as RegionData;
      if (shouldDeleteId) delete update.priorityLists[id];
      return update;
    });
    setPriorityLists?.(state => {
      const update = ({
        ...state,
        [title]: priorityList
      }) as PriorityLists;
      if (shouldDeleteId) delete update[id];
      return update;
    });
    setOpen(false);
  };
  const triggerModal = (priorityList?: PriorityList, title?: string) => {
    setModifyList(Object.assign({ title, id: title, model: undefined }, priorityList));
    setOpen(true);
  };

  const ModifyPriorityListModalWrapper = () => <ModifyPriorityListModal
    open={open} onClose={() => setOpen(false)}
    {...{ modifyList, crud, onSubmit }}
  />;

  return [ModifyPriorityListModalWrapper, triggerModal] as const;
}