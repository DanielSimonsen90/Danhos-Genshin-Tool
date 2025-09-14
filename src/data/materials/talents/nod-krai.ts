import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Moonlight = TalentAscensionMaterial.create(
  `Moonlight`,
  `"Moonlight" is the blessing of the land beneath the moon.\nThings come in all sizes, and people come in all states of wisdom. Yet under the moonlight, all are equal.`,
  'Nod-Krai',
  MasteryDomains.LightlessCapital,
  'Monday/Thursday',
);

export const Elysium = TalentAscensionMaterial.create(
  `Elysium`,
  `"Elysium" is the dream of the land beneath the moon.\nThere are those who are desperate to get in, and those who are desperate to get out. Perhaps Elysium is not a place one can ever truly reach.`,
  'Nod-Krai',
  MasteryDomains.LightlessCapital,
  'Tuesday/Friday',
);

export const Vagrancy = TalentAscensionMaterial.create(
  `Vagrancy`,
  `"Vagrancy" is the living of the land beneath the moon.\nEnjoy a moment's respite, then depart before the sky turns black. Dawn is not the end, but the beginning of another journey.`,
  'Nod-Krai',
  MasteryDomains.LightlessCapital,
  'Wednesday/Saturday',
);