import { useMemo } from "react";
import { rarityString } from "@/common/functions/strings";
import { Weapon } from "@/common/models";
import { WeaponImage } from "@/components/common/media/Images";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { useCharacterData } from "@/stores";
import { CharacterCard } from "../../Character";
import { MaterialCard } from "../../Material";
import { useWeaponDescription } from "./WeaponCardHooks";

export interface Props extends BaseModelCardProps {
  weapon: Weapon;

  showStats?: boolean;
  showDetails?: boolean;
  showSource?: boolean;
  showAscensionSection?: boolean;
  showSignatureCharacter?: boolean;
  hideWeaponType?: boolean;
}

export default function WeaponCard({
  weapon,
  showStats,
  showDetails,
  showSource,
  showAscensionSection,
  showSignatureCharacter,
  hideWeaponType,
  ...props
}: Props) {
  const { name, type, rarity, baseAttack, secondaryStat, secondaryStatValue, ascensionMaterials, droppedBy, signatureWeaponFor } = weapon;
  const { CharactersData } = useCharacterData();

  const signatureCharacter = useMemo(() => (
    showSignatureCharacter && signatureWeaponFor
      ? signatureWeaponFor(CharactersData)
      : undefined
  ), [showSignatureCharacter, signatureWeaponFor, CharactersData]);

  const processedDescription = useWeaponDescription(weapon, showDetails);

  return (
    <ModelCard
      model="Weapon"
      item={weapon}
      data-weapon-type={type}
      data-rarity={rarityString(rarity)}
      data-dropped-by={droppedBy}
      {...props}

      renderImage={() => <WeaponImage weapon={name} />}
      renderHeadingContent={hideWeaponType ? undefined : () => (
        <div className="weapon-type">
          <WeaponImage weaponType={type} />
          <span className="weapon-type__value">
            {type}
          </span>
        </div>
      )}
      renderHeaderContent={() => (
        <>
          <div className="weapon-details__grouped">
            {showStats && (
              <div className="weapon-stats">
                {secondaryStat && (
                  <div className="weapon-stat">
                    <label className="weapon-stat__label">{secondaryStat}</label>
                    <span className="weapon-stat__value">{secondaryStatValue}</span>
                  </div>
                )}
                <div className="weapon-stat">
                  <label className="weapon-stat__label">Base ATK</label>
                  <span className="weapon-stat__value">{baseAttack}</span>
                </div>
              </div>
            )}

            {showSource && droppedBy && (
              <div className="weapon-source">
                <label className="weapon-source__label">Source</label>
                <span className="weapon-source__value">{droppedBy}</span>
              </div>
            )}
          </div>
        </>
      )}
      renderContent={() => showDetails ? (
        <section className="weapon-card__content">
          <p className="weapon-description" dangerouslySetInnerHTML={{ __html: processedDescription }} />
          {showAscensionSection && (
            <div className="weapon-ascension">
              <h3>Ascension Materials</h3>
              <ul className="weapon-ascension__list">
                {ascensionMaterials.map(item => (
                  <li key={item.name} className="weapon-ascension__item">
                    <MaterialCard material={item} allowCycle={false} wrapInLink nameTag="h4" />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {signatureCharacter && (
            <div className="weapon-signature">
              <h4>Signature weapon for</h4>
              <CharacterCard character={signatureCharacter} wrapInLink />
            </div>
          )}
        </section>
      ) : null}
    />
  );
}
