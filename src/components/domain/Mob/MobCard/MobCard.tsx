import { useMemo } from "react";
import { classNames } from "@/common/functions/strings";

import { Mob, Boss, EasyMob, EliteMob, WorldBoss, WeeklyBoss, ArtifactSet } from "@/common/models";
import { GetContainer } from "../../Item/functions";
import { ResinIcon } from "@/components/common/icons";
import { ResinCost } from "@/common/types";
import { MaterialCard } from "../../Material";
import { ArtifactCard } from "../../Artifacts";

export type Props = {
  mob: Mob;

  wrapInLink?: boolean;
  showDetails?: boolean;
  showDrops?: boolean;
  showRegion?: boolean;

  children?: React.ReactNode;
};

export default function MobCard({ mob, ...props }: Props) {
  const { name, description, drops } = mob;
  const { wrapInLink, showDetails, showDrops = true, showRegion = true, children } = props;

  const Container = useMemo(() => GetContainer(wrapInLink, mob, 'data/mobs'), [wrapInLink, mob]);
  const mobType = useMemo(() => {
    if (WeeklyBoss.isWeeklyBoss(mob)) return "weekly-boss";
    if (WorldBoss.isWorldBoss(mob)) return "world-boss";
    if (Boss.isBoss(mob)) return "boss";
    if (EliteMob.isEliteMob(mob)) return "elite";
    if (EasyMob.isEasyMob(mob)) return "easy";
    return "mob";
  }, [mob]);

  return (
    <Container className={classNames('mob-card', showDetails && 'mob-card--show-more')} data-type={mobType}>
      <header>
        <h2 className="mob-card__name" title={name}>
          <span className="mob-card__name-text">
            {name}
          </span>
          <span className="mob-card__type">{mobType.replace('-', ' ')}</span>
        </h2>

        {showDetails && (
          <div className="mob-card__details">
            <div className="mob-card__details-container">
              <p className="mob-card__description">
                {description}
              </p>
            </div>
          </div>
        )}
      </header>

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

        {showDrops && drops.length > 0 && (
          <div className="mob-card__drops">
            <h2>Drops</h2>
            <ul className="mob-card__drops-list">
              {drops.map(drop => (
                <div className="mob-drop-container" key={`drop-${drop.name}`}>
                  {
                    ArtifactSet.isArtifactSet(drop)
                      ? <ArtifactCard artifact={drop} />
                      : <MaterialCard material={drop} allowCycle={false} />
                  }
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {children}
    </Container>
  );
}
