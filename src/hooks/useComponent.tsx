import { FC, useCallback, useMemo, useState } from "react";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.useComponent);

export function useComponent<Props>(Component: FC<Props>, props: Props) {
  const [internalProps, setInternalProps] = useState(props);
  const instance = useCallback(() => <Component {...internalProps} />, [internalProps]);
  
  const setProps = useCallback((newProps: Partial<Props>) => {
    debugLog('setProps', { internalProps, newProps });
    setInternalProps(props => ({ ...props, ...newProps }));
  }, []);

  debugLog('useComponent update', { internalProps, props });

  return [instance, setProps] as const;
}