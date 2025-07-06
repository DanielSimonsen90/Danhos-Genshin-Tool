import { useMemo } from "react";
import { SearchableCharacterList, SearchableMobList } from "@/components/common/SearchableList";
import { useMaterialRelationData } from "./useMaterialRelationData";
import { ModelKeys } from "@/common/models";

export function useMaterialRelationDataContent<TModelKey extends ModelKeys>(model: TModelKey, materialName: string) {
  const data = useMaterialRelationData(model, materialName);
  return useMemo(() => {
    if (!data || data.length === 0) return undefined

    switch (model) {
      case 'Character': return <SearchableCharacterList items={data as any} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      case 'Mob': return <SearchableMobList items={data as any} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      default: return <div className="no-data">No data available</div>;
    }
  }, [model, data]);
}
