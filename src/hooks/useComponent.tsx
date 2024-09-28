import { FC, useCallback, useMemo, useState } from "react";

export function useComponent<Props>(Component: FC<Props>, props: Props) {
  const [internalProps, setInternalProps] = useState(props);
  const instance = useCallback(() => <Component {...internalProps} />, [internalProps]);
  
  const setProps = useCallback((newProps: Partial<Props>) => {
    setInternalProps(props => ({ ...props, ...newProps }));
  }, []);

  return [instance, setProps] as const;
}