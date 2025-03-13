import { WeeklyBoss } from "@/common/models/mobs/Boss";
export const Azhdaha = new WeeklyBoss(
  "Azhdaha, Beneath the Dragon-Queller",
  `Across the long years, this bed of rock, carved into the very heart of the world, has imprisoned Azhdaha like a coffin.`,
  'Liyue',
);

export const Childe = new WeeklyBoss(
  "Childe, Enter the Golden House",
  `The storm clouds gathering over Liyue have finally parted, and the schemes that once gripped this land have been shattered by the combined efforts of the Qixing, the adepti, and yourself. Still, the memories of your duel with Childe of the Fatui in the depths of the Golden House remain fresh in your mind. Relive this duel, and you may yet learn something new...`,
  'Liyue',
);

export const Liyue = {
  Azhdaha,
  Childe,
};
export default Liyue;