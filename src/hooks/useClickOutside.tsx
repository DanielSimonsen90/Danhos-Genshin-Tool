import { RefObject, useRef, useEffect } from "react";

export default function useClickOutside<
  TTag extends keyof HTMLElementTagNameMap, 
  TElement extends HTMLElementTagNameMap[TTag]
>(refTag: TTag, onOutsideClicked: () => void): RefObject<TElement> {
  const ref = useRef<TElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClicked();
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('touchstart', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
    }
  }, [onOutsideClicked]);

  return ref;
}