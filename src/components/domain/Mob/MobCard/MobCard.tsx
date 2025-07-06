import { useMemo } from "react";
import { classNames } from "@/common/functions/strings";

import { Mob, Boss, EasyMob, EliteMob, WorldBoss, WeeklyBoss, ArtifactSet } from "@/common/models";
import { ResinIcon } from "@/components/common/icons";
import { ResinCost } from "@/common/types";
import { MaterialCard } from "../../Material";
import { ArtifactCard } from "../../Artifacts";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";

export interface Props extends BaseModelCardProps {
  mob: Mob;
  showDetails?: boolean;
  showDrops?: boolean;
  showRegion?: boolean;
  children?: React.ReactNode;
}

export default function MobCard({ 
  mob, 
  showDrops = true, 
  showRegion = true, 
  children, 
  ...props 
}: Props) {
  const { name, description, drops } = mob;

  const mobType = useMemo(() => {
    if (WeeklyBoss.isWeeklyBoss(mob)) return "weekly-boss";
    if (WorldBoss.isWorldBoss(mob)) return "world-boss";
    if (Boss.isBoss(mob)) return "boss";
    if (EliteMob.isEliteMob(mob)) return "elite";
    if (EasyMob.isEasyMob(mob)) return "easy";
    return "mob";
  }, [mob]);

  return (
    <ModelCard
      model="Mob"
      item={mob}
      {...props}
      className={classNames('mob-card', props.showDetails && 'mob-card--show-more', props.className)}

      renderImage={() => <div>Mob Image Placeholder</div>}
      renderHeadingContent={() => (
        <span className="mob-card__type">{mobType.replace('-', ' ')}</span>
      )}
      renderContent={() => (
        <div className="mob-card__info">
          {Boss.isBoss(mob) && showRegion && (
            <p className="mob-card__region" data-region={mob.region}>
              {mob.region}
            </p>
          )}

          {Boss.isBoss(mob) && mob.resinCosts.length > 0 && (
            <div className="mob-card__resin">
              {mob.resinCosts.map(resin => <ResinIcon key={resin} cost={resin}
                title={resin === ResinCost.Thirty
                  ? 'Weekly bosses have a 3 time use per week where drops cost 30 resin. Once weekly limit is exceeded, weekly bosses not defeated will cost 60 resin.'
                  : undefined}
              />)}
            </div>
          )}

          <div className="mob-details-section">
            <div className="mob-card__details">
              <div className="mob-card__details-container">
                <p className="mob-card__description">
                  {description}
                </p>
              </div>
            </div>

            {showDrops && drops.length > 0 && (
              <div className="mob-card__drops">
                <h2>Drops</h2>
                <ul className="mob-card__drops-list">
                  {drops.map(drop => (
                    <div className="mob-drop-container" key={`drop-${drop.name}`}>
                      {
                        ArtifactSet.isArtifactSet(drop)
                          ? <ArtifactCard artifact={drop} />
                          : <MaterialCard material={drop} allowCycle={false} nameTag="h4" />
                      }
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {children}
        </div>
      )}
    />
  );
}
