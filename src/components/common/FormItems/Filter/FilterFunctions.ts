import { SelectRef } from "../Select/types";
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { FilterObject } from "./Filter";

type Props = {
  refs: MutableRefObject<Array<SelectRef>>,
  setShowOptions: Dispatch<SetStateAction<boolean>>,
  filterChecks: FilterObject<string, any>,
};

export const getDefaultValueForRefs = (filterChecks: Props['filterChecks']): Array<SelectRef> => Object.keys(filterChecks).map(() => ({ current: null as any }));
export const getCloseAllMultipleSelects = (refs: Props['refs']) => (except?: number) => refs.current.forEach((ref, i) => i !== except && ref && 'current' in ref && ref.current?.close());
export const getOnClickedOutside = (closeAllMultipleSelects: ReturnType<typeof getCloseAllMultipleSelects>, setShowOptions: Props['setShowOptions']) => () => {
  closeAllMultipleSelects();
  setShowOptions(false);
};
