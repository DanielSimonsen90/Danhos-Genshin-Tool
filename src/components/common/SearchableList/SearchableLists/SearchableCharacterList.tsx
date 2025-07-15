import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Character } from "@/common/models";
import { CharacterCard } from "@/components/domain/Character";
import { Props as CharacterCardProps } from "@/components/domain/Character/CharacterCard/CharacterCard";

import { useDataStore, useFavoriteStore } from "@/stores";
import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "../Props";
import SearchableList from "../SearchableList";
import Star from "../../icons/Star";
import { Rarity } from "@/common/types";

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
  const { add: addToFavorite, remove: removeFromFavorite, isFavorite } = useFavoriteStore('characters');
  const DataStore = useDataStore();

  return <SearchableList items={items}
    sort={(a, b) => isFavorite(a) === isFavorite(b) ? 0 : isFavorite(a) ? -1 : 1}
    renderItem={character => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/characters/${character.name}`), '👁️'),
        item('option', isFavorite(character) ? 'Unfavorite' : 'Favorite', () => isFavorite(character) ? removeFromFavorite(character) : addToFavorite(character), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, character]), '🙈'),
      ]);

      return hidden.includes(character) ? null : (
        <div className="context-menu-item-container" onContextMenu={open}>
          {isFavorite(character) && <Star className="favorite-star" onClick={() => removeFromFavorite(character)} />}
          <CharacterCard character={character} {...cardProps} />
        </div>
      );
    }}

    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => navigate(`?query=${search}&filters=${JSON.stringify(filters)}`)}
    onSearch={noBaseSearch ? onSearch : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
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
      onField: character => character.sets[0]?.onField,
      bonusAbility: {
        none: character => character.bonusAbilities.length === 0,

        bondOfLife: character => character.bonusAbilities.includes('Bond of Life'),
        heal: character => character.bonusAbilities.includes('Heal'),
        nightsoulsBlessing: character => character.bonusAbilities.includes('Nightsouls Blessing'),
        offFieldDamage: character => character.bonusAbilities.includes('Off-field Damage'),
        selfHeal: character => character.bonusAbilities.includes('Self-heal'),
        shield: character => character.bonusAbilities.includes('Shield'),
        special: character => character.bonusAbilities.toString().includes(':'),
      },
      hasSignatureWeapon: character => !!DataStore.getSignatureWeaponFor(character), 
      region: {
        mondstadt: character => character.region === "Mondstadt",
        liyue: character => character.region === "Liyue",
        inazuma: character => character.region === "Inazuma",
        sumeru: character => character.region === "Sumeru",
        fontaine: character => character.region === "Fontaine",
        natlan: character => character.region === "Natlan",
        snezhnaya: character => character.region === "Snezhnaya",
        unknown: character => character.region === "Unknown",
      },
      ...filterChecks
    }}
    {...props}
  />;
}