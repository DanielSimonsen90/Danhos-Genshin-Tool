import { useMemo } from "react";
import { SearchableCharacterList, SearchableDomainList, SearchableMobList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useMaterialRelationData } from "./useMaterialRelationData";
import { Character, Domain, Mob, ModelKeys, Weapon } from "@/common/models";

export function useMaterialRelationDataContent<TModelKey extends ModelKeys>(model: TModelKey, materialName: string) {
  const data = useMaterialRelationData(model, materialName);
  return useMemo(() => {
    if (!data?.length) return undefined;

    switch (model) {
      case 'Character': return <SearchableCharacterList items={data as Array<Character>} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      case 'Mob': return <SearchableMobList items={data as Array<Mob>} cardProps={{ wrapInLink: true, nameTag: 'h3', showRegion: true }} />;
      case 'Domain': return <SearchableDomainList items={data as Array<Domain<any>>} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      case 'Weapon': return <SearchableWeaponList items={data as Array<Weapon>} cardProps={{ wrapInLink: true, nameTag: 'h3', showStats: true }} />;
      default: return <div className="no-data">No data available</div>;
    }
  }, [model, data]);
}
