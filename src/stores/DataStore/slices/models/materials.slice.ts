import StoreBuilder from "@/stores/StoreBuilder";
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";
import * as MaterialDropsData from '@/data/materials/drops';
import { ElementalCrystals } from '@/data/materials/drops/crystals';
import Billets from '@/data/materials/drops/billets';
import * as MaterialLocalSpecialtiesData from '@/data/materials/local-specialties';
import * as MaterialTalentData from '@/data/materials/talents';
import * as WeaponTalentData from '@/data/materials/weapon-materials';

const MaterialsData = Object.assign({},
  Object.assign({},
    MaterialTalentData,
    WeaponTalentData,
    MaterialLocalSpecialtiesData,
  ),
  Object.assign({},
    MaterialDropsData,
    ElementalCrystals,
    Billets,
  )
);

export default new StoreBuilder()
  .addState({
    MaterialsData,
    Materials: List.from(MaterialsData),
    MaterialNames: List.from(MaterialsData).map(material => material.name),
  })
  .addApi(({ get }) => {
    return {
      findMaterialByName(name: string, suppressWarning = false) {
        return findByName(get().Materials, name, suppressWarning);
      }
    };
  });