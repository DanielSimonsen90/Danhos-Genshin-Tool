import { classNames } from "@/common/functions/strings";
import { ArtifactSet, Character } from "@/common/models";
import { Domain } from "@/common/models/Domain";
import { List } from "@/common/models/List";
import SearchableList from "@/components/common/SearchableList";
import { useDataStore } from "@/stores";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

type Props<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'ArtifactSets' | 'Domains'>
> = {
  data: DataKey;
  Card: React.FC<{ item: DataStore[DataKey][number] }>;
  itemKey: string;
}

export default function ItemsPage<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'ArtifactSets' | 'Domains'>
>({ data, Card, itemKey }: Props<DataKey>) {
  const { [data]: items } = useDataStore();

  return (
    <SearchableList
      items={items as List<Character & ArtifactSet & Domain<any>>} renderItem={item => <Card key={item.name} item={item} />}
      onSearch={(query, item) => item.name.toLowerCase().includes(query.toLowerCase())}
      className={classNames('items-list', `${itemKey}-list`)} 
      liClassName={classNames('items-list-item', `${itemKey}-list-item`)}
    />
  );
}