import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArtifactSet } from "@/common/models";
import { ArtifactCard } from "@/components/domain/models/Artifacts";
import { Rarity } from "@/common/types";

import { Props as ArtifactCardProps } from "@/components/domain/models/Artifacts/ArtifactCard/ArtifactCard";

import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { useFavorite } from "@/stores";
import { FavoriteStar } from "@/components/common/media/icons/Star";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<ArtifactSet, TFilterKeys>>
  & OptionalProps<ArtifactSet, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<ArtifactCardProps, 'artifact'>>;
  }
);
export default function SearchableArtifactList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<ArtifactSet>());
  const FavoriteStore = useFavorite('artifacts');

  return <SearchableList items={items ?? []}
    placeholder="Search artifacts..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={artifact => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/artifacts/${artifact.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(artifact) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(artifact) ? FavoriteStore.remove(artifact) : FavoriteStore.add(artifact), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, artifact]), '🙈'),
      ]);

      return hidden.includes(artifact) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(artifact) && <FavoriteStar model={artifact} />}
          <ArtifactCard artifact={artifact} {...cardProps} />
        </div>
      );
    }}
    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch ?? (() => true) : (query, item) => (item.includes(query.toLowerCase())) && (onSearch?.(query, item) ?? true)}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      obtainableThrough: {
        domains: artifact => artifact.domainNames.length > 0 && artifact.domainNames[0] !== "BOSS_DROP",
        boss: artifact => artifact.domainNames.length > 0 && artifact.domainNames.includes("BOSS_DROP"),
        crafting: artifact => artifact.isCraftable,
      },
      rarity: {
        legendary: artifact => artifact.rarity === Rarity.Legendary,
        epic: artifact => artifact.rarity === Rarity.Epic,
        rare: artifact => artifact.rarity === Rarity.Rare,
        uncommon: artifact => artifact.rarity === Rarity.Uncommon,
        common: artifact => artifact.rarity === Rarity.Common,
      },
      talentIncrease: {
        hp: artifact => artifact.doesStatIncrease('HP'),
        atk: artifact => artifact.doesStatIncrease('ATK'),
        def: artifact => artifact.doesStatIncrease('DEF'),
        elementalMastery: artifact => artifact.doesStatIncrease('Elemental Mastery'),
        energyRecharge: artifact => artifact.doesStatIncrease('Energy Recharge'),
        physicalDMGBonus: artifact => artifact.doesStatIncrease('Physical DMG'),
        healingBonus: artifact => artifact.doesStatIncrease('Healing Bonus') || artifact.doesStatIncrease('Healing Effectiveness'),
        critRate: artifact => artifact.doesStatIncrease('Crit Rate'),
        critDMG: artifact => artifact.doesStatIncrease('Crit DMG'),

        shieldStrength: artifact => artifact.doesStatIncrease('Shield Strength'),
        
        chargedAttack: artifact => artifact.doesStatIncrease('Charged Attack DMG'),
        normalAndChargedAttack: artifact => artifact.doesStatIncrease('Normal and Charged Attack DMG'),
        
        skill: artifact => artifact.doesStatIncrease('Elemental Skill DMG'),
        burst: artifact => artifact.doesStatIncrease('Burst'),
        elemental: artifact => (
          artifact.doesStatIncrease('Anemo DMG Bonus')
          || artifact.doesStatIncrease('Cryo DMG Bonus')
          || artifact.doesStatIncrease('Dendro DMG Bonus')
          || artifact.doesStatIncrease('Electro DMG Bonus')
          || artifact.doesStatIncrease('Geo DMG Bonus')
          || artifact.doesStatIncrease('Hydro DMG Bonus')
          || artifact.doesStatIncrease('Pyro DMG Bonus')
        ),
      },

      ...filterChecks
    }}
    {...props}
  />;
}
