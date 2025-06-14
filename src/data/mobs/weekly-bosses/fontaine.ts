import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Midlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DenialAndJudgement, FadingCandle, LightlessEyeOfTheMaelstorm, LightlessMass, LightlessSilkString, SilkenFeather } from "@/data/materials/drops/fontaine";
import { DreamSolvent } from "@/data/materials/drops/general";

export const Narwhal = new WeeklyBoss(
  "All-Devouring Narwhal, Shadow of Another World",
  `The behemoth that once devoured the birthing waters of the planet has departed without a single trace, but those in the know will forever live, surely, in the terrifying shadow of that omen of the end. A single shard of shattered spacetime remains in this place, and through it, you may perhaps be able to witness that titanic creature once more.`,
  'Fontaine',
  [
    LightlessSilkString,
    LightlessEyeOfTheMaelstorm,
    LightlessMass,
    ...ElementalCrystals.Hydro,
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Adventurer,
    TheExile,
    ...Midlander,
  ]
);

export const Arlecchino = new WeeklyBoss(
  "The Knave, Scattered Ruins",
  `This courtyard was once a wonder to behold, but now lies desolate. The previous battle has been buried like the dying light, but the next duel shall come, as long as the "Family" endures...`,
  'Fontaine',
  [
    FadingCandle,
    SilkenFeather,
    DenialAndJudgement,
    ...ElementalCrystals.Pyro,
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Adventurer,
    TheExile,
    ...Midlander,
  ]
);

export const Fontaine = {
  Narwhal,
  Arlecchino,
};
export default Fontaine;