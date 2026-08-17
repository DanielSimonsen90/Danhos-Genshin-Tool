import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Mob } from "@/common/models";
import { MobCard, MobPopover } from "@/components/domain/models/Mob";
import { Props as MobCardProps } from "@/components/domain/models/Mob/MobCard/MobCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { useFavorite } from "@/stores";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { mobFilterChecks, mobSortChecks } from "./filters/mob.filter";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Mob, TFilterKeys>>
  & OptionalProps<Mob, TFilterKeys> & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<MobCardProps, 'mob'>>;
  }
);

export default function SearchableMobList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Mob>());
  const FavoriteStore = useFavorite('mobs');

  return <SearchableList items={items ?? []}
    placeholder="Search mobs..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={mob => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/mobs/${mob.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(mob) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(mob) ? FavoriteStore.remove(mob) : FavoriteStore.add(mob), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, mob]), '🙈'),
      ]);

      return hidden.includes(mob) ? null : (
        <MobPopover mobName={mob.name} showDelay={500}>
          <div className="context-menu-item-container" onContextMenu={open}>
            {FavoriteStore.isFavorite(mob) && <FavoriteStar model={mob} />}
            <MobCard mob={mob} {...cardProps} />
          </div>
        </MobPopover>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch ?? (() => true) : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      ...mobFilterChecks,
      ...filterChecks
    }}
    sortChecks={mobSortChecks}
    {...props}
  />;
}
