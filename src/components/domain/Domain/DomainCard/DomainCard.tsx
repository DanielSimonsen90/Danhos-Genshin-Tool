import { DomainImage } from "@/components/common/Images";
import { Domain } from "@/common/models/Domain";
import { GetContainer } from "../../Item/functions";
import { ResinIcon } from "@/components/common/icons";
import { useDomainData } from "@/stores";
import { ArtifactCard } from "../../Artifacts";
import { classNames } from "@/common/functions/strings";

type Props = {
  domain: Domain<any>;
  wrapInLink?: boolean;
  showDetails?: boolean;
  showRewards?: boolean;
};

export default function DomainCard({ domain, ...props }: Props) {
  const DomainData = useDomainData();
  if (!domain) return null;

  const { name, description, resinCost } = domain;
  const { wrapInLink, showDetails, showRewards } = props;

  const rewards = DomainData.getArtifactsFromDomain(name);
  const Container = GetContainer(wrapInLink, domain, 'domains');

  return (
    <Container className={classNames('domain-card', showDetails && 'domain-card--show-more')}>
      <section className="main">
        <div className={classNames('domain-details', showDetails && 'domain-details--show-more')}>
          <header>
            <h2 className="domain-card__name">{name}</h2>
            {showDetails && <ResinIcon cost={resinCost} />}
          </header>
          {showDetails && <p>{description}</p>}
        </div>
        {showRewards && (
          <div className="rewards-list-container">
            <h3 className="rewards-list-container__title">Rewards</h3>
            <ul className="domain-rewards">
              {rewards?.map(artifact => (
                <ArtifactCard key={artifact.name} artifact={artifact} tagName='h4' showDetails wrapInLink />
              ))}
            </ul>
          </div>
        )}
      </section>
      <DomainImage domain={name} />
    </Container>
  );
}