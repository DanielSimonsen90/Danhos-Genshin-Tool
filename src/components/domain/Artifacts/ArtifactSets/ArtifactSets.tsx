import { useMemo } from "react";

import { ArtifactSet } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import { SearchService } from "@/services";
import { useDataStore } from "@/stores";

import ArtifactSetsPiecesContent from "./components/ArtifactSetsPiecesContent";

type Props = {
  artifact: ArtifactSet;
};

export default function ArtifactSets({ artifact }: Props) {
  const DataStore = useDataStore();
  const characters = useMemo(() => SearchService.getCharactersUsing(artifact.name, DataStore), [DataStore, artifact.name]);
  const fourPieceCharacters = useMemo(() => characters.filter(({ pieces }) => pieces === 4), [characters]);
  const twoPieceCharacters = useMemo(() => characters.filter(({ pieces }) => pieces === 2), [characters]);
  const anyWantsThisPiece = fourPieceCharacters.length > 0 && twoPieceCharacters.length > 0;

  return (
    <div className="artifact-sets">
      <h2>Artifact Set Pieces</h2>
      <TabBar defaultTab="four"
        noTabs={<p className="muted">There are no characters that use this set.</p>}
        tabs={create => [
          create('any', anyWantsThisPiece && 'Any', anyWantsThisPiece && <ArtifactSetsPiecesContent results={characters} displayPieces />),
          create('four', fourPieceCharacters.length > 0 && 'Four-Piece', fourPieceCharacters.length > 0 && <ArtifactSetsPiecesContent results={fourPieceCharacters} />),
          create('two', twoPieceCharacters.length > 0 && 'Two-Piece', twoPieceCharacters.length > 0 && <ArtifactSetsPiecesContent results={twoPieceCharacters} />),
        ]}
      />
    </div>
  );
}