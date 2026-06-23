import { useContext } from "react";
import { ConfirmContext } from "./ConfirmProviderConstants";
import { ConfirmFn } from "./ConfirmProviderTypes";

export function useConfirm(): ConfirmFn {
  return useContext(ConfirmContext);
}