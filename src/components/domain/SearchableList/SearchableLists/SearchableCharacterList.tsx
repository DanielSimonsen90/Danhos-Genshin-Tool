import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Character } from "@/common/models";
import { CharacterCard } from "@/components/domain/models/Character";
import { Props as CharacterCardProps } from "@/components/domain/models/Character/CharacterCard/CharacterCard";
import { Rarity } from "@/common/types";

import { useDataStore, useFavorite } from "@/stores";
import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { FavoriteStar } from "@/components/common/media/icons/Star";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Character, TFilterKeys>>
  & OptionalProps<Character, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<CharacterCardProps, 'character'>>;
  }
);
export default function SearchableCharacterList<TFilterKeys extends string>({
  items, filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Character>());
  const FavoriteStore = useFavorite('characters');
  const DataStore = useDataStore();
  
  const [internalCardProps, setInteralCardProps] = useState<Pick<Props<TFilterKeys>, 'cardProps'>['cardProps']>({});

  return <SearchableList items={items ?? []}
    placeholder="Search characters..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={character => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/characters/${character.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(character) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(character) ? FavoriteStore.remove(character) : FavoriteStore.add(character), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, character]), '🙈'),
      ]);

      return hidden.includes(character) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {FavoriteStore.isFavorite(character) && <FavoriteStar model={character} />}
          <CharacterCard character={character} {...internalCardProps} {...cardProps} />
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
    onFilterChange={filter => {
      const updatedInternalFilter = Object.entries(filter).reduce((acc, [key, value]) => {
        switch (key) {
          case 'passiveTalents': return { ...acc, showPassiveTalent: Object.keys(value ?? {}).length > 0 };
          case 'hasSignatureWeapon': return { ...acc, showSignatureWeapon: value as boolean };
          default: return acc;
        }
      }, {} as Partial<CharacterCardProps>);

      setInteralCardProps(props => ({ ...props, ...updatedInternalFilter }));
    }}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      element: {
        anemo: character => character.element === "Anemo",
        cryo: character => character.element === "Cryo",
        dendro: character => character.element === "Dendro",
        electro: character => character.element === "Electro",
        geo: character => character.element === "Geo",
        hydro: character => character.element === "Hydro",
        pyro: character => character.element === "Pyro",
      },
      weapon: {
        sword: character => character.weapon === "Sword",
        claymore: character => character.weapon === "Claymore",
        polearm: character => character.weapon === "Polearm",
        bow: character => character.weapon === "Bow",
        catalyst: character => character.weapon === "Catalyst",
      },
      rarity: {
        '5 star': character => character.rarity === Rarity.Legendary,
        '4 star': character => character.rarity === Rarity.Epic,
        // '3 star': character => character.rarity === Rarity.Rare,
        // '2 star': character => character.rarity === Rarity.Uncommon,
        // '1 star': character => character.rarity === Rarity.Common,
      },
      needs: {
        hp: character => character.needsHP(),
        atk: character => character.needsATK(),
        def: character => character.needsDEF(),
        energyRecharge: character => character.needsER(),
        elementalMastery: character => character.needsEM(),
      },
      onField: character => character.playstyle?.onField,
      bonusAbility: {
        none: character => character.bonusAbilities.length === 0,

        bondOfLife: character => character.bonusAbilities.includes('Bond of Life'),
        buffAttack: character => character.bonusAbilities.some(ability => ability.startsWith('Buff ATK: ')),
        buffAttackSpeed: character => character.bonusAbilities.some(ability => ability.startsWith('Buff ATK Speed: ')),
        critIncrease: character => character.bonusAbilities.some(ability => ability.startsWith('CRIT Increase: ')),
        elementalBased: character => character.bonusAbilities.some(ability => ability.startsWith('Elemental based: ')),
        elementalInfusion: character => character.bonusAbilities.some(ability => ability.startsWith('Elemental Infusion: ')),
        grouping: character => character.bonusAbilities.includes('Grouping'),
        heal: character => character.bonusAbilities.includes('Heal'),
        nightsoulsBlessing: character => character.bonusAbilities.includes('Nightsouls Blessing'),
        offFieldDamage: character => character.bonusAbilities.includes('Off-field Damage'),
        selfHeal: character => character.bonusAbilities.includes('Self-heal'),
        serpentSubtlety: character => character.bonusAbilities.includes(`Serpent's Subtlety`),
        shield: character => character.bonusAbilities.includes('Shield'),
      },
      passiveTalents: {
        doubleProduct: character => character.passiveTalent?.toLowerCase().includes('double product'),
        expeditionMoreRewards: character => character.passiveTalent?.toLowerCase().includes('more rewards'),
        expeditionTimeReduction: character => character.passiveTalent?.toLowerCase().includes('time consumption reduction'),
        increaseSpeed: character => (
          character.passiveTalent?.toLowerCase().includes('increase')
          && character.passiveTalent?.toLowerCase().includes('speed')
        ),
        localSpecialty: character => character.passiveTalent?.toLowerCase().includes('local specialties'),
        moraCostReductionOnWeapon: character => (
          character.passiveTalent?.toLowerCase().includes('mora cost reduction')
          && character.passiveTalent?.toLowerCase().includes('weapon')
        ),
        refundMaterials: character => character.passiveTalent?.toLowerCase().includes('refund materials'),
        refundOre: character => character.passiveTalent?.toLowerCase().includes('refunding ore'),
        transportationConsumptionReduction: character => (
          character.passiveTalent?.toLowerCase().includes('consumption reduction')
          && !character.passiveTalent?.toLowerCase().includes('time')
        ),
      },
      hasSignatureWeapon: character => !!DataStore.getSignatureWeaponFor(character),
      region: {
        mondstadt: character => character.region === "Mondstadt",
        liyue: character => character.region === "Liyue",
        inazuma: character => character.region === "Inazuma",
        sumeru: character => character.region === "Sumeru",
        fontaine: character => character.region === "Fontaine",
        natlan: character => character.region === "Natlan",
        nodKrai: character => character.region === "Nod-Krai",
        snezhnaya: character => character.region === "Snezhnaya",
        unknown: character => character.region === "Unknown",
      },
      ...filterChecks
    }}
    {...props}
  />;
}