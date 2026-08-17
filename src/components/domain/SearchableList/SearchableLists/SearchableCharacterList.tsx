import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Character } from "@/common/models";
import { CharacterCard, CharacterPopover } from "@/components/domain/models/Character";
import { Props as CharacterCardProps } from "@/components/domain/models/Character/CharacterCard/CharacterCard";

import { useDataStore, useFavorite } from "@/stores";
import { useContextMenu } from "@/providers/ContextMenuProvider";

import { OptionalProps, UncrontrolledProps } from "@/components/domain/SearchableList/Props";
import SearchableList from "@/components/domain/SearchableList/SearchableList";
import { FavoriteStar } from "@/components/common/media/icons/Star";
import { getCharacterFilterChecks, getCharacterSortChecks } from "./filters/character.filter";

type Props<TFilterKeys extends string> = (
  & Partial<UncrontrolledProps<Character, TFilterKeys>>
  & OptionalProps<Character, TFilterKeys>
  & {
    noBaseSearch?: boolean;
    noBaseFilterChecks?: boolean;
    cardProps?: Partial<Omit<CharacterCardProps, 'character'>>;
  }
);
export default function SearchableCharacterList<TFilterKeys extends string>({
  filterChecks = {} as any, onSearch,
  noBaseFilterChecks, noBaseSearch, cardProps,
  ...props
}: Props<TFilterKeys>) {
  const { query, filters } = useParams();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(new Array<Character>());
  const FavoriteStore = useFavorite('characters');
  const DataStore = useDataStore();

  const [internalCardProps, setInteralCardProps] = useState<Pick<Props<TFilterKeys>, 'cardProps'>['cardProps']>({});

  return <SearchableList items={DataStore.Characters}
    placeholder="Search characters..."
    sort={(a, b) => FavoriteStore.isFavorite(a) === FavoriteStore.isFavorite(b) ? 0 : FavoriteStore.isFavorite(a) ? -1 : 1}
    renderItem={character => {
      const open = useContextMenu(item => [
        item('option', 'View', () => navigate(`/characters/${character.name}`), '👁️'),
        item('option', FavoriteStore.isFavorite(character) ? 'Unfavorite' : 'Favorite', () => FavoriteStore.isFavorite(character) ? FavoriteStore.remove(character) : FavoriteStore.add(character), '⭐'),
        item('option', 'Hide', () => setHidden([...hidden, character]), '🙈'),
      ]);

      return hidden.includes(character) ? null : (
        <CharacterPopover characterName={character.name} showDelay={500}>
          <div className="context-menu-item-container" onContextMenu={open}>
            {FavoriteStore.isFavorite(character) && <FavoriteStar model={character} />}
            <CharacterCard character={character} {...internalCardProps} {...cardProps} />
          </div>
        </CharacterPopover>
      );
    }}

    search={query}
    filters={filters ? JSON.parse(filters) : {}}
    onSearchOrFilterChange={(search, filters) => {
      setHidden([]);
      navigate(`?query=${search}&filters=${JSON.stringify(filters)}`);
    }}
    onSearch={noBaseSearch ? onSearch ?? (() => true) : (query, item) => item.name.toLowerCase().includes(query.toLowerCase()) && (onSearch?.(query, item) ?? true)}
    onFilterChange={filter => {
      const updatedInternalFilter = Object.entries(filter).reduce((acc, [key, value]) => {
        switch (key) {
          case 'passiveTalents': return { ...acc, showPassiveTalent: Object.keys(value ?? {}).length > 0 };
          case 'hasSignatureWeapon': return { ...acc, showSignatureWeapon: value as boolean };
          default: return acc;
        }
      }, {} as Partial<CharacterCardProps>);

      setInteralCardProps(props => ({ ...props, ...updatedInternalFilter }));
    }}
    filterChecks={noBaseFilterChecks ? filterChecks : {
      ...getCharacterFilterChecks(DataStore),
      ...filterChecks
    }}
    sortChecks={getCharacterSortChecks()}
    {...props}
  />;
}
