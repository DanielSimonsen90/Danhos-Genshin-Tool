import { CharacterUsingArtifactResult } from "@/stores";
import { effectivenessString } from '@/common/functions/strings';
import SearchableList from "@/components/domain/SearchableList";
import { CharacterCard } from "@/components/domain/models/Character";

type ArtifactSetsPiecesContentProps = {
  results: CharacterUsingArtifactResult[];
  displayPieces?: boolean;
};

export default function ArtifactSetsPiecesContent({ results, displayPieces }: ArtifactSetsPiecesContentProps) {
  return (
    <SearchableList 
      ulClassName="artifact-sets-pieces-content" 
      liClassName="artifact-sets-pieces-content__list-item"
      items={results.sort((a, b) => b.cSet.effectiveness - a.cSet.effectiveness)} 
      onSearch={(search, item) => item.character.name.toLowerCase().includes(search.toLowerCase())}
      renderItem={({ character, cSet }) => (
        <CharacterCard character={character} wrapInLink>
          <p><b>{cSet.effectiveness}%</b> of players use this plan.</p>
          {displayPieces && <p className="set-pieces">{cSet.pieces}-Piece</p>}
        </CharacterCard>
      )}
    />
  );
};