import { useMemo } from "react";
import { rarityString } from "@/common/functions/strings";
import { Character } from "@/common/models";
import { CharacterImage, MaterialImage } from "@/components/common/Images";
import CharacterSet from "../CharacterSet";
import TabBar from "@/components/common/TabBar";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";
import { MaterialCard } from "../../Material";

export interface Props extends BaseModelCardProps {
  character: Character;

  score?: number;

  showAscensionSection?: boolean;
  showCharacterSets?: boolean;
  children?: React.ReactNode;
}

export default function CharacterCard({
  character, score,
  showAscensionSection,
  showCharacterSets,
  children,
  ...props
}: Props) {
  const { name, bonusAbilities, sets, rarity } = character;
  const ascensionMaterials = useMemo(() => {
    if (!showAscensionSection) return [];
    const keys: Array<keyof Character['ascension']> = [
      'localSpecialty', 
      'material',
      'mobDrop',
      'crystal',
      'worldBossDrop',
      'weeklyBossDrop',
    ]
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
          {score && score > 0 && (
            <p className="character-details__score">
              Score: <b>{score}</b>
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
          {showCharacterSets && (
            <div className="character-sets">
              <h3 className="character-sets__title">Character Sets</h3>
              <TabBar id={`${name}-sets`}
                tabs={create => sets.map(set => create(
                  set.name,
                  set.name,
                  <CharacterSet set={set} character={character} />
                ))}
              />
            </div>
          )}

          {children}
        </section>
      )}
    />
  );
}