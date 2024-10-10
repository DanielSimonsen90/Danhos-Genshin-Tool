import { ArtifactSet } from "@/common/models";
import ArtifactDetails from "../ArtifactDetails";
import { ArtifactImage } from "@/components/common/Images";
import { Link } from "react-router-dom";
import ArtifactSets from "../ArtifactSets";
import { classNames } from "@/common/functions/strings";

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
