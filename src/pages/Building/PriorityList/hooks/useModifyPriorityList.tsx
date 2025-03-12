import { Dispatch, SetStateAction, useState } from "react";

import { getDefaultTiers } from "@/components/common/Tierlist";
import { useDataStore, useRegionData, RegionData } from "@/stores";

import { ModifyPriorityListModal, ModifyPriorityListModalParentProps as ModifyModalProps } from "../components";
import { ABOUT_TO_REPLACE_EXISTING } from "../PriorityListConstants";
import type { ModifyPriorityListPayload, PriorityList, PriorityLists } from "../PriorityListTypes";

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
        : getDefaultTiers(DataStore[`${model}Names`])
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