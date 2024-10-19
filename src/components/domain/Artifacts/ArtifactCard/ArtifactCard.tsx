import { ArtifactSet } from "@/common/models";
import { ArtifactImage } from "@/components/common/Images";
import ArtifactSets from "../ArtifactSets";
import ArtifactDetails from "../ArtifactDetails";
import DomainList from "../../Domain/DomainList";
import { GetContainer } from "../../Item/functions";
import { createElement } from "react";

export type Props = {
  artifact: ArtifactSet;
  wrapInLink?: boolean;
  
  showDetails?: boolean;
  showMoreDetails?: boolean;
  displayCraftable?: boolean;

  tagName?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
};

export default function ArtifactCard({ artifact, ...props }: Props) {
  const { name } = artifact;
  const { wrapInLink, showDetails, showMoreDetails, displayCraftable, tagName } = props;
  const Container = GetContainer(wrapInLink, artifact, 'artifacts');

  return (
    <Container className="artifact-card">
      <header>
        <ArtifactImage set={name} name="Flower" />
        {showDetails 
          ? <ArtifactDetails artifact={artifact} tagName={tagName} displayCraftable={displayCraftable} /> 
          : createElement(tagName ?? 'h2', { className: 'artifact-card__name', title: name }, name)}
      </header>
      {showMoreDetails && (<>
        <ArtifactSets artifact={artifact} />
        <DomainList domainNames={artifact.domainNames} title={'Found in domains:'} {...{ showDetails, showRewards: showMoreDetails }} />
      </>)
      }
    </Container >
  );
}