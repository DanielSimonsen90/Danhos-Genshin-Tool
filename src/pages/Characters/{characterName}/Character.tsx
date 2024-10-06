import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Chevron from "@/components/common/icons/Chevron";
import { CharacterCard } from "@/components/domain/Character";
import { useDataStore } from "@/stores";

export default function Character() {
  const { characterName } = useParams();
  const navigate = useNavigate();
  const DataStore = useDataStore();
  const character = useMemo(() => DataStore.findCharacterByName(characterName), [DataStore, characterName]);

  if (!character) {
    return (
      <main>
        <h1>Unable to find {characterName}.</h1>
        <Link to="/characters">Back to Characters</Link>
      </main>
    )
  }

  return (
    <>
      <header className="character-page-header">
        <a href="#" onClick={() => navigate(-1)}>
          <Chevron point="left" />
          <span>Back</span>
        </a>
        <h1>{character.name}</h1>
        <button onClick={() => console.log(character)}>Log Character</button>
      </header>
      <main>
        <CharacterCard character={character} showSets />
      </main>
    </>
  );
}