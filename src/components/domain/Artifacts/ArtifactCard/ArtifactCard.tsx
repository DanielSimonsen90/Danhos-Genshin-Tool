import { Link } from "react-router-dom";
import { ArtifactSet } from "@/common/models";
import { classNames } from "@/common/functions/strings";
import { ArtifactImage, DomainImage } from "@/components/common/Images";
import ArtifactSets from "../ArtifactSets";
import ArtifactDetails from "../ArtifactDetails";

type Props = {
  artifact: ArtifactSet;

  wrapInLink?: boolean;
  showSets?: boolean;
};

export default function ArtifactCard({ artifact, ...props }: Props) {
  const { name } = artifact;
  const { wrapInLink, showSets } = props;
  const Container = GetContainer(wrapInLink, artifact);

  return (
    <Container className="artifact-card">
      <ArtifactImage set={name as any} name="Flower" />
      {wrapInLink ? <h2 className="artifact-card__name">{name}</h2> : <ArtifactDetails artifact={artifact} />}
      {showSets && <ArtifactSets artifact={artifact} />}
      <ul className="domains">
        {artifact.domainNames.map(domainName => (
          <DomainImage key={domainName} domain={domainName} />
        ))}
      </ul>
    </Container>
  );
}

function GetContainer(wrapInLink: boolean, artifact: ArtifactSet) {
  return function (props: any) {
    return wrapInLink
      ? <Link to={`/artifacts/${artifact.name}`} {...props} className={classNames("clickable", props.className)} />
      : <div {...props} />;
  };
}
