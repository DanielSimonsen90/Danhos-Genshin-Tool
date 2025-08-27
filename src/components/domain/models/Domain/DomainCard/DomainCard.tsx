import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/common/constants/routes";
import { Rarity } from "@/common/types";
import { ArtifactSet } from "@/common/models";
import { Domain } from "@/common/models/domains/Domain";
import { classNames } from "@/common/functions/strings";

import { ArtifactImage, DomainImage, MaterialImage } from "@/components/common/media/Images";
import { ResinIcon } from "@/components/common/media/icons";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { Region } from "@/components/domain";

import { useDataStore, useRegionStore } from "@/stores";

import { ArtifactCard } from "../../Artifacts";
import { MaterialCard } from "../../Material";
import DomainRewardsTabBar from "../DomainRewardsTabBar";
import LeyLineDisorderPagination from "./LeyLineDisorderPagination";

export interface Props extends BaseModelCardProps {
  domain: Domain<any> | null;
  showResin?: boolean;
  showDescription?: boolean;
  showLeyLineDisorder?: boolean;
  showMinRewards?: boolean;
  showDetailedRewards?: boolean;
  showCharactersBenefitFromRewards?: boolean;
  showNavButton?: boolean;
}

export default function DomainCard({
  domain,
  showResin, showDescription, showLeyLineDisorder, showMinRewards, showDetailedRewards,
  showCharactersBenefitFromRewards, showNavButton,
  ...props
}: Props) {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();

  if (!domain) return null;

  const { name, description, leyLineDisorder: leylineDisorder, resinCost, region } = domain;
  const rewards = domain.getRewards(DataStore);
  const type = domain.getDomainType();
  const minRewards = useMemo(() => {
    if (domain.isBlessing()) return domain.getRewards(DataStore).filter(artifact => artifact.rarity === Rarity.Legendary);
    if (domain.isForgery()) return domain.getRewards(DataStore);
    if (domain.isMastery()) return domain.getRewards(DataStore);
    return [];
  }, [rewards]);

  return (
    <ModelCard
      key={`${RegionStore.currentRegion}-${name}`}
      model="Domain"
      item={domain}
      {...props}
      className={classNames('domain-card', props.className)}

      renderImage={() => <DomainImage domain={name} />}
      renderHeadingContent={showResin ? () => <ResinIcon cost={resinCost} /> : undefined}
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
        (showLeyLineDisorder || showDetailedRewards || showCharactersBenefitFromRewards) ? (
          <section>
            {showLeyLineDisorder && <LeyLineDisorderPagination
              domainName={name}
              leyLineDisorder={leylineDisorder}
            />}
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
        ) : null
      )}
    />
  );
}