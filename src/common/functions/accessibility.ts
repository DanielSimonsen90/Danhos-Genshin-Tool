export function addTabNavigation(onSelect: (e: React.UIEvent) => void, includeClick = false) {
  const props = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'NumPadEnter' || e.key === ' ') onSelect(e);
    }
  };

  return includeClick 
    ? { ...props, onMouseDown: onSelect }
    : props;
}