import { WeeklyBoss } from "@/common/models/mobs/Boss";

export const Signora = new WeeklyBoss(
  "Signora, Narukami Island: Tenshukaku",
  `This is the dwelling of the Raiden Shogun, who rules over Inazuma. It is also the perfect place for a "duel before the throne".`,
  'Inazuma',
);

export const RaidenShogun = new WeeklyBoss(
  "Raiden Shogun, End of the Oneiric Euthymia",
  `Countless dreams once blew about here like petals in the wind, never to be fulfilled. This is the origin of Eternity, and it is also "her" end.`,
  'Inazuma',
);

export const Inazuma = {
  Signora,
  RaidenShogun,
};
export default Inazuma;