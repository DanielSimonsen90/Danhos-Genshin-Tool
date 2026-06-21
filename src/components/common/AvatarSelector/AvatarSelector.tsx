import type * as Characters from '@/data/characters';
import SearchableList from '@/components/domain/SearchableList';
import { useDataStore } from '@/stores';
import CharacterImage from '../media/Images/CharacterImage';
import { classNames } from '@/common/functions/strings';
import Collapsible from '../Collapsible';

type Props = {
  selectedAvatar?: keyof typeof Characters;
  onSelect: (avatar: keyof typeof Characters) => void;
};

export default function AvatarSelector({ selectedAvatar, onSelect }: Props) {
  const CharacterNames = useDataStore(store => store.CharacterNames);

  const onCharacterSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    characterName: keyof typeof Characters
  ) => {
    e.preventDefault();
    onSelect(characterName);
  };

  return (
    <Collapsible title="Profile Avatar" className='avatar-selector-container'>
      <SearchableList
        className='avatar-selector'
        items={CharacterNames}
        onSearch={(query, item) => item.toLowerCase().includes(query.toLowerCase())}
      >
        {characterName => (
          <button
            onClick={e => onCharacterSelect(e, characterName as keyof typeof Characters)}
            className={classNames(
              'avatar-selector__item',
              selectedAvatar === characterName && 'avatar-selector__item--selected'
            )}
          >
            <CharacterImage character={characterName as keyof typeof Characters} />
          </button>
        )}
      </SearchableList>
    </Collapsible>
  );
}
