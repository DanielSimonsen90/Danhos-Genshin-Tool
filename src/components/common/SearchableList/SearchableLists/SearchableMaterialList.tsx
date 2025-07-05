import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Rarity } from "@/common/types";

import { Props as MaterialCardProps } from "@/components/domain/Material/MaterialCard/MaterialCard";
import MaterialCard from "@/components/domain/Material/MaterialCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "../Props";
import SearchableList from "../SearchableList";
import { useFavoriteStore } from "@/stores/FavoriteStore/FavoriteStoreHooks";
import Star from "../../icons/Star";
import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import { TalentAscensionMaterial, WeaponAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import MobDrop, { ElementalCrystal } from "@/common/models/materials/MobDrop";
import { CrystalChunks } from "@/data/materials/drops/crystals";

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
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Material>());
  const { add, remove, isFavorite } = useFavoriteStore('materials');

  return <SearchableList
    items={items}
    sort={(a, b) => isFavorite(a) === isFavorite(b) ? 0 : isFavorite(a) ? -1 : 1}
    onSearchOrFilterChange={() => setHidden([])}
    renderItem={material => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/materials/${material.name}`), '👁️'),
        item('option', isFavorite(material) ? 'Unfavorite' : 'Favorite', () => isFavorite(material) ? remove(material) : add(material), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, material]), '🙈'),
      ]);

      return hidden.includes(material) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {isFavorite(material) && <Star className="favorite-star" onClick={() => remove(material)} />}
          <MaterialCard material={material} {...cardProps} />
        </div>
      );
    }}
    onSearch={noBaseSearch ? onSearch : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      type: {
        crystal: ElementalCrystal.isElementalCrystal,
        localSpecialty: LocalSpecialty.isLocalSpecialty,
        mobDrop: MobDrop.isMobDrop,
        talentAscension: TalentAscensionMaterial.isTalentAscensionMaterial,
        weaponAscension: WeaponAscensionMaterial.isWeaponAscensionMaterial,
      },
      obtainableThrough: {
        // domains: material => material.length > 0 && material.domainNames[0] !== "BOSS_DROP",
        // boss: material => material.domainNames.length > 0 && material.domainNames.includes("BOSS_DROP"),
        crafting: CraftableMaterial.isCraftableMaterial,
      },
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