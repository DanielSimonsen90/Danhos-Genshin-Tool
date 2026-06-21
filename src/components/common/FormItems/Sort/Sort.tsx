import { useState, Dispatch, SetStateAction, EventHandler, useCallback } from "react";
import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import useClickOutside from "@/hooks/useClickOutside";
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
  const [showOptions, setShowOptions] = useState(false);
  const ref = useClickOutside('div', () => setShowOptions(false));

  const onToggleShowOptions = useCallback<EventHandler<any>>(e => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(v => !v);
  }, []);

  const firstActive = activeSorts[0];
  const headerLabel = firstActive
    ? `${pascalCaseFromCamelCase(firstActive.key)} ${firstActive.direction === 'asc' ? '▲' : '▼'}${activeSorts.length > 1 ? ` +${activeSorts.length - 1}` : ''}`
    : (placeholder ?? 'Sort');

  return (
    <div className="sort">
      <button type="button" className="sort__header" {...addTabNavigation(onToggleShowOptions, true)}>
        <SortIcon />
        {headerLabel}
      </button>

      <div ref={ref} className={classNames("select__options", "floatable", showOptions && "select__options--open", "sort-options")}>
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
                  <span className="sort-option__direction">{direction === 'asc' ? '▲' : '▼'}</span>
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
      </div>
    </div>
  );
}
