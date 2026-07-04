import { createContext } from "react";
import { ConfirmFn } from "./ConfirmProviderTypes";

export const ConfirmContext = createContext<ConfirmFn>(() => Promise.resolve(false));