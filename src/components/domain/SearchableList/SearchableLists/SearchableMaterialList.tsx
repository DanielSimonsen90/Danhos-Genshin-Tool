import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Props as MaterialCardProps } from "@/components/domain/models/Material/MaterialCard/MaterialCard";
import MaterialCard from "@/components/domain/models/Material/MaterialCard";
import { MaterialPopover } from "@/components/domain/models/Material";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { useFavorite, useDataStore, useAccountStore } from "@/stores";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import Material from "@/common/models/materials/Material";
import { getMaterialFilterChecks, materialSortChecks } from "./filters/material.filter";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Material, TFilterKeys>>
  & OptionalProps<Material, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<MaterialCardProps, 'material'>>;
  }
);
export default function SearchableMaterialList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const worldRegion = useAccountStore(store => store.selectedAccount.worldRegion);
  const AccountStore = useAccountStore(store => store);
  const DataStore = useDataStore();
  const FavoriteStore = useFavorite('materials');

  const { query, filters } = useParams();
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(new Array<Material>());

  return <SearchableList items={items ?? []}
    placeholder="Search materials..."
    key={worldRegion}
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={material => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/materials/${material.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(material) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(material) ? FavoriteStore.remove(material) : FavoriteStore.add(material), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, material]), '🙈'),
      ]);

      return hidden.includes(material) ? null : (
        <MaterialPopover materialName={material.name} showDelay={500}>
          <div className="context-menu-item-container" onContextMenu={open}>
            {FavoriteStore.isFavorite(material) && <FavoriteStar model={material} />}
            <MaterialCard material={material} {...cardProps} />
          </div>
        </MaterialPopover>
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
      ...getMaterialFilterChecks(DataStore, AccountStore),
      ...filterChecks
    }}
    sortChecks={materialSortChecks}
    {...props}
  />;
}
