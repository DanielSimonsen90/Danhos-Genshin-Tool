import { ArtifactSet } from "@/common/models";

type Props = {
  artifact: ArtifactSet;
  displayCraftable?: boolean;
};

export default function ArtifactDescriptions({ artifact, displayCraftable }: Props) {
  const { name, twoPieceSetDescription, fourPieceSetDescription, isCraftable } = artifact;

  return (
    <section className="artifact-descriptions">
      <p className="artifact-descriptions__2-piece">{twoPieceSetDescription}</p>
      <p className="artifact-descriptions__4-piece">{fourPieceSetDescription}</p>
      {isCraftable && displayCraftable && <p className="artifact-descriptions__craftable">{name} is craftable.</p>}
    </section>
  );
}