import { CharacterImage } from "@/components/common/Images";
import { CharacterUsingArtifactResult } from "@/services";
import { Link } from "react-router-dom";
import { effectivenessString } from '@/common/functions/strings';
import RarityList from "@/components/common/icons/Rarity";
import SearchableList, { SearchableCharacterList } from "@/components/common/SearchableList";

type ArtifactSetsPiecesContentProps = {
  results: CharacterUsingArtifactResult[];
  displayPieces?: boolean;
};

export default function ArtifactSetsPiecesContent({ results, displayPieces }: ArtifactSetsPiecesContentProps) {
  return (
    <SearchableList ulClassName="artifact-sets-pieces-content" liClassName="artifact-sets-pieces-content__list-item"
      items={results.sort((a, b) => {
        const setA = a.character.sets.indexOf(a.set);
        const setB = b.character.sets.indexOf(b.set);
        return setA - setB;
      })} onSearch={(search, item) => item.character.name.toLowerCase().includes(search.toLowerCase())}
      renderItem={({ character, set, pieces }) => (
        <Link className="clickable" to={`/data/characters/${character.name}`}>
          <CharacterImage character={character.name} />
          <div className="artifact-sets-pieces-content__character-info">
            <header>
              <h3>{character.name}</h3>
              <RarityList rarity={character.rarity} />
            </header>
            <p>
              <span className="artifact-sets-pieces-content__set-name">
                {set.name}
              </span>
              <span className="artifact-sets-pieces-content__set-effectiveness">
                [{effectivenessString(character.sets.indexOf(set), true)}]
              </span>
            </p>
            {displayPieces && <p className="set-pieces">{pieces}-Piece</p>}
          </div>
        </Link>
      )}
    />
  );
}