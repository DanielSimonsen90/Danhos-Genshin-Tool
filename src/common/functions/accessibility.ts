export function addTabNavigation(onSelect: (e: React.UIEvent) => void, includeClick = false) {
  return {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'NumPadEnter' || e.key === ' ') onSelect(e);
    },
    [includeClick ? 'onMouseDown' : undefined]: includeClick ? onSelect : undefined
  }
}