import { useEffect, DependencyList } from "react";

export default function useOnChange<TValue>(value: TValue, onChange: (value: TValue) => void, deps: DependencyList = []) {
  useEffect(() => {
    onChange?.(value);
  }, [value, onChange, ...deps]);
}