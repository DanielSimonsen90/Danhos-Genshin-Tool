import { useMemo } from "react";
import { classNames, rarityString } from "@/common/functions/strings";
import { Character, List, Weapon } from "@/common/models";
import { ElementImage, WeaponImage } from "@/components/common/media/Images";
import ModelCard, { BaseModelCardProps, ModelRarityTabGroup } from "@/components/domain/ModelCard";
import { CharacterCard } from "../../Character";
import { MaterialCard } from "../../Material";
import { useWeaponDescription } from "./WeaponCardHooks";
import { useDataStore } from "@/stores";
import { Functionable, Rarity } from "@/common/types";
import TabBar, { Tab } from "@/components/common/TabBar";
import RarityList from "@/components/common/media/icons/Rarity";
import SearchableCharacterList from "@/components/domain/SearchableList/SearchableLists/SearchableCharacterList";
import { RecommendedCharacterForWeapon } from "@/services/SearchService/weapon/types";
import { WeaponSearchService } from "@/services/SearchService";
import { Badge } from "@/components/common/media/icons";

export interface Props extends BaseModelCardProps {
  weapon: Weapon;
  children?: Functionable<React.ReactNode, [props: { weapon: Weapon }]>;

  showStats?: boolean;
  showDetails?: boolean;
  showSource?: boolean;
  showAscensionSection?: boolean;
  showSignatureCharacter?: boolean;
  showRecommendedCharacters?: boolean;
  hideWeaponType?: boolean;
}

export default function WeaponCard({
  weapon,
  showStats,
  showDetails,
  showSource,
  showAscensionSection,
  showSignatureCharacter,
  showRecommendedCharacters,
  hideWeaponType,
  children,
  ...props
}: Props) {
  const { name, type, rarity, baseAttack, secondaryStat, secondaryStatValue, ascensionMaterials, droppedBy, signatureWeaponFor } = weapon;
  
  const CharactersData = useDataStore(store => store.CharactersData);
  const getRecommendedCharactersForWeapon = useDataStore(store => store.getRecommendedCharactersForWeapon);

  const characters = useMemo(() => {
    const signatureCharacter = signatureWeaponFor !== undefined
      ? signatureWeaponFor(CharactersData)
      : undefined;

    const result: ModelRarityTabGroup<RecommendedCharacterForWeapon> = new Map();
    const recommendedCharacters = (
      (signatureCharacter && showSignatureCharacter)
      || showRecommendedCharacters
    ) 
      ? getRecommendedCharactersForWeapon(name)
      : undefined;

    if (signatureCharacter && showSignatureCharacter) {
      const signatureCharacterResult = recommendedCharacters
        ?.get(signatureCharacter.rarity)
        ?.find(c => c.character.name === signatureCharacter.name);

      if (signatureCharacterResult) {
        result.set('signature', {
          title: (
            <>
              <ElementImage element={signatureCharacter.element} />
              <p>Signature</p>
            </>
          ),
          items: [signatureCharacterResult],
          color: 'var(--element)',
          rarity: signatureCharacter.rarity
        });
      }

    }

    if (showRecommendedCharacters) {
      const recommendedCharacters = getRecommendedCharactersForWeapon(name);

      for (const [rarity, characters] of recommendedCharacters.entries()) {
        result.set(rarityString(rarity), {
          title: (
            <>
              <RarityList rarity={rarity} onlyOne />
              <p>{rarityString(rarity)}</p>
            </>
          ),
          items: characters,
          color: `var(--rarity)`,
          rarity
        });
      }
    }

    return List.from(result);
  }, [CharactersData, getRecommendedCharactersForWeapon, signatureWeaponFor, showRecommendedCharacters, showSignatureCharacter, weapon]);
  const resolvedChildren = useMemo(() => typeof children === 'function' ? children({ weapon }) : children, [children, weapon]);

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
          {characters.length > 0 && (
            <div className="weapon-recommended-characters">
              <h3>
                <Badge variant="beta" />
                Recommended Characters
              </h3>
              <TabBar tabs={characters.mapToArray(([key, { title, items, color, rarity }]) => ([
                key,
                {
                  title: (
                    <div data-rarity={rarityString(rarity)} style={{ color }}>
                      {title}
                    </div>
                  ),
                  content: <SearchableCharacterList items={items.map(result => result.character)}
                    cardProps={{
                      wrapInLink: true,
                      children: ({ character }) => {
                        const recommendationCharacter = getRecommendedCharactersForWeapon(name).get(character.rarity)
                        const recommendationScore = recommendationCharacter
                          ? recommendationCharacter.find(c => c.character.name === character.name)?.score
                          : undefined;
                        const scoreColor = WeaponSearchService.getScoreColor(recommendationScore ?? 0);
                        
                        return (
                          <p style={{ color: scoreColor }}>
                            Recommended Score: <b>{recommendationScore}</b>
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
      ) : null}
    />
  );
}