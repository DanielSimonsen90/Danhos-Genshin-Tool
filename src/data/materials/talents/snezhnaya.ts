import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Charity = TalentAscensionMaterial.create(
  'Charity',
  `Charity is the salvation of the frozen realm.\nIt is the love and vigilant care shared among mortals. Across this vast and boundless land, it is the warmth by which the people withstand the biting frost, soothing the deep-seated scars etched into their memories.`,
  'Snezhnaya',
  MasteryDomains.RelicsOfTheFallenGrace,
  'Monday/Thursday',
);

export const Fortitude = TalentAscensionMaterial.create(
  'Fortitude',
  `Fortitude is the defining character of the frozen realm.\nIt breeds the prosperity of life itself. The people here have never bowed to the biting cold, just as a fragile seed defiantly chooses to bloom amidst the blizzards. This civilization has witnessed centuries of bitter winter, yet remains vibrant much like the Frostfairy Flower that flourishes season after season.`,
  'Snezhnaya',
  MasteryDomains.RelicsOfTheFallenGrace,
  'Tuesday/Friday',
);

export const Glory = TalentAscensionMaterial.create(
  'Glory',
  `Glory is the sacred faith of the frozen realm.\nIt is the undying flame upon the beacon hearth, bound now to live or die with the frozen realm. The flame ignites a noble passion, and to sustain its eternal burn, the people would gladly offer up their all.`,
  'Snezhnaya',
  MasteryDomains.RelicsOfTheFallenGrace,
  'Wednesday/Saturday',
);
