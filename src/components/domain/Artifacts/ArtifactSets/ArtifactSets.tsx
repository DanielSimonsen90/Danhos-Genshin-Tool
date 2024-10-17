import { useMemo } from "react";

import { ArtifactSet } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import { SearchService } from "@/services";
import { useDataStore } from "@/stores";

import ArtifactSetsPiecesContent from "./components/ArtifactSetsPiecesContent";

type Props = {
  artifact: ArtifactSet;
}

export default function ArtifactSets({ artifact }: Props) {
  const DataStore = useDataStore();
  const characters = useMemo(() => SearchService.getCharactersUsing(artifact.name, DataStore), [DataStore, artifact.name]);
  const fourPieceCharacters = useMemo(() => characters.filter(({ pieces }) => pieces === 4), [characters]);
  const twoPieceCharacters = useMemo(() => characters.filter(({ pieces }) => pieces === 2), [characters]);
  const anyWantsThisPiece = fourPieceCharacters.length > 0 && twoPieceCharacters.length > 0;

  return (
    <div className="artifact-sets">
      <h2>Artifact Set Pieces</h2>
      <TabBar tabs={[
        ['any', anyWantsThisPiece && 'Any'],
        ['four', fourPieceCharacters.length > 0 && 'Four-Piece'],
        ['two', twoPieceCharacters.length > 0 && 'Two-Piece'],
      ]} noTabs={<p>There are no characters that use this set.</p>} defaultTab="four"
        any={<ArtifactSetsPiecesContent results={characters} displayPieces />}
        four={<ArtifactSetsPiecesContent results={fourPieceCharacters} />}
        two={<ArtifactSetsPiecesContent results={twoPieceCharacters} />}
      />
    </div>
  );
}