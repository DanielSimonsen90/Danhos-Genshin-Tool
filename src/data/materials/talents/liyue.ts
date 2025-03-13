import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Prosperity = TalentAscensionMaterial.create(
  'Prosperity',
  `Prosperity is the people's pursuit in the land of Geo. Prosperity is Liyue's past, present, and future. This prosperity is unmatched and unobtainable by any other nations - it all belongs to Liyue and its inhabitants.`,
  'Liyue',
  MasteryDomains.TaishanMansion,
  'Monday/Thursday',
);

export const Diligence = TalentAscensionMaterial.create(
  'Diligence',
  `Industriousness is the foundation of the land of Geo. Industriousness is believing in one's own ability to earn a place in the land of the gods through sweat, wisdom and power.`,
  'Liyue',
  MasteryDomains.TaishanMansion,
  'Tuesday/Friday',
);

export const Gold = TalentAscensionMaterial.create(
  'Gold',
  `Gold is the symbol of the land of Geo. Gold is the wealth of Liyue, but Liyue's true wealth is the hearts of its people that shine like gold.`,
  'Liyue',
  MasteryDomains.TaishanMansion,
  'Wednesday/Saturday',
);

export const Liyue = {
  Prosperity,
  Diligence,
  Gold,
}
export default Liyue;