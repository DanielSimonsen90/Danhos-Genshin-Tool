import { RefObject, useRef, useEffect } from "react";

export default function useClickOutside<
  TTag extends keyof HTMLElementTagNameMap, 
  TElement extends HTMLElementTagNameMap[TTag]
>(refTag: TTag, onOutsideClicked: () => void): RefObject<TElement> {
  const ref = useRef<TElement>(null);

  useClickOutsideRef<TElement>(ref, onOutsideClicked);

  return ref;
}

export function useClickOutsideRef<TElement extends HTMLElement>(ref: { current: TElement | null }, onOutsideClicked: () => void) {
  useEffect(() => {
    const onClick = (e: MouseEvent | TouchEvent) => {
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
  }, [onOutsideClicked, ref]);
}