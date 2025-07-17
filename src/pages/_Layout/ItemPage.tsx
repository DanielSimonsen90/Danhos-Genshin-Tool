import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useDataStore } from "@/stores";
import { ItemHeader } from "@/components/domain/Item";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";
import { ROUTES } from "@/common/constants/routes";

type DataKeys = keyof Pick<
  DataStore,
  'Characters' | 'Artifacts' | 'Domains' | 'Mobs' | 'Materials' | 'Weapons'
>;
type DataKeysSingular = DataKeys extends `${infer T}s` ? T : never;

type Props<DataKey extends DataKeys> = {
  itemKeys: DataKey;
  Card: React.FC<{ item: DataStore[DataKey][number]; }>;
};

export default function ItemPage<DataKey extends DataKeys>({ itemKeys, Card }: Props<DataKey>) {
  const itemKey = itemKeys.slice(0, -1) as DataKeysSingular;
  const { [`${itemKey.toLowerCase()}Name`]: name } = useParams();
  const DataStore = useDataStore();
  const item = useMemo(() => DataStore[`find${itemKey}ByName`](name), [DataStore, name]);

  if (!item) {
    console.warn(`Item not found: ${name}`, DataStore[`${itemKey}s`]);
    return (
      <main>
        <h1>Unable to find {name}.</h1>
        <Link to={`/${ROUTES.data}/${itemKey.toLowerCase()}s`}>Back to {itemKey}s</Link>
      </main>
    );
  }

  return (
    <>
      <ItemHeader item={item} itemName={itemKey.toLowerCase()} />
      <main>
        <Card item={item as DataStore[DataKey][number]} />
      </main>
    </>
  );
}