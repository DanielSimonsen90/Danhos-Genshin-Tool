import { useEffect, useRef, useState } from 'react';

export default function useHover<T extends HTMLElement>() {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, hovered, setHovered] as const;
}