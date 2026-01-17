import { ArtifactSet } from "@/common/models";
import Region from "@/components/domain/Region";
import { useDataStore } from "@/stores";
import { useMemo } from "react";

type Props = {
  artifact: ArtifactSet;
  showDescriptions?: boolean;
  showCraftable?: boolean;
  showRegion?: boolean;
};

export default function ArtifactDescriptions({ 
  artifact, 
  showDescriptions, showCraftable, showRegion 
}: Props) {
  const { name, twoPieceSetDescription, fourPieceSetDescription, isCraftable } = artifact;
  const getRegionsFromArtifact = useDataStore(store => store.getRegionsFromArtifact);
  const regions = useMemo(() => getRegionsFromArtifact(name), [artifact, getRegionsFromArtifact]);

  return (
    <section className="artifact-descriptions">
      {showDescriptions && (
        <>
          <p className="artifact-descriptions__2-piece">{twoPieceSetDescription}</p>
          <p className="artifact-descriptions__4-piece">{fourPieceSetDescription}</p>
        </>
      )}
      {isCraftable && showCraftable && <p className="artifact-descriptions__craftable">{name} is craftable.</p>}
      {showRegion && regions && <Region region={regions} />}
    </section>
  );
}