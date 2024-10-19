import { ArtifactSet } from "@/common/models";
import RarityList from "@/components/common/icons/Rarity";
import { createElement } from "react";

type Props = {
  artifact: ArtifactSet;
  displayCraftable?: boolean;

  tagName?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
};

export default function ArtifactDetails({ artifact, tagName, displayCraftable }: Props) {
  const { name, rarity, twoPieceSetDescription, fourPieceSetDescription, isCraftable } = artifact;

  return (
    <section className="artifact-details">
      <header>
        {createElement(tagName ?? 'h1', { className: 'artifact-details__name', title: name }, name)}
        <RarityList rarity={rarity} />
      </header>
      <p className="artifact-details__2-piece">{twoPieceSetDescription}</p>
      <p className="artifact-details__4-piece">{fourPieceSetDescription}</p>
      {isCraftable && displayCraftable && <p className="artifact-details__craftable">{name} is craftable.</p>}
    </section>
  );
}