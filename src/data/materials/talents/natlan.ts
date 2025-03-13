import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Contention = TalentAscensionMaterial.create(
  'Contention',
  '', // TODO
  'Natlan',
  MasteryDomains.BlazingRuins,
  'Monday/Thursday',
);

export const Kindling = TalentAscensionMaterial.create(
  'Kindling',
  `Offering up kindling is the established rule of the Nation of Pyro. For something gained, something must be given. If you wish to obtain something, you must first pay the corresponding price, just like the offerings that should be made as kindling in the process of incineration.`,
  'Natlan',
  MasteryDomains.BlazingRuins,
  'Tuesday/Friday',
);

export const Conflict = TalentAscensionMaterial.create(
  'Conflict',
  `Conflict is considered reason in the Nation of Pyro. Conflicts can always be resolved by greater powers. This fact means that they can always be managed, as opposed to developing into something uncontrollable. Conflict is also a kind of limitation preventing people from endless shirking of responsibilities without weighing the costs. It demands that participants settle their scores decisively and efficiently.`,
  'Natlan',
  MasteryDomains.BlazingRuins,
  'Wednesday/Saturday',
);

export const Natlan = {
  Contention,
  Kindling,
  Conflict,
};
export default Natlan;