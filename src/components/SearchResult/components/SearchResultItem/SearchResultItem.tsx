import { Link } from 'react-router-dom';

import { classNames, snakeCaseFromCamelCase } from '@/common/functions/strings';
import { SearchResultItem } from '@/services/SearchService';

import { ArtifactSet } from '@/common/models';
import CharacterSetResult from '../CharacterSetResult';
import { CharacterImage } from '@/components/Images';

type Props = {
  result: SearchResultItem;
  set: ArtifactSet;
};

export const SearchResultItemComponent = ({ result, set: artifactSet }: Props) => {
  const { character, score, set, shouldSave } = result;

  return (
    <li id={snakeCaseFromCamelCase(character.name)} 
      className={classNames("search-result-item", !shouldSave && 'search-result-item--hide')}
      data-element={character.element}
    >
      <CharacterImage character={character.name} />
      <div className='character-details'>
        <h2 className='character-details__name'>
          <Link to={`/characters/${snakeCaseFromCamelCase(character.name)}`}>
            {character.name}
          </Link>
        </h2>
        <ul className="character-details__grouped">
          <li className="element">{character.element}</li>
          <li className="weapon">{character.weapon}</li>
          {character.bonusAbility !== 'Nothing' ? (
            <li className="bonus-ability" title={`${character.name} is also able to ${character.bonusAbility.toLowerCase()}`}>
              {character.bonusAbility}
            </li>
          ) : null}
        </ul>
        <p className="character-details__score">
          Score: <b>{score}</b>
        </p>
      </div>
      <CharacterSetResult character={character} set={set} artifactSet={artifactSet} />
    </li>
  );
};

export default SearchResultItemComponent;