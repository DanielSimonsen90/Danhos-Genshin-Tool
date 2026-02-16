import StoreBuilder from "@/stores/StoreBuilder";
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";
import * as WeaponsData from '@/data/weapons';

export default new StoreBuilder()
  .addState({
    WeaponsData,
    Weapons: List.from(WeaponsData),
    WeaponNames: List.from(WeaponsData).map(weapon => weapon.name),
  })
  .addApi(({ get }) => {
    return {
      findWeaponByName(name: string, suppressWarning = false) {
        return findByName(get().Weapons, name, suppressWarning);
      }
    };
  });