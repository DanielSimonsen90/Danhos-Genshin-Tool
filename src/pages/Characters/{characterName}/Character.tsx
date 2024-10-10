import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { CharacterCard } from "@/components/domain/Character";
import { useDataStore } from "@/stores";
import { ItemHeader } from "@/components/domain/Item";

export default function Character() {
  const { characterName } = useParams();
  const DataStore = useDataStore();
  const character = useMemo(() => DataStore.findCharacterByName(characterName), [DataStore, characterName]);

  if (!character) {
    return (
      <main>
        <h1>Unable to find {characterName}.</h1>
        <Link to="/characters">Back to Characters</Link>
      </main>
    );
  }

  return (
    <>
      <ItemHeader item={character} itemName="character" />
      <main>
        <CharacterCard character={character} showSets />
      </main>
    </>
  );
}