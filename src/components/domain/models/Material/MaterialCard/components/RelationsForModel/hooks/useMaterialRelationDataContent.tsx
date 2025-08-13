import { useMemo } from "react";
import { SearchableCharacterList, SearchableDomainList, SearchableMobList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useMaterialMultiModelRelations } from "./useMaterialRelationData";
import { Character, Domain, Mob, ModelKeys, Weapon, ModelData } from "@/common/models";

export function useMaterialRelationDataContent<TModelKey extends ModelKeys>(
  model: TModelKey, 
  materialName: string, 
  preloadedModels?: ModelData<TModelKey>
) {
  const [relations] = useMaterialMultiModelRelations(
    materialName, 
    preloadedModels ? [] : [model]
  );  
  const items = preloadedModels ?? relations;
  
  return useMemo(() => {
    if (!items?.length) return undefined;

    switch (model) {
      case 'Character': return <SearchableCharacterList items={items as Array<Character>} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      case 'Mob': return <SearchableMobList items={items as Array<Mob>} cardProps={{ wrapInLink: true, nameTag: 'h3', showRegion: true }} />;
      case 'Domain': return <SearchableDomainList items={items as Array<Domain<any>>} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      case 'Weapon': return <SearchableWeaponList items={items as Array<Weapon>} cardProps={{ wrapInLink: true, nameTag: 'h3' }} />;
      default: return <div className="no-data">No data available</div>;
    }
  }, [model, items]);
}
