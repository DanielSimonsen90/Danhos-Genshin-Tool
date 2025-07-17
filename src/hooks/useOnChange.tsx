import { useEffect, DependencyList, useRef, useCallback } from "react";
// @ts-ignore
import isEqual from 'lodash/fp/isEqual';

export default function useOnChange<TValue>(
  value: TValue, 
  onChange: (update: TValue, previous: TValue) => void, 
  deps: DependencyList = []
) {
  const previousValue = useRef(value);
  const stableOnChange = useCallback(onChange, deps);  
  
  useEffect(() => {
    if (isEqual(previousValue.current, value)) return;
    
    stableOnChange(value, previousValue.current);
    previousValue.current = value;
  }, [value, stableOnChange]);
}