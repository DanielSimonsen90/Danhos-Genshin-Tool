import { useState, useMemo } from 'react';
import { Arrayable } from '@/common/types';

type Direction = 'horizontal' | 'vertical';
type ChevronPoint = 'left' | 'right' | 'down' | 'up';

interface UseTabCollapseProps {
  children?: Arrayable<JSX.Element | ((collapsed: boolean) => JSX.Element)>;
  hideCollapseChevron?: boolean;
  direction: Direction;
}

export function useTabCollapse({
  children: childrenProp,
  hideCollapseChevron, direction
}: UseTabCollapseProps) {
  
  const [collapsed, setCollapsed] = useState(false);

  // Resolve children based on collapse state
  const children = useMemo(() => {
    if (!childrenProp) return undefined;
    
    const resolveChild = (child: JSX.Element | ((collapsed: boolean) => JSX.Element)) => (
      typeof child === 'function' ? child(collapsed) : child
    );
    
    return Array.isArray(childrenProp) 
      ? childrenProp.map(resolveChild) 
      : resolveChild(childrenProp);
  }, [childrenProp, collapsed]);

  // Calculate chevron direction based on collapse state and direction
  const chevronPoint = useMemo((): ChevronPoint => (
    direction === 'horizontal' ? (collapsed ? 'down' : 'up') : (collapsed ? 'left' : 'right')
  ), [collapsed, direction]);

  const toggleCollapsed = () => setCollapsed(v => !v);

  return {
    collapsed,
    setCollapsed,
    toggleCollapsed,
    children,
    chevronPoint,
    showCollapseChevron: !!hideCollapseChevron
  };
}
