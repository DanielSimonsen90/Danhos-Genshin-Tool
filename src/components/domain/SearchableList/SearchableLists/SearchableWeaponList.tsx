import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Weapon } from "@/common/models";
import { WeaponCard } from "@/components/domain/models/Weapon";
import { Props as WeaponCardProps } from "@/components/domain/models/Weapon/WeaponCard/WeaponCard";

import { useDataStore, useFavorite } from "@/stores";
import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { Rarity } from "@/common/types";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Weapon, TFilterKeys>>
  & OptionalProps<Weapon, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<WeaponCardProps, 'weapon'>>;
  }
);
export default function SearchableWeaponList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Weapon>());
  const DataStore = useDataStore();
  const FavoriteStore = useFavorite('weapons');

  return <SearchableList items={items ?? []}
    placeholder="Search weapons..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={weapon => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/weapons/${weapon.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(weapon) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(weapon) ? FavoriteStore.remove(weapon) : FavoriteStore.add(weapon), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, weapon]), '🙈'),
      ]);
      return hidden.includes(weapon) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(weapon) && <FavoriteStar model={weapon} />}
          <WeaponCard weapon={weapon} {...cardProps} />
        </div>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch ?? (() => true) : (query, item) => (() => {
      const { name, description, } = item;
      const signatureCharacter = item.signatureWeaponFor?.(DataStore.CharactersData);
      const strings = [
        name, description.value,
        signatureCharacter ? signatureCharacter.name : '',
      ]

      return strings.some(str => str.toLowerCase().includes(query.toLowerCase()));
    })() && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      weaponType: {
        sword: weapon => weapon.type === "Sword",
        claymore: weapon => weapon.type === "Claymore",
        polearm: weapon => weapon.type === "Polearm",
        bow: weapon => weapon.type === "Bow",
        catalyst: weapon => weapon.type === "Catalyst",
      },
      rarity: {
        '5 star': weapon => weapon.rarity === Rarity.Legendary,
        '4 star': weapon => weapon.rarity === Rarity.Epic,
        '3 star': weapon => weapon.rarity === Rarity.Rare,
        // '2 star': weapon => weapon.rarity === Rarity.Uncommon,
        // '1 star': weapon => weapon.rarity === Rarity.Common,
      },
      secondaryStat: {
        hp: weapon => weapon.secondaryStat === 'HP',
        attack: weapon => weapon.secondaryStat === 'ATK',
        defense: weapon => weapon.secondaryStat === 'DEF',
        energyRecharge: weapon => weapon.secondaryStat === 'Energy Recharge',
        elementalMastery: weapon => weapon.secondaryStat === 'Elemental Mastery',
        critRate: weapon => weapon.secondaryStat === 'Crit Rate',
        critDamage: weapon => weapon.secondaryStat === 'Crit DMG',
        physicalDamage: weapon => weapon.secondaryStat === 'Physical DMG Bonus',
      },
      ...filterChecks
    }}
    {...props}
  />;
}
