import { classNames } from "@/common/functions/strings";
import { ArtifactSet, Character } from "@/common/models";
import { Domain } from "@/common/models/domains/Domain";
import { List } from "@/common/models/List";
import SearchableList from "@/components/common/SearchableList";
import { useDataStore } from "@/stores";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

type Props<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'Artifacts' | 'Domains'>
> = {
  itemsKey: DataKey;
  Card: React.FC<{ item: DataStore[DataKey][number] }>;
}

export default function ItemsPage<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'Artifacts' | 'Domains'>
>({ Card, itemsKey }: Props<DataKey>) {
  const { [itemsKey]: items } = useDataStore();

  return (
    <SearchableList
      items={items as List<Character & ArtifactSet & Domain<any>>} renderItem={item => <Card key={item.name} item={item} />}
      onSearch={(query, item) => item.name.toLowerCase().includes(query.toLowerCase())}
      className={classNames('items-list', `${itemsKey.toLowerCase()}-list`)} 
      liClassName={classNames('items-list-item', `${itemsKey.toLowerCase()}-list-item`)}
    />
  );
}