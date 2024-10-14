import { Character } from "@/common/models";
import SearchableList from "../SearchableList";
import { CharacterCard } from "@/components/domain/Character";
import { OptionalProps, UncrontrolledProps } from "../Props";
import { Props as CharacterCardProps } from "@/components/domain/Character/CharacterCard/CharacterCard";

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
  return <SearchableList items={items} renderItem={character => <CharacterCard character={character} {...cardProps} />}
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
      needs: {
        hp: character => character.needsHP(),
        atk: character => character.needsATK(),
        def: character => character.needsDEF(),
        energyRecharge: character => character.needsER(),
        elementalMastery: character => character.needsEM(),
      },
      bonusAbility: {
        // Bonus Ability
        none: character => character.bonusAbilities.length === 0,
        
        bondOfLife: character => character.bonusAbilities.includes('Bond of Life'),
        buffAtk: character => character.bonusAbilities.includes('Buff ATK'),
        heal: character => character.bonusAbilities.includes('Heal'),
        nightsoulsBlessing: character => character.bonusAbilities.includes('Nightsouls Blessing'),
        offFieldDamage: character => character.bonusAbilities.includes('Off-field Damage'),
        selfHeal: character => character.bonusAbilities.includes('Self-heal'),
        shield: character => character.bonusAbilities.includes('Shield'),
      },
      ...filterChecks
    }}
    {...props}
  />;
}