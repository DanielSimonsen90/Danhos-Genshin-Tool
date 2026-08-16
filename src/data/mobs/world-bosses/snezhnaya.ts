import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { UnscorchedBlossomBranch, SeveredTailOfTheSkyRoamer } from '@/data/materials/drops/snezhnaya';

export const ImmortalConstruct = new WorldBoss(
  `Immortal Construct`,
  `A mere byproduct, manufactured solely to bring a certain selfish plan to fruition.\nWith its purpose as a biological vessel long since lost, the subject endures as a feral, mindless entity wandering outer wilds.`,
  'Snezhnaya',
  [
    UnscorchedBlossomBranch,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Instructor, Berserker, PrayersOfIllumination, Adventurer
  ]
);

export const ChimericWingedLion = new WorldBoss(
  `Chimeric Winged Lion`,
  `A byproduct engineered along the path to manifesting a certain grand ambition.\nYet, perhaps due to the anomalous materials fused into its shell, the entity commands a terrifying power unmatched by any ordinary man-made monster.`,
  'Snezhnaya',
  [
    SeveredTailOfTheSkyRoamer,
    ...ElementalCrystals.Anemo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker, Instructor, LuckyDog
  ]
);