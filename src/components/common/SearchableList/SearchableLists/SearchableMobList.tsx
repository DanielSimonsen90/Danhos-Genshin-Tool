import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Mob, EasyMob, EliteMob, Boss, WorldBoss, WeeklyBoss } from "@/common/models";
import { MobCard } from "@/components/domain/Mob";
import { Props as MobCardProps } from "@/components/domain/Mob/MobCard/MobCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "../Props";
import SearchableList from "../SearchableList";

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

  return <SearchableList items={items}
    renderItem={mob => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/mobs/${mob.name}`), '👁️'),
        item('option', 'Hide', () => setHidden([...hidden, mob]), '🙈'),
      ]);
      return hidden.includes(mob) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          <MobCard mob={mob} {...cardProps} />
        </div>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => navigate(`?query=${search}&filters=${JSON.stringify(filters)}`)}
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