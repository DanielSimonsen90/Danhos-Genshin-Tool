import { Artifact, ArtifactSet } from "@/common/models";

type Props = {
  artifact: ArtifactSet;
}

export default function ArtifactDetails({ artifact }: Props) {
  const { name, twoPieceSetDescription, fourPieceSetDescription } = artifact;

  return (
    <section className="artifact-details">
      <h1 className="artifact-details__name">{name}</h1>
      <p className="artifact-details__2-piece">{twoPieceSetDescription}</p>
      <p className="artifact-details__4-piece">{fourPieceSetDescription}</p>
    </section>
  );
}