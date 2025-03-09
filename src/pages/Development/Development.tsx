import { CharacterImage } from "@/components/common/Images";
import Tierlist from "@/components/common/Tierlist";
import { useCharacterData } from "@/stores";

export default function Development() {
  const { Characters } = useCharacterData();

  return (
    <Tierlist items={Characters} 
      onUnsortedSearch={(search, character) => character.name.toLowerCase().includes(search.toLowerCase())}
    >
      {character => character ? <CharacterImage character={character.name} /> : null}
    </Tierlist>
  );
}