import { Link } from 'react-router-dom';

import { classNames, snakeCaseFromCamelCase } from '@/common/functions/strings';
import { SearchResultItem } from '@/services/SearchService';

import { ArtifactSet } from '@/common/models';
import CharacterSetResult from '../CharacterSetResult';

type Props = {
  result: SearchResultItem;
  set: ArtifactSet;
};

export const SearchResultItemComponent = ({ result, set: artifactSet }: Props) => {
  const { character, score, set, shouldSave } = result;

  return (
    <li id={snakeCaseFromCamelCase(character.name)} className={classNames("search-result-item", shouldSave && 'search-result-item--recommended-save')}>
      {/* <CharacterImage character={character.name} /> */}
      <div className='character-details'>
        <h2 className='character-details__name'>
          <Link to={`/characters/${snakeCaseFromCamelCase(character.name)}`}>
            {character.name}
          </Link>
        </h2>
        <CharacterSetResult character={character} set={set} artifactSet={artifactSet} />
        <p className='character-details__score'>{score}</p>
      </div>
    </li>
  );
}

export default SearchResultItemComponent;