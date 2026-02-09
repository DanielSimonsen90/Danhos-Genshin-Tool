import { useMemo, JSX } from "react";

import { numberSeparator, rarityString } from "@/common/functions/strings";
import { Character, List, Weapon } from "@/common/models";

import { CharacterImage, ElementImage, WeaponImage } from "@/components/common/media/Images";
import ModelCard, { BaseModelCardProps, ModelRarityTabGroup } from "@/components/domain/ModelCard";
import { Region } from "@/components/domain";

import { useDataStore } from "@/stores";

import CharacterPlaystyle from "../CharacterPlaystyle";
import { MaterialCard } from "../../Material";
import { WeaponCard } from "../../Weapon";
import Separator from "@/components/common/Separator";
import TabBar, { Tab } from "@/components/common/TabBar";
import { SearchableWeaponList } from "@/components/domain/SearchableList";
import RarityList from "@/components/common/media/icons/Rarity";
import { Functionable, Rarity } from "@/common/types";
import { RecommendedWeaponForCharacter } from "@/services/SearchService/weapon/types";
import { WeaponSearchService } from "@/services/SearchService";
import { Badge } from "@/components/common/media/icons";

type ChildrenProps = {
  character: Character;
};

export interface Props extends BaseModelCardProps {
  character: Character;

  score?: number;

  showPassiveTalent?: boolean;
  showAscensionSection?: boolean;
  showCharacterPlaystyle?: boolean;
  showRecommendedWeapons?: boolean;
  showSignatureWeapon?: boolean;
  children?: Functionable<React.ReactNode, [props: ChildrenProps]>;
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
  const getRecommendedWeaponsFor = useDataStore(store => store.getRecommendedWeaponsForCharacter);

  const signatureWeapon = useMemo(() => getSignatureWeaponFor(character), [character, getSignatureWeaponFor]);
  const recommendedWeapons = useMemo(() => showRecommendedWeapons ? getRecommendedWeaponsFor(character) : undefined, [character, getRecommendedWeaponsFor, showRecommendedWeapons]);
  const weapons = useMemo(() => {
    if (!recommendedWeapons) return List.from([]);
    
    const result: ModelRarityTabGroup<RecommendedWeaponForCharacter> = new Map();
    
    if (signatureWeapon && showSignatureWeapon) {
      const signatureWeaponResult = recommendedWeapons
        .get(signatureWeapon.rarity)
        ?.find(w => w.weapon.name === signatureWeapon.name);

      if (signatureWeaponResult) {
        result.set('signature', {
          title: (
            <>
              <ElementImage element={character.element} />
              <p>Signature</p>
            </>
          ),
          items: [signatureWeaponResult],
          color: 'var(--element)',
          rarity: signatureWeapon.rarity
        });
      }
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
          items: weapons,
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
  const resolvedChildren = useMemo(() => (
    typeof children === 'function' ? children({ character }) : children
  ), [children, character]);

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
              <h3>
                <Badge variant="beta" />
                Recommended Weapons
              </h3>
              <TabBar tabs={weapons.mapToArray(([key, { title, items, color, rarity }]) => ([
                key,
                {
                  title: (
                    <div data-rarity={rarityString(rarity)} style={{ color }}>
                      {title}
                    </div>
                  ),
                  content: <SearchableWeaponList items={items.map(result => result.weapon)}
                    cardProps={{
                      wrapInLink: true,
                      showDetails: true,
                      showStats: true,
                      showSource: true,
                      hideWeaponType: true,
                      children: (props) => {
                        const weaponResult = items.find(r => r.weapon.name === props.weapon.name);
                        if (!weaponResult) return null;
                        
                        const scoreColor = WeaponSearchService.getScoreColor(weaponResult.score)
                        
                        return (
                          <p style={{ color: scoreColor }}>
                            Recommended Score: <b>{weaponResult.score}</b>
                          </p>
                        );
                      }
                    }}
                  />
                }
              ] as const))} />
            </div>
          )}
          {resolvedChildren}
        </section>
      )}
    />
  );
}