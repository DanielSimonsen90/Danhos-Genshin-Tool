import { useMemo, JSX } from "react";

import { numberSeparator, rarityString } from "@/common/functions/strings";
import { Character, List, Weapon } from "@/common/models";

import { CharacterImage, ElementImage, WeaponImage } from "@/components/common/media/Images";
import ModelCard, { BaseModelCardProps } from "@/components/domain/ModelCard";
import { Region } from "@/components/domain";

import { useDataStore } from "@/stores";

import CharacterPlaystyle from "../CharacterPlaystyle";
import { MaterialCard } from "../../Material";
import { WeaponCard } from "../../Weapon";
import Separator from "@/components/common/Separator";
import TabBar, { Tab } from "@/components/common/TabBar";
import { SearchableWeaponList } from "@/components/domain/SearchableList";
import RarityList from "@/components/common/media/icons/Rarity";
import { Rarity } from "@/common/types";

export interface Props extends BaseModelCardProps {
  character: Character;

  score?: number;

  showPassiveTalent?: boolean;
  showAscensionSection?: boolean;
  showCharacterPlaystyle?: boolean;
  showRecommendedWeapons?: boolean;
  showSignatureWeapon?: boolean;
  children?: React.ReactNode;
}

export default function CharacterCard({
  character, score,
  showPassiveTalent,
  showAscensionSection,
  showCharacterPlaystyle,
  showSignatureWeapon,
  showRecommendedWeapons,
  children,
  ...props
}: Props) {
  const { name, bonusAbilities, rarity } = character;

  const getSignatureWeaponFor = useDataStore(store => store.getSignatureWeaponFor);
  const getRecommendedWeaponsFor = useDataStore(store => store.getRecommendedWeaponsFor);

  const signatureWeapon = useMemo(() => getSignatureWeaponFor(character), [character, getSignatureWeaponFor]);
  const recommendedWeapons = useMemo(() => getRecommendedWeaponsFor(character), [character, getRecommendedWeaponsFor]);
  const weapons = useMemo(() => {
    const result = new Map<string, Omit<Tab, 'content'> & { 
      weapons: Array<Weapon<any>>, 
      color: string,
      rarity: Rarity
    }>();

    if (signatureWeapon && showSignatureWeapon) {
      result.set('signature', {
        title: (
          <>
            <ElementImage element={character.element} />
            <p>Signature</p>
          </>
        ),
        weapons: [signatureWeapon],
        color: 'var(--element)',
        rarity
      });
    }

    if (showRecommendedWeapons) {
      for (const [rarity, weapons] of recommendedWeapons.entries()) {
        result.set(rarityString(rarity), {
          title: (
            <>
              <RarityList rarity={rarity} onlyOne />
              <p>{rarityString(rarity)}</p>
            </>
          ),
          weapons,
          color: `var(--rarity)`,
          rarity
        });
      }
    }

    return List.from(result);
  }, [character.element, recommendedWeapons, signatureWeapon, showRecommendedWeapons, showSignatureWeapon]);
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
        <>
          <span className="image-container">
            <ElementImage element={character.element} />
          </span>
          <Separator show={!props.wrapInLink} />
          <span className="image-container">
            <WeaponImage weaponType={character.weapon} />
          </span>
        </>
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
          {score !== undefined && (
            <p className="character-details__score">
              Score: <b>{numberSeparator(score)}</b>
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
              <CharacterPlaystyle character={character} showRecommendedArtifactSets showRecommendedTalentAscension />
            </div>
          )}
          {weapons.length > 0 && (
            <div className="character-recommended-weapons">
              <h3>Recommended Weapons</h3>
              <TabBar tabs={weapons.mapToArray(([key, { title, weapons, color, rarity }]) => ([
                key,
                {
                  title: (
                    <div data-rarity={rarityString(rarity)} style={{ color }}>
                      {title}
                    </div>
                  ),
                  content: <SearchableWeaponList items={weapons}
                    cardProps={{
                      wrapInLink: true,
                      showDetails: true,
                      showStats: true
                    }}
                  />
                }
              ]))} />
            </div>
          )}
          {children}
        </section>
      )}
    />
  );
}