import { WeeklyBoss } from "@/common/models/mobs/Boss";

export const Boreas = new WeeklyBoss(
  "Lupus Boreas, Dominator of Wolves",
  `A noble soul that watches over Wolvendom. When the safety of the wolves is threatened, it will take the form of a wolf and bare its fangs and claws. It is said that its powers were given to it by an ancient god.`,
  'Mondstadt',
);

export const StormTerror = new WeeklyBoss(
  "Dvalin, Stormterror",
  `The towering but broken spire tells of its tragic story silently. Its chambers and halls are filled with memories and longing, as well as howling winds.`,
  'Mondstadt',
);

export const Mondstadt = {
  Boreas,
  StormTerror,
};
export default Mondstadt;