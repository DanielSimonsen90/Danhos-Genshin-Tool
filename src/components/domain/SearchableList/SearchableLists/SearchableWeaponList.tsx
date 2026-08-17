import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Weapon } from "@/common/models";
import { WeaponCard, WeaponPopover } from "@/components/domain/models/Weapon";
import { Props as WeaponCardProps } from "@/components/domain/models/Weapon/WeaponCard/WeaponCard";

import { useDataStore, useFavorite } from "@/stores";
import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { weaponFilterChecks, weaponSortChecks } from "./filters/weapon.filter";

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
        <WeaponPopover weaponName={weapon.name} showDelay={500}>
          <div className="context-menu-item-container" onContextMenu={open}>
            {FavoriteStore.isFavorite(weapon) && <FavoriteStar model={weapon} />}
            <WeaponCard weapon={weapon} {...cardProps} />
          </div>
        </WeaponPopover>
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
      ...weaponFilterChecks,
      ...filterChecks
    }}
    sortChecks={weaponSortChecks}
    {...props}
  />;
}
