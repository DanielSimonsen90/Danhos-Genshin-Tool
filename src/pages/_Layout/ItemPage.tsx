import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useDataStore } from "@/stores";
import { ItemHeader } from "@/components/domain/Item";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

type Props<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'ArtifactSets' | 'Domains'>
> = {
  itemKeys: DataKey;
  Card: React.FC<{ item: DataStore[DataKey][number]; }>;
};

export default function ItemPage<
  DataKey extends keyof Pick<DataStore, 'Characters' | 'ArtifactSets' | 'Domains'>
>({ itemKeys, Card }: Props<DataKey>) {
  const itemKey = itemKeys.slice(0, -1) as string;
  const { [`${itemKey.toLowerCase()}Name`]: name } = useParams();
  const DataStore = useDataStore();
  const item = useMemo(() => (
    itemKey === 'ArtifactSets'
      ? DataStore.findArtifactByName
      : DataStore[`find${itemKey}ByName` as 'findCharacterByName' | 'findDomainByName']
  )(name), [DataStore, name]);

  if (!item) {
    return (
      <main>
        <h1>Unable to find {name}.</h1>
        <Link to={`/${itemKey.toLowerCase()}s`}>Back to {itemKey}s</Link>
      </main>
    );
  }

  return (
    <>
      <ItemHeader item={item} itemName={itemKey.toLowerCase()} />
      <main>
        <Card item={item} />
      </main>
    </>
  );
}