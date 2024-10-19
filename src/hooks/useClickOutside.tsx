import { RefObject, useRef, useEffect, MutableRefObject } from "react";

export default function useClickOutside<
  TTag extends keyof HTMLElementTagNameMap, 
  TElement extends HTMLElementTagNameMap[TTag]
>(refTag: TTag, onOutsideClicked: () => void): RefObject<TElement> {
  const ref = useRef<TElement>(null);

  useClickOutsideRef(ref, onOutsideClicked);

  return ref;
}

export function useClickOutsideRef<TElement extends HTMLElement>(ref: { current: TElement }, onOutsideClicked: () => void) {
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
  }, [onOutsideClicked, ref]);
}