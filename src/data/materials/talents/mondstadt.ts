import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Freedom = TalentAscensionMaterial.create(
  'Freedom',
  `Freedom is the spirit of the land of the wind. The freedom to live is one of such. It is the freedom to live freely and healthiluy without concerns of one's own safety.`,
  'Mondstadt',
  MasteryDomains.ForsakenRift,
  'Monday/Thursday',
);

export const Resistance = TalentAscensionMaterial.create(
  'Resistance',
  `Resistance is the backbone of the land of the wind. The history of Mondstadt is one of resistances. People rose up to allow the future Mondstadt's poetry to freely be that of the wind nd be spread across the land.`,
  'Mondstadt',
  MasteryDomains.ForsakenRift,
  'Tuesday/Friday',
);

export const Ballad = TalentAscensionMaterial.create(
  'Ballad',
  `Ballad is the heart of the land of the wind. The bards of Mondstadt have sung songs of ballads since ancient times. The songs of ballads are the songs of the wind and the songs of the land.`,
  'Mondstadt',
  MasteryDomains.ForsakenRift,
  'Wednesday/Saturday',
);

export const Mondstadt = {
  Freedom,
  Resistance,
  Ballad,
}
export default Mondstadt;