import StoreBuilder from "@/stores/StoreBuilder";
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";
import * as WeeklyBossesData from '@/data/mobs/weekly-bosses';
import * as WorldBossesData from '@/data/mobs/world-bosses';
import * as EliteMobsData from '@/data/mobs/elite';
import * as EasyMobsData from '@/data/mobs/easy';

const BossMobsData = Object.assign({},
  WeeklyBossesData,
  WorldBossesData,
);
const MobsData = Object.assign({},
  BossMobsData,
  EliteMobsData,
  EasyMobsData
);

export default new StoreBuilder()
  .addState({
    MobsData,
    Mobs: List.from(MobsData),
    MobNames: List.from(MobsData).map(mob => mob.name),
  })
  .addApi(({ get }) => {
    return {
      findMobByName(name: string, suppressWarning = false) {
        return findByName(get().Mobs, name, suppressWarning);
      }
    };
  });