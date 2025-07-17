import { SearchableCharacterList } from "@/components/domain/SearchableList";
import { ItemHeader } from "@/components/domain/Item";
import { useCharacterData } from "@/stores";

export default function Characters() {
  const characters = useCharacterData().Characters;
  
  return (
    <>
      <ItemHeader item={characters} itemName="Characters" showItemName />
      <SearchableCharacterList className="characters-list" items={characters} placeholder="Search for a character..." cardProps={{
        wrapInLink: true,
      }} />
    </>
  );
}