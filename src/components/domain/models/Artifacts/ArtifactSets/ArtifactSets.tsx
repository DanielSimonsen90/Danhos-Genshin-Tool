import { useMemo } from "react";

import { ArtifactSet } from "@/common/models";
import TabBar from "@/components/common/TabBar";
import { useDataStore } from "@/stores";

import ArtifactSetsPiecesContent from "./components/ArtifactSetsPiecesContent";

type Props = {
  artifact: ArtifactSet;
};

export default function ArtifactSets({ artifact }: Props) {
  const DataStore = useDataStore();
  const characters = useMemo(() => DataStore.getCharactersUsingArtifact(artifact.name), [DataStore, artifact.name]);
  const fourPieceCharacters = useMemo(() => characters.filter(({ cSet }) => cSet.pieces === 4), [characters]);
  const twoPieceCharacters = useMemo(() => characters.filter(({ cSet }) => cSet.pieces === 2), [characters]);
  const anyWantsThisPiece = fourPieceCharacters.length > 0 && twoPieceCharacters.length > 0;

  return (
    <div className="artifact-sets">
      <h2>Artifact Set Pieces</h2>
      <TabBar defaultTab="four"
        noTabs={<p className="muted">There are no characters that use this set.</p>}
        tabs={tab => [
          anyWantsThisPiece && tab('any', 'Any', <ArtifactSetsPiecesContent results={characters} displayPieces />),
          fourPieceCharacters.length > 0 && tab('four', 'Four-Piece', <ArtifactSetsPiecesContent results={fourPieceCharacters} />),
          twoPieceCharacters.length > 0 && tab('two', 'Two-Piece', <ArtifactSetsPiecesContent results={twoPieceCharacters} />),
        ]}
      />
    </div>
  );
}