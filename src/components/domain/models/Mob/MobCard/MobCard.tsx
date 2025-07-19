import { useMemo } from "react";
import { classNames } from "@/common/functions/strings";

import { Mob, Boss, EasyMob, EliteMob, WorldBoss, WeeklyBoss, ArtifactSet } from "@/common/models";
import { ResinIcon } from "@/components/common/media/icons";
import { Rarity, ResinCost } from "@/common/types";
import { MaterialCard } from "../../Material";
import { ArtifactCard } from "../../Artifacts";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import MobImage from "@/components/common/media/Images/MobImage";
import RelationsForModel from "../../Material/MaterialCard/components/RelationsForModel";
import TabBar from "@/components/common/TabBar";
import { ElementalCrystal } from "@/common/models/materials/MobDrop";
import { Billet } from "@/common/models/materials/Billet";
import { Region } from "@/components/domain";
import { MaterialImage } from "@/components/common/media/Images";
import { useMaterialMultiModelRelations } from "../../Material/MaterialCard/components/RelationsForModel/hooks/useMaterialRelationData";

export interface Props extends BaseModelCardProps {
  mob: Mob;
  showDetails?: boolean;
  showDrops?: boolean;
  showRegion?: boolean;
  showResin?: boolean;
  showRelations?: boolean;
}

export default function MobCard({
  mob,
  showDetails,
  showDrops,
  showRegion,
  showResin,
  showRelations,
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
  
  const dropRelations = useMemo(() => drops.filter(drop => {
    if (ArtifactSet.isArtifactSet(drop)) return false;
    if (ElementalCrystal.isElementalCrystal(drop)) {
      if (drop.rarity === Rarity.Uncommon || drop.rarity === Rarity.Legendary) return true;
      return false;
    }
    if (Billet.isBillet(drop)) return false;
    if (drop.name === 'Dream Solvent') return false;
    return true;
  }), [drops]);  // Get relation data for all materials to check if tabs should be shown
  const relationsData = dropRelations.map(drop => ({
    drop,
    relations: useMaterialMultiModelRelations(drop.name, ['Character', 'Weapon'] as const)
  }));

  return (
    <ModelCard
      model="Mob"
      item={mob}
      {...props}

      renderImage={() => <MobImage mob={name} />}
      renderHeadingContent={() => (
        <span className="mob-card__type">{mobType.replace('-', ' ')}</span>
      )}
      renderHeaderContent={() => (showResin || showDetails || showRegion) && (
        <div className="mob-card__details">
          {Boss.isBoss(mob) && mob.resinCosts.length > 0 && showResin && (
            <div className="mob-card__resin">
              {mob.resinCosts.map(resin => <ResinIcon key={resin} cost={resin}
                title={resin === ResinCost.Thirty
                  ? 'Weekly bosses have a 3 time use per week where drops cost 30 resin. Once weekly limit is exceeded, weekly bosses not defeated will cost 60 resin.'
                  : undefined}
              />)}
            </div>)}

          {showDetails && (
            <p className="mob-card__description">
              {description}
            </p>
          )}
          {Boss.isBoss(mob) && showRegion && (
            <Region region={mob.region} className="mob-card__region" />
          )}
        </div>
      )}
      renderContent={() => (
        <div className="mob-card__info">
          {(showDetails || showDrops) && (
            <div className="mob-details-section">
              {showDrops && drops.length > 0 && (
                <div className="mob-card__drops">
                  <h2>Drops</h2>
                  <ul className="mob-card__drops-list">
                    {drops.map(drop => (
                      <div className="mob-drop-container" key={`drop-${drop.name}`}>
                        {ArtifactSet.isArtifactSet(drop)
                          ? <ArtifactCard artifact={drop} nameTag="h4" wrapInLink showRarity />
                          : <MaterialCard material={drop} allowCycle={false} nameTag="h4" wrapInLink showRarity />
                        }
                      </div>
                    ))}
                  </ul>
                </div>
              )}
              {showRelations && drops.length > 0 && (
                <div className="mob-card__relations">
                  <h2>Relations</h2>                  
                  <TabBar tabs={tab => relationsData.flatMap(({ drop, relations }) => {
                    const [characterRelations, weaponRelations] = relations;
                    const hasCharacterRelations = Boolean(characterRelations?.length);
                    const hasWeaponRelations = Boolean(weaponRelations?.length);
                    const hasMultipleTabs = hasCharacterRelations && hasWeaponRelations;
                    
                    return [
                      // Character tab - only if there are character relations
                      ...(hasCharacterRelations ? [tab(
                        `${drop.name}--Characters`,
                        <div className="material-card--light">
                          <MaterialImage material={drop.name} />
                          <h3>{drop.name} {hasMultipleTabs && <span>(for Characters)</span>}</h3>
                        </div>,
                        <RelationsForModel key={`${drop.name}-char`} materialName={drop.name} model="Character" models={characterRelations} />
                      )] : []),
                      
                      // Weapon tab - only if there are weapon relations
                      ...(hasWeaponRelations ? [tab(
                        `${drop.name}--Weapons`,
                        <div className="material-card--light">
                          <MaterialImage material={drop.name} />
                          <h3>{drop.name} {hasMultipleTabs && <span>(for Weapons)</span>}</h3>
                        </div>,
                        <RelationsForModel key={`${drop.name}-weapon`} materialName={drop.name} model="Weapon" models={weaponRelations} />
                      )] : [])
                    ];
                  })} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
