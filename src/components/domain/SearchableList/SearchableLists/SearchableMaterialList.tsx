import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Rarity } from "@/common/types";

import { Props as MaterialCardProps } from "@/components/domain/models/Material/MaterialCard/MaterialCard";
import MaterialCard from "@/components/domain/models/Material/MaterialCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { useFavorite, useDataStore, useRegionStore } from "@/stores";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import AscensionMaterial, { TalentAscensionMaterial, WeaponAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import MobDrop, { ElementalCrystal } from "@/common/models/materials/MobDrop";
import { EasyMob, EliteMob, WeeklyBoss, WorldBoss } from "@/common/models";

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
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Material>());
  const FavoriteStore = useFavorite('materials');
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();

  return <SearchableList items={items ?? []}
    placeholder="Search materials..."
    key={RegionStore.currentRegion}
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={material => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/materials/${material.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(material) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(material) ? FavoriteStore.remove(material) : FavoriteStore.add(material), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, material]), '🙈'),
      ]);      
      
      return hidden.includes(material) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(material) && <FavoriteStar model={material} />}
          <MaterialCard material={material} {...cardProps} />
        </div>
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
      type: {
        crystal: ElementalCrystal.isElementalCrystal,
        localSpecialty: LocalSpecialty.isLocalSpecialty,
        mobDrop: MobDrop.isMobDrop,
        talentAscension: TalentAscensionMaterial.isTalentAscensionMaterial,
        weaponAscension: WeaponAscensionMaterial.isWeaponAscensionMaterial,
      },
      obtainableThrough: {
        domains: material => DataStore.getDomainsFromMaterial(material).length > 0,
        easyMobs: material => material instanceof MobDrop && DataStore.getMobsDroppingMaterial(material.name).filter(EasyMob.isEasyMob).length > 0,
        eliteMobs: material => material instanceof MobDrop && DataStore.getMobsDroppingMaterial(material.name).filter(EliteMob.isEliteMob).length > 0,
        worldBosses: material => material instanceof MobDrop && DataStore.getBossesFromMaterial(material).filter(WorldBoss.isWorldBoss).length > 0,
        weeklyBosses: material => material instanceof MobDrop && DataStore.getBossesFromMaterial(material).filter(WeeklyBoss.isWeeklyBoss).length > 0,
        crafting: CraftableMaterial.isCraftableMaterial,
      },
      obtainableToday: material => AscensionMaterial.isAscensionMaterial(material) ? material.isObtainableToday(RegionStore) : undefined,
      rarity: {
        legendary: material => material.rarity === Rarity.Legendary,
        epic: material => material.rarity === Rarity.Epic,
        rare: material => material.rarity === Rarity.Rare,
        uncommon: material => material.rarity === Rarity.Uncommon,
        common: material => material.rarity === Rarity.Common,
      },
      region: {
        mondstadt: material => material.region === 'Mondstadt',
        liyue: material => material.region === 'Liyue',
        inazuma: material => material.region === 'Inazuma',
        sumeru: material => material.region === 'Sumeru',
        fontaine: material => material.region === 'Fontaine',
        natlan: material => material.region === 'Natlan',
        snezhnaya: material => material.region === 'Snezhnaya',
      },
      ...filterChecks
    }}
    {...props}
  />;
}
