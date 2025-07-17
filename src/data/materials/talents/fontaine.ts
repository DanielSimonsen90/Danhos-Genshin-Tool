import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Equity = TalentAscensionMaterial.create(
  'Equity',
  `The shore of Nation of Water is equity. Equity sets boundaries on rights. Without equity, the rights granted by law will be abused, and become a tool to damage out virtuous customs.`,
  'Fontaine',
  MasteryDomains.PaleForgottenGlory,
  'Monday/Thursday',
);

export const Justice = TalentAscensionMaterial.create(
  'Justice',
  `The sword of the Nation of Water is justice. The law of Fontaine walks with the sword of justice in hand. Without the guidance of justice, all law is reduced to meaningless words, to be tampered with and slaughtered at a whim.`,
  'Fontaine',
  MasteryDomains.PaleForgottenGlory,
  'Tuesday/Friday',
);

export const Order = TalentAscensionMaterial.create(
  'Order',
  `The shield of the Nation of Water is order. All law in Fontaine ultimately serves to maintain a stable order. Without order, there is chaos, and there can be no fairness in chaos.`,
  'Fontaine',
  MasteryDomains.PaleForgottenGlory,
  'Wednesday/Saturday',
);