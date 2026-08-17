import { Mob, EasyMob, EliteMob, Boss, WorldBoss, WeeklyBoss } from "@/common/models";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";
import { Regions } from "@/data/regions";

export type MobFilterKeys = 'type' | 'region';

export function getMobFilterChecks(): FilterObject<MobFilterKeys, Mob> {
  return {
    type: {
      easy: EasyMob.isEasyMob,
      elite: EliteMob.isEliteMob,
      boss: Boss.isBoss,
      worldBoss: WorldBoss.isWorldBoss,
      weeklyBoss: WeeklyBoss.isWeeklyBoss,
    },
    region: {
      mondstadt: mob => Boss.isBoss(mob) && mob.region === "Mondstadt",
      liyue: mob => Boss.isBoss(mob) && mob.region === "Liyue",
      inazuma: mob => Boss.isBoss(mob) && mob.region === "Inazuma",
      sumeru: mob => Boss.isBoss(mob) && mob.region === "Sumeru",
      fontaine: mob => Boss.isBoss(mob) && mob.region === "Fontaine",
      natlan: mob => Boss.isBoss(mob) && mob.region === "Natlan",
      nodKrai: mob => Boss.isBoss(mob) && mob.region === "Nod-Krai",
      snezhnaya: mob => Boss.isBoss(mob) && mob.region === "Snezhnaya",
      unknown: mob => Boss.isBoss(mob) && mob.region === "Unknown",
    },
  };
}

export function getMobSortChecks(): SortObject<Mob> {
  return {
    name: (a, b) => a.name.localeCompare(b.name),
    difficulty: (a, b) => {
      const difficultyOrder = ['Easy', 'Elite', 'Boss', 'World Boss', 'Weekly Boss'];
      const getDifficulty = (mob: Mob) => {
        if (EasyMob.isEasyMob(mob)) return 'Easy';
        if (EliteMob.isEliteMob(mob)) return 'Elite';
        if (Boss.isBoss(mob)) return 'Boss';
        if (WorldBoss.isWorldBoss(mob)) return 'World Boss';
        if (WeeklyBoss.isWeeklyBoss(mob)) return 'Weekly Boss';
        return 'Unknown';
      };

      const difficultyA = getDifficulty(a);
      const difficultyB = getDifficulty(b);
      return difficultyOrder.indexOf(difficultyA) - difficultyOrder.indexOf(difficultyB);
    },
    region: (a, b) => {
      const regionAIndex = Regions.findIndex(region => region === (Boss.isBoss(a) ? a.region : 'Unknown'));
      const regionBIndex = Regions.findIndex(region => region === (Boss.isBoss(b) ? b.region : 'Unknown'));
      return regionAIndex - regionBIndex;
    },
  };
};