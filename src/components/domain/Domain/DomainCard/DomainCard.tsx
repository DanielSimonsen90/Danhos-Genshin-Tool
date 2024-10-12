import { DomainImage } from "@/components/common/Images";
import { Domain } from "@/common/models/Domain";
import { GetContainer } from "../../Item/functions";
import { ResinIcon } from "@/components/common/icons";
import { useDomainData } from "@/stores";
import { ArtifactCard } from "../../Artifacts";

type Props = {
  domain: Domain<any>;
  wrapInLink?: boolean;
  // showDetails?: boolean;
};

export default function DomainCard({ domain, ...props }: Props) {
  const DomainData = useDomainData();
  if (!domain) return null;

  const { name, description, resinCost } = domain;
  const { wrapInLink } = props;

  const Container = GetContainer(wrapInLink, domain, 'domains');
  const rewards = DomainData.getArtifactsFromDomain(name);

  return (
    <Container className="domain-card">
      <section className="main">
        <div className="domain-details">
          <header>
            <h2 className="domain-card__name">{name}</h2>
            <ResinIcon cost={resinCost} />
          </header>
          <p>{description}</p>
        </div>
        <div className="rewards-list-container">
          <h3 className="rewards-list-container__title">Rewards</h3>
          <ul className="domain-rewards">
            {rewards?.map(artifact => (
              <ArtifactCard key={artifact.name} artifact={artifact} tagName='h4' showDetails wrapInLink />
            ))}
          </ul>
        </div>
      </section>
      <DomainImage domain={name} />
    </Container>
  );
}