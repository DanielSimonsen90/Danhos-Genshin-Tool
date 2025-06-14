import { useEffect, useRef } from "react";

export function useDebounce(): (callback: () => void, delay: number) => void {
  const ref = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);

  return (callback: () => void, delay: number) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      callback();
      ref.current = undefined;
    }, delay);
  };
}