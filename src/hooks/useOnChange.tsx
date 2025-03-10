import { useEffect, DependencyList, useRef } from "react";
import isEqual from 'lodash/fp/isEqual';

export default function useOnChange<TValue>(
  value: TValue, 
  onChange: (update: TValue, previous: TValue) => void, 
  deps: DependencyList = []
) {
  const dependenciesRef = useRef([value, onChange, ...deps]);
  const previousValue = useRef(value);

  if (!isEqual(dependenciesRef.current, [value, onChange, ...deps])) {
    dependenciesRef.current = [value, onChange, ...deps];
  }

  useEffect(() => {
    if (previousValue.current === value) return;
    
    onChange?.(value, previousValue.current);
    previousValue.current = value;
}, [dependenciesRef.current]);
}