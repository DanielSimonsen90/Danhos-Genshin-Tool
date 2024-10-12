import { CharacterCard } from "@/components/domain/Character";
import ItemsPage from "../_Layout/ItemsPage";

export default function Characters() {
  return <ItemsPage itemsKey="Characters" 
    Card={({ item }) => <CharacterCard character={item} wrapInLink />} 
    filterChecks={{
      anemo: character => character.element === "Anemo",
      cryo: character => character.element === "Cryo",
      dendro: character => character.element === "Dendro",
      electro: character => character.element === "Electro",
      geo: character => character.element === "Geo",
      hydro: character => character.element === "Hydro",
      pyro: character => character.element === "Pyro",

      sword: character => character.weapon === "Sword",
      claymore: character => character.weapon === "Claymore",
      polearm: character => character.weapon === "Polearm",
      bow: character => character.weapon === "Bow",
      catalyst: character => character.weapon === "Catalyst",

      hp: character => character.needsHP(),
      atk: character => character.needsATK(),
      def: character => character.needsDEF(),
      er: character => character.needsER(),
      em: character => character.needsEM(),
    }}
  />;
}