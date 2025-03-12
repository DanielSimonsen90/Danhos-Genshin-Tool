import { Link } from "react-router-dom";
import { rarityString, snakeCaseFromCamelCase } from "@/common/functions/strings";
import { Character } from "@/common/models";
import { CharacterImage } from "@/components/common/Images";
import CharacterSet from "../CharacterSet";
import TabBar from "@/components/common/TabBar";
import { GetContainer } from "../../Item/functions";
import RarityList from "@/components/common/icons/Rarity";
import ElementImage from "@/components/common/Images/ElementImage";
import WeaponImage from "@/components/common/Images/WeaponImage";

export type Props = {
  character: Character;
  score?: number;

  wrapInLink?: boolean;
  linkOnName?: boolean;
  showDetails?: boolean;
  showRarity?: boolean;

  children?: React.ReactNode;
};

export default function CharacterCard({ character, score, ...props }: Props) {
  const { name, element, bonusAbilities, sets, weapon, rarity } = character;
  const { linkOnName, wrapInLink, showDetails, showRarity } = props;
  const { children } = props;

  const Container = GetContainer(wrapInLink, character, 'data/characters');
  const CharacterName = GetCharacterNameComponent(linkOnName, character);

  return (
    <Container className='character-card' data-element={character.element} data-rarity={rarityString(rarity)}>
      <CharacterImage character={name} />
      <div className='character-details'>
        <h1 className='character-details__name' title={name}>
          <CharacterName />
          {showRarity && <RarityList rarity={rarity} />}
        </h1>
        <ul className="character-details__grouped">
          {bonusAbilities.length > 0 ? (
            <ul className="bonus-abilities">
              {bonusAbilities.map((ability, i) => {
                if (ability.includes(':')) {
                  const [name, desc] = ability.split(':').map(s => s.trim());
                  return <li key={i} className="bonus-ability" title={desc}>{name}</li>;
                }

                return <li key={i} className="bonus-ability" title={ability}>{ability}</li>
              })}
            </ul>
          ) : <span>No special traits.</span>}
        </ul>
        {score && score > 0 && (
          <p className="character-details__score">
            Score: <b>{score}</b>
          </p>
        )}
      </div>
      {showDetails && (
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
    </Container>
  );
}

function GetCharacterNameComponent(linkOnName: boolean, character: Character) {
  const CharacterName = () => (
    <span className="character-name">
      <span className="character-name__value">{character.name}</span>
      <span className="character-name__element"><ElementImage element={character.element} /></span>
      <span className="character-name__weapon"><WeaponImage weapon={character.weapon} /></span>
    </span>
  )

  return () => linkOnName
    ? <Link to={`/data/characters/${character.name}`}><CharacterName /></Link>
    : <CharacterName />;
}