import { useMemo } from 'react';
import SearchableList, { Props as SearchableListProps, RenderItemOrChildren, UncrontrolledProps } from '../../SearchableList';
import { Entry } from '../TierlistTypes';
import { Props as TierProps } from './Tier';

type Props<TItem, TFilterKeys extends string> = (
  & Pick<TierProps<TItem>, 'tier' | 'unsorted'>

  & Omit<SearchableListProps<Entry<TItem>>, 'items'>
  & RenderItemOrChildren<Entry<TItem>>
) & Pick<UncrontrolledProps<Entry<TItem>, TFilterKeys>, 'onSearch'>;

export const UnsortedSearchList = <TItem, TFilterKeys extends string>({ tier, unsorted, ...searchableListProps }: Props<TItem, TFilterKeys>) => {
  const render = useMemo(() => (
    'renderItem' in searchableListProps ? searchableListProps.renderItem
    : 'children' in searchableListProps ? searchableListProps.children
    : undefined
  ), [searchableListProps]);

  return tier !== unsorted
    ? <>{tier.items.map((entry, index, items) => render(entry, index, items))}</>
    : <SearchableList items={tier.items} {...searchableListProps} />;
};