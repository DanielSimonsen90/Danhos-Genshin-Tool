import { useCharacterData } from "@/stores";
import { CharacterCard } from "@/components/domain/Character";
import SearchableList from "@/components/common/SearchableList";

export default function Characters() {
  const { Characters } = useCharacterData();

  return <SearchableList
    items={Characters} renderItem={character => <CharacterCard character={character} wrapInLink />}
    onSearch={(query, character) => character.name.toLowerCase().includes(query.toLowerCase())}
    className="characters-list" liClassName="characters-list-item"
  />;
}