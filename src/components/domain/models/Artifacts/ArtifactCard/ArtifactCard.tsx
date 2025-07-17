import { ArtifactSet } from "@/common/models";
import { ArtifactImage } from "@/components/common/media/Images";
import ArtifactSets from "../ArtifactSets";
import ArtifactDetails from "../ArtifactDetails";
import DomainList from "../../Domain/DomainList";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { plural } from "@/common/functions/strings";

export interface Props extends BaseModelCardProps {
  artifact: ArtifactSet;

  showSetDescriptions?: boolean;
  showCharacterSets?: boolean;
  showDomainList?: boolean;

  showDomainRewards?: boolean;
  displayCraftable?: boolean;
}

export default function ArtifactCard({
  artifact,
  showSetDescriptions, showCharacterSets, showDomainList,
  showDomainRewards, displayCraftable,
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
          {showDomainList && <DomainList artifactSetName={name} domainNames={artifact.domainNames} title={plural(artifact.domainNames.length, 'Found in domain', 'Found in domains')} />}
        </section>
      )}
    />
  );
}