import { Domain } from "@/common/models/domains/Domain";
import { classNames } from "@/common/functions/strings";
import { DomainImage } from "@/components/common/Images";
import { ResinIcon } from "@/components/common/icons";
import { useDomainData } from "@/stores";

import { ArtifactCard, ArtifactTabBar } from "../../Artifacts";
import { Link } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";

export interface Props extends BaseModelCardProps {
  domain: Domain<any>;
  showResin?: boolean;
  showDescription?: boolean;
  showRewards?: boolean;
  showCharactersBenefitFromRewards?: boolean;
  showNavButton?: boolean;
}

export default function DomainCard({ 
  domain, 
  showResin, showDescription, showRewards, 
  showCharactersBenefitFromRewards, showNavButton, 
  ...props 
}: Props) {
  const DomainData = useDomainData();
  if (!domain) return null;

  const { name, description, resinCost, region } = domain;
  const rewards = DomainData.getArtifactsFromDomain(name);

  return (
    <ModelCard
      model="Domain"
      item={domain}
      className={classNames('domain-card', props.className)}

      renderImage={() => <DomainImage domain={name} />}
      renderHeaderContent={() => (<>
        {showResin && <ResinIcon cost={resinCost} />}
        {showDescription && <p className="domain-card__description">{description}</p>}
        <p className="domain-card__region" data-region={region}>{region}</p>
        {showNavButton && (
          <Link to={`/${ROUTES.data_domains}/${name}`} className="domain-card__nav-button">
            <button style={{ width: '100%' }}>
              View Domain
            </button>
          </Link>
        )}
      </>)}

      renderContent={() => (
        <section>
          {showRewards && rewards && (
            <div className="rewards-list-container">
              <h3 className="rewards-list-container__title">Rewards</h3>
              <ul className="domain-rewards">
                {rewards.map(artifact => <ArtifactCard key={artifact.name} artifact={artifact} nameTag='h4' 
                  showSetDescriptions 
                  showRarity 
                  wrapInLink 
                />)}
              </ul>
            </div>
          )}
          {showCharactersBenefitFromRewards && (
            <div className="characters-benefit-from-rewards">
              <h3 className="characters-benefit-from-rewards__title">Characters benefit from rewards</h3>
              <ArtifactTabBar artifacts={rewards} />
            </div>
          )}
        </section>
      )}
    />
  );
}