import { rarityString } from "@/common/functions/strings";
import { Character } from "@/common/models";
import { CharacterImage } from "@/components/common/Images";
import CharacterSet from "../CharacterSet";
import TabBar from "@/components/common/TabBar";
import ModelCard, { BaseModelCardProps } from "@/components/common/ModelCard";

export interface Props extends BaseModelCardProps {
  character: Character;

  score?: number;

  showCharacterSets?: boolean;
  children?: React.ReactNode;
}

export default function CharacterCard({
  character, score,
  showRarity, showCharacterSets, children,
  ...props
}: Props) {
  const { name, bonusAbilities, sets, rarity } = character;

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