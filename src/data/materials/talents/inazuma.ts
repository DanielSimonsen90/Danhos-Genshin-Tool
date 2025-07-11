import { TalentAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import * as MasteryDomains from "@/data/domains/domain-of-mastery";

export const Transience = TalentAscensionMaterial.create(
  'Transience',
  `Transience is the dream of the nation of thunder. Fleeting glories are the highest expression of mortal beauty, for are we mortals not like the flashing lightning itself? Like a lovely dream or blossoming spark, we shall leave a gorgeous mark on the eternal night sky.`,
  'Inazuma',
  MasteryDomains.VioletCourt,
  'Monday/Thursday',
);

export const Elegance = TalentAscensionMaterial.create(
  'Elegance',
  `Elegance is the form of the nation of thunder. Elegance brooks no flattery, and the elegant are ever notble. They are like the sea eagles who soar on high contend with the resounding storms. They will not cater to philistine vulgarity, as one would not cast a flower crown into the mud, staining its dignity.`,
  'Inazuma',
  MasteryDomains.VioletCourt,
  'Tuesday/Friday',
);

export const Light = TalentAscensionMaterial.create(
  'Light',
  `Light is the yearning of the land of thunder. The ruler who claims to have perceived all forever aims to hoard celestial glory. But this vision that cannot be shared only leads people to long for it more fiercely, like moths diving into the flame.`,
  'Inazuma',
  MasteryDomains.VioletCourt,
  'Wednesday/Saturday',
);