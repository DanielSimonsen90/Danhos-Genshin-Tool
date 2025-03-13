import { WeeklyBoss } from "@/common/models/mobs/Boss";

export const ScaramoucheBalladeer = new WeeklyBoss(
  "The Balladeer, Joururi Workshop",
  `The secret workshop hidden in the forest cavern revealed its entrance upon being struck with immense force. The seeds of "surpassing" are sprouting within, and are about to burst forth from the earth...`,
  'Sumeru',
);

export const Apep = new WeeklyBoss(
  "Apep, The Realm of Beginnings",
  `The Dragon of Verdure once drew up a dreamlike blueprint of life for its people, until the grass turned into sand and the apocalypse came. Then, dreams had to be burned to fuel life. At the end of those "crossroads", their proud forms had been mutilated. In contrast, the new masters of Teyvat who stepped into this land were so beautiful and dazzling...`,
  'Sumeru',
);

export const Sumeru = {
  ScaramoucheBalladeer,
  Apep,
};
export default Sumeru;