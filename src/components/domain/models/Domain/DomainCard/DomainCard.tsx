import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/common/constants/routes";
import { Rarity } from "@/common/types";
import { ArtifactSet } from "@/common/models";
import { Domain } from "@/common/models/domains/Domain";
import { classNames } from "@/common/functions/strings";

import { ArtifactImage, DomainImage, MaterialImage } from "@/components/common/media/Images";
import { ResinIcon } from "@/components/common/media/icons";
import { useDataStore } from "@/stores";

import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { ArtifactCard } from "../../Artifacts";

import { MaterialCard } from "../../Material";
import DomainRewardsTabBar from "../DomainRewardsTabBar";
import { Region } from "@/components/domain";

export interface Props extends BaseModelCardProps {
  domain: Domain<any>;
  showResin?: boolean;
  showDescription?: boolean;
  showMinRewards?: boolean;
  showDetailedRewards?: boolean;
  showCharactersBenefitFromRewards?: boolean;
  showNavButton?: boolean;
}

export default function DomainCard({
  domain,
  showResin, showDescription, showMinRewards, showDetailedRewards,
  showCharactersBenefitFromRewards, showNavButton,
  ...props
}: Props) {
  const DataStore = useDataStore();
  if (!domain) return null;

  const { name, description, resinCost, region } = domain;
  const rewards = domain.getRewards(DataStore);
  const type = domain.getDomainType();
  const minRewards = useMemo(() => {
    if (domain.isBlessing()) return domain.getRewards(DataStore).filter(artifact => artifact.rarity === Rarity.Legendary);
    if (domain.isMastery()) return domain.getRewards(DataStore).filter(talent => talent.isObtainableToday());
    return [];
  }, [rewards]);

  return (
    <ModelCard
      model="Domain"
      item={domain}
      {...props}
      className={classNames('domain-card', props.className)}

      renderImage={() => <DomainImage domain={name} />}
      renderHeaderContent={() => (<>
        <div className="domain-type">
          <p>{type}</p>
          {showMinRewards && minRewards.length > 0 && (
            <ul className="min-rewards">
              {minRewards.map((reward, index) => (
                <li key={index} className="min-reward">
                  {reward instanceof ArtifactSet
                    ? <ArtifactImage set={reward.name} piece="Flower" />
                    : <MaterialImage material={reward.name} />}
                </li>
              ))}
            </ul>
          )}
        </div>
        {showResin && <ResinIcon cost={resinCost} />}
        {showDescription && <p className="domain-card__description">{description}</p>}
        <Region region={region} className="domain-card__region" />
        {showNavButton && (
          <Link to={`/${ROUTES.data_domains}/${name}`} className="domain-card__nav-button">
            <button style={{ width: '100%' }}>
              View Domain
            </button>
          </Link>
        )}
      </>)}

      renderContent={() => (
        (showDetailedRewards || showCharactersBenefitFromRewards) ? (
          <section>
            {showDetailedRewards && rewards && (
              <div className="rewards-list-container">
                <h3 className="rewards-list-container__title">Rewards</h3>
                <ul className="domain-rewards">
                  {rewards.map(reward => (
                    type === 'Blessing' ? <ArtifactCard key={reward.name} artifact={reward} nameTag='h4'
                      showSetDescriptions
                      showRarity
                      wrapInLink
                    /> 
                    : <MaterialCard key={reward.name} material={reward} nameTag='h4'
                      wrapInLink
                    />
                  ))}
                </ul>
              </div>
            )}
            {showCharactersBenefitFromRewards && (
              <div className="characters-benefit-from-rewards">
                <h3 className="characters-benefit-from-rewards__title">Characters benefit from rewards</h3>
                <DomainRewardsTabBar domainType={type} rewards={rewards} />
              </div>
            )}
          </section>
        ) : undefined
      )}
    />
  );
}