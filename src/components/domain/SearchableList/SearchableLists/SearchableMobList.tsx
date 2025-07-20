import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Mob, EasyMob, EliteMob, Boss, WorldBoss, WeeklyBoss } from "@/common/models";
import { MobCard } from "@/components/domain/models/Mob";
import { Props as MobCardProps } from "@/components/domain/models/Mob/MobCard/MobCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { useFavorite } from "@/stores";
import { FavoriteStar } from "@/components/common/media/icons/Star";

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

  return <SearchableList 
    items={items}
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={mob => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/mobs/${mob.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(mob) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(mob) ? FavoriteStore.remove(mob) : FavoriteStore.add(mob), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, mob]), '🙈'),
      ]);      
      
      return hidden.includes(mob) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(mob) && <FavoriteStar model={mob} />}
          <MobCard mob={mob} {...cardProps} />
        </div>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      type: {
        easy: EasyMob.isEasyMob,
        elite: EliteMob.isEliteMob,
        boss: Boss.isBoss,
        worldBoss: WorldBoss.isWorldBoss,
        weeklyBoss: WeeklyBoss.isWeeklyBoss,
      },
      region: {
        mondstadt: mob => Boss.isBoss(mob) && mob.region === "Mondstadt",
        liyue: mob => Boss.isBoss(mob) && mob.region === "Liyue",
        inazuma: mob => Boss.isBoss(mob) && mob.region === "Inazuma",
        sumeru: mob => Boss.isBoss(mob) && mob.region === "Sumeru",
        fontaine: mob => Boss.isBoss(mob) && mob.region === "Fontaine",
        natlan: mob => Boss.isBoss(mob) && mob.region === "Natlan",
        snezhnaya: mob => Boss.isBoss(mob) && mob.region === "Snezhnaya",
        unknown: mob => Boss.isBoss(mob) && mob.region === "Unknown",
      },
      ...filterChecks
    }}
    {...props}
  />;
}
