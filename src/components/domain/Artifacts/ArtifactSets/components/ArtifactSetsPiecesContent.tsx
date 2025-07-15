import { CharacterUsingArtifactResult } from "@/stores";
import { effectivenessString } from '@/common/functions/strings';
import SearchableList from "@/components/common/SearchableList";
import { CharacterCard } from "@/components/domain/Character";

type ArtifactSetsPiecesContentProps = {
  results: CharacterUsingArtifactResult[];
  displayPieces?: boolean;
};

export default function ArtifactSetsPiecesContent({ results, displayPieces }: ArtifactSetsPiecesContentProps) {
  return (
    <SearchableList 
      ulClassName="artifact-sets-pieces-content" 
      liClassName="artifact-sets-pieces-content__list-item"
      items={results.sort((a, b) => {
        const setA = a.character.sets.indexOf(a.set);
        const setB = b.character.sets.indexOf(b.set);
        return setA - setB;
      })} 
      onSearch={(search, item) => item.character.name.toLowerCase().includes(search.toLowerCase())}
      renderItem={({ character, set, pieces }) => (
        <CharacterCard character={character} wrapInLink>
          <p>
            <span className="artifact-sets-pieces-content__set-name">
              {set.name}
            </span>
            <span className="artifact-sets-pieces-content__set-effectiveness">
              [{effectivenessString(character.sets.indexOf(set), true)}]
            </span>
          </p>
          {displayPieces && <p className="set-pieces">{pieces}-Piece</p>}
        </CharacterCard>
      )}
    />
  );
};