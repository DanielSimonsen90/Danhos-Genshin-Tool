import { SearchableCharacterList } from "@/components/common/SearchableList";
import { useCharacterData } from "@/stores";

export default function Characters() {
  const characters = useCharacterData().Characters;
  return <SearchableCharacterList className="characters-list" items={characters} cardProps={{ wrapInLink: true }} />;
}