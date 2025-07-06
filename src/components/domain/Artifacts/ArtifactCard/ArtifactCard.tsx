import { ArtifactSet } from "@/common/models";
import { ArtifactImage } from "@/components/common/Images";
import ArtifactSets from "../ArtifactSets";
import ArtifactDetails from "../ArtifactDetails";
import DomainList from "../../Domain/DomainList";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";

export interface Props extends BaseModelCardProps {
  artifact: ArtifactSet;

  showSetDescriptions?: boolean;
  showCharacterSets?: boolean;
  showDomainList?: boolean;

  showMoreDetails?: boolean;
  displayCraftable?: boolean;
}

export default function ArtifactCard({
  artifact,
  showSetDescriptions, showCharacterSets, showDomainList,
  showMoreDetails, displayCraftable,
  ...props
}: Props) {
  const { name } = artifact;
  
  return (
    <ModelCard
      model="Artifact"
      item={artifact}
      nameTag={showSetDescriptions ? 'h1' : 'h2'}
      {...props}
      renderImage={() => <ArtifactImage set={name} piece="Flower" />}
      renderHeaderContent={showSetDescriptions ? (() => <ArtifactDetails {...{ artifact, displayCraftable }} />) : undefined}
      renderContent={() => (showCharacterSets || showDomainList) && (
        <section className="artifact-content">
          {showCharacterSets && <ArtifactSets artifact={artifact} />}
          {showDomainList && <DomainList domainNames={artifact.domainNames} title={'Found in domains:'} showDetails={showSetDescriptions} showRewards={showMoreDetails} />}
        </section>
      )}
    />
  );
}