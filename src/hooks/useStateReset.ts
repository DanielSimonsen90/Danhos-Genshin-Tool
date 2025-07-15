import { useCallback, useState } from "react";
import { Functionable } from "@/common/types";

export function useStateReset<T>(initialState: Functionable<T>) {
  const getResetState = useCallback((newState?: Functionable<T>) => {
    const stateResolvable = newState ?? initialState;
    return typeof stateResolvable === 'function' ? (stateResolvable as () => T)() : stateResolvable;
  }, [initialState]);

  const [state, setState] = useState<T>(getResetState);
  const resetState = useCallback((newState?: Functionable<T>) => setState(getResetState(newState)), [getResetState]);

  return [state, setState, resetState] as const;
}