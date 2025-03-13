import { WeeklyBoss } from "@/common/models/mobs/Boss";

export const Narwhal = new WeeklyBoss(
  "All-Devouring Narwhal, Shadow of Another World",
  `The behemoth that once devoured the birthing waters of the planet has departed without a single trace, but those in the know will forever live, surely, in the terrifying shadow of that omen of the end. A single shard of shattered spacetime remains in this place, and through it, you may perhaps be able to witness that titanic creature once more.`,
  'Fontaine',
);

export const Arlecchino = new WeeklyBoss(
  "The Knave, Scattered Ruins",
  `This courtyard was once a wonder to behold, but now lies desolate. The previous battle has been buried like the dying light, but the next duel shall come, as long as the "Family" endures...`,
  'Fontaine',
);

export const Fontaine = {
  Narwhal,
  Arlecchino,
};
export default Fontaine;