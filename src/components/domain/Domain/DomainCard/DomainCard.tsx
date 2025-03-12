import { Domain } from "@/common/models/domains/Domain";
import { classNames } from "@/common/functions/strings";
import { DomainImage } from "@/components/common/Images";
import { ResinIcon } from "@/components/common/icons";
import { useDomainData } from "@/stores";

import { GetContainer } from "../../Item/functions";
import { ArtifactCard, ArtifactTabBar } from "../../Artifacts";
import { Link } from "react-router-dom";

export type Props = {
  domain: Domain<any>;
  wrapInLink?: boolean;

  showDetails?: boolean;
  showRewards?: boolean;
  showCharactersBenefitFromRewards?: boolean;
  showNavButton?: boolean;
};

export default function DomainCard({ domain, ...props }: Props) {
  const DomainData = useDomainData();
  if (!domain) return null;

  const { name, description, resinCost, region } = domain;
  const { wrapInLink, showDetails, showRewards, showCharactersBenefitFromRewards, showNavButton } = props;

  const rewards = DomainData.getArtifactsFromDomain(name);
  const Container = GetContainer(wrapInLink, domain, 'data/domains');

  return (
    <Container className={classNames('domain-card', showDetails && 'domain-card--show-more')}>
      <section className="main">
        <div className={classNames('domain-details', showDetails && 'domain-details--show-more')}>
          <header>
            <h2 className="domain-card__name" title={name}>{name}</h2>
            {showDetails && <ResinIcon cost={resinCost} />}
          </header>
          {showDetails && <p className="domain-details__description">{description}</p>}
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
      <aside>
        <DomainImage domain={name} />
        <p className="domain-details__region" data-region={region}>
          {wrapInLink 
            ? <span>{region}</span> 
            : (<><b>{name}</b> is located in <span>{region}</span></>)}
        </p>
        {showNavButton && (
          <Link to={`/data/domains/${name}`} className="domain-card__nav-button">
            <button style={{ width: '100%' }}>
              View Domain
            </button>
          </Link>
        )}
      </aside>
      {showCharactersBenefitFromRewards && <ArtifactTabBar artifacts={rewards} />}
    </Container>
  );
}