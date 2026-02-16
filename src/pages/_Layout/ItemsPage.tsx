import { classNames } from "@/common/functions/strings";
import { ArtifactSet, Character } from "@/common/models";
import { Domain } from "@/common/models/domains/Domain";
import { List } from "@/common/models/List";
import SearchableList from "@/components/domain/SearchableList";
import { FilterProps } from "@/components/domain/SearchableList/Props";
import { DataStoreState, useDataStore } from "@/stores";


type Props<
  DataKey extends keyof Pick<DataStoreState, 'Characters' | 'Artifacts' | 'Domains'>,
  FilterKeys extends string
> = FilterProps<DataStoreState[DataKey][number], FilterKeys> & {
  itemsKey: DataKey;
  Card: React.FC<{ item: DataStoreState[DataKey][number] }>;
}

export default function ItemsPage<
  DataKey extends keyof Pick<DataStoreState, 'Characters' | 'Artifacts' | 'Domains'>,
  FilterKeys extends string
>({ Card, itemsKey, filterChecks }: Props<DataKey, FilterKeys>) {
  const { [itemsKey]: items } = useDataStore();

  return (
    <SearchableList filterChecks={filterChecks} 
      items={items as List<Character & ArtifactSet & Domain>} renderItem={item => <Card key={item.name} item={item} />}
      onSearch={(query, item) => item.name.toLowerCase().includes(query.toLowerCase())}
      className={classNames('items-list', `${itemsKey.toLowerCase()}-list`)} 
      liClassName={classNames('items-list-item', `${itemsKey.toLowerCase()}-list-item`)}
    />
  );
}