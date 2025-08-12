import { useMemo } from "react";

import { rarityString } from "@/common/functions/strings";
import { Character } from "@/common/models";

import { CharacterImage, ElementImage } from "@/components/common/media/Images";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { Region } from "@/components/domain";

import { useDataStore } from "@/stores";

import CharacterPlaystyle from "../CharacterPlaystyle";
import { MaterialCard } from "../../Material";
import { WeaponCard } from "../../Weapon";

export interface Props extends BaseModelCardProps {
  character: Character;

  score?: number;

  showPassiveTalent?: boolean;
  showAscensionSection?: boolean;
  showCharacterPlaystyle?: boolean;
  showSignatureWeapon?: boolean;
  children?: React.ReactNode;
}

export default function CharacterCard({
  character, score,
  showPassiveTalent,
  showAscensionSection,
  showCharacterPlaystyle,
  showSignatureWeapon,
  children,
  ...props
}: Props) {
  const { name, bonusAbilities, rarity } = character;

  const DataStore = useDataStore();
  const signatureWeapon = DataStore.getSignatureWeaponFor(character);
  const ascensionMaterials = useMemo(() => {
    if (!showAscensionSection) return [];
    const keys: Array<keyof Character['ascension']> = [
      'localSpecialty',
      'material',
      'mobDrop',
      'crystal',
      'worldBossDrop',
      'weeklyBossDrop',
    ];
    return keys.map(key => [key, character.ascension[key]] as const);
  }, [character, showAscensionSection]);

  return (
    <ModelCard
      model="Character"
      item={character}
      data-element={character.element}
      data-rarity={rarityString(rarity)}
      {...props}

      renderImage={() => <CharacterImage character={name} />}
      renderHeadingContent={() => (
        <span className="element-image-container">
          <ElementImage element={character.element} />
        </span>
      )}
      renderHeaderContent={() => (
        <>
          <ul className="character-details__grouped">
            {bonusAbilities.length > 0 ? (
              <ul className="bonus-abilities">
                {bonusAbilities.map((ability, i) => {
                  if (ability.includes(':')) {
                    const [name, desc] = ability.split(':').map(s => s.trim());
                    return <li key={i} className="bonus-ability" title={desc} data-ability-asterisk>{name}</li>;
                  }
                  return <li key={i} className="bonus-ability" title={ability}>{ability}</li>;
                })}
              </ul>
            ) : <span>No special traits.</span>}
          </ul>
          {!props.wrapInLink && <Region region={character.region} className="region" />}
          {score && score > 0 && (
            <p className="character-details__score">
              Score: <b>{score}</b>
            </p>
          )}
          {showPassiveTalent && (
            <p className="passive-talent">
              <strong>Passive Talent:</strong>
              <span>{character.passiveTalent}</span>
            </p>
          )}
        </>
      )}
      renderContent={() => (
        <section className="character-card__content">
          {showAscensionSection && (
            <div className="character-ascension">
              <h3>Ascension Materials</h3>
              <ul className="character-ascension__list">
                {ascensionMaterials.map(([key, item]) => (
                  <li key={key} className="character-ascension__item">
                    <MaterialCard material={item} allowCycle={false} wrapInLink nameTag="h4" />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showCharacterPlaystyle && (
            <div className="character-playstyle-wrapper">
              <h3 className="character-playstyle-wrapper__title">Playstyle</h3>
              <CharacterPlaystyle character={character} />
            </div>
          )}
          {showSignatureWeapon && signatureWeapon && (
            <div className="character-signature-weapon">
              <h3>Signature Weapon</h3>
              <WeaponCard weapon={signatureWeapon} wrapInLink showRarity showStats showSource showDetails />
            </div>
          )}

          {children}
        </section>
      )}
    />
  );
}