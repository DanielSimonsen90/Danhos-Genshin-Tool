import { Link } from "react-router-dom";
import { snakeCaseFromCamelCase } from "@/common/functions/strings";
import { Character } from "@/common/models";
import { CharacterImage } from "@/components/common/Images";
import CharacterSet from "../CharacterSet";
import TabBar from "@/components/common/TabBar";
import { GetContainer } from "../../Item/functions";

type Props = {
  character: Character;
  score?: number;

  wrapInLink?: boolean;
  linkOnName?: boolean;
  showDetails?: boolean;

  children?: React.ReactNode;
};

export default function CharacterCard({ character, score, ...props }: Props) {
  const { name, element, bonusAbility, sets, weapon } = character;
  const { linkOnName, wrapInLink, showDetails } = props;
  const { children } = props;

  const Container = GetContainer(wrapInLink, character, 'characters');
  const CharacterName = GetCharacterNameComponent(linkOnName, character);

  return (
    <Container className='character-card' data-element={character.element}>
      <CharacterImage character={name} />
      <div className='character-details'>
        <h2 className='character-details__name'>
          <CharacterName />
        </h2>
        <ul className="character-details__grouped">
          <li className="element">{element}</li>
          <li className="weapon">{weapon}</li>
          {bonusAbility !== 'Nothing' ? (
            <li className="bonus-ability" title={`${name} is also able to ${bonusAbility.toLowerCase()}`}>
              {bonusAbility}
            </li>
          ) : null}
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
          <TabBar tabs={sets.map(set => [set.name, set.name])} 
            {...sets.reduce((acc, set) => ({ ...acc, [set.name]: <CharacterSet set={set} character={character} /> }), {} as any)}
          />
        </div>
      )}
      {children}
    </Container>
  );
}

function GetCharacterNameComponent(linkOnName: boolean, character: Character) {
  return () => linkOnName
    ? <Link className="clickable" to={`/characters/${snakeCaseFromCamelCase(character.name)}`}>{character.name}</Link>
    : <>{character.name}</>;
}