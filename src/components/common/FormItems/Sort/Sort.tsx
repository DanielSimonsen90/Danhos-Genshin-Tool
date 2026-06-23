import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import useClickOutside from "@/hooks/useClickOutside";
import { useFloatingDropdown } from "@/hooks/useFloatingDropdown";
import { addTabNavigation } from "@/common/functions/accessibility";
import SortIcon from "@/components/common/media/icons/SortIcon";

export type SortObject<TItem> = Record<string, (a: TItem, b: TItem) => number>;
export type ActiveSort = { key: string; direction: 'asc' | 'desc' };

type Props<TItem> = {
  placeholder?: string,
  sortChecks: SortObject<TItem>,
  activeSorts: ActiveSort[],
  setActiveSorts: Dispatch<SetStateAction<ActiveSort[]>>,
};

export default function Sort<TItem>({ sortChecks, placeholder, activeSorts, setActiveSorts }: Props<TItem>) {
  const { showOptions, setShowOptions, headerRef, dropdownStyle, onToggle } = useFloatingDropdown();
  const ref = useClickOutside('div', () => setShowOptions(false));

  const firstActive = activeSorts[0];
  const headerLabel = firstActive
    ? `${pascalCaseFromCamelCase(firstActive.key)} ${firstActive.direction === 'asc' ? '▲' : '▼'}${activeSorts.length > 1 ? ` +${activeSorts.length - 1}` : ''}`
    : (placeholder ?? 'Sort');

  return (
    <div className="sort">
      <button ref={headerRef} type="button" className="sort__header" {...addTabNavigation(onToggle, true)}>
        <SortIcon />
        {headerLabel}
      </button>

      {showOptions && createPortal(
        <div ref={ref} className={classNames("select__options", "select__options--open", "sort-options")} style={dropdownStyle}>
          <ul>
            {Object.keys(sortChecks).map((key, i) => {
              const activeIndex = activeSorts.findIndex(s => s.key === key);
              const isActive = activeIndex !== -1;
              const direction = isActive ? activeSorts[activeIndex].direction : undefined;

              return (
                <li key={i}
                  className={classNames("select__option sort-option", isActive && "sort-option--active")}
                  onClick={() => setActiveSorts(prev => {
                    const existing = prev.findIndex(s => s.key === key);
                    if (existing === -1) return [...prev, { key, direction: 'asc' }];
                    if (prev[existing].direction === 'asc') {
                      const updated = [...prev];
                      updated[existing] = { key, direction: 'desc' };
                      return updated;
                    }
                    return prev.filter(s => s.key !== key);
                  })}
                >
                  {pascalCaseFromCamelCase(key)}
                  {isActive && (
                    <span className="sort-option__direction">
                      {direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <button type="button" className="brand--light secondary" onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            
            setActiveSorts([]);
          }}>
            Clear Sort
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
