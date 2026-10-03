import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfIllumination, PrayersOfSpringtime, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { UnscorchedBlossomBranch, SeveredTailOfTheSkyRoamer, VagabondsCrackedArmor } from '@/data/materials/drops/snezhnaya';

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

export const GuardianBladeOfDriftingSnow = new WorldBoss(
  `Guardian Blade of Drifting Snow`,
  `An ancient Snegovik held in high esteem among her kin.\nAfter the current Snegurochka princess ascended to power, she left the clan's manor in the mountains - perhaps because their ideals no longer aligned.`,
  'Snezhnaya',
  [
    VagabondsCrackedArmor,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker, TheExile, PrayersOfSpringtime, LuckyDog,
  ]
);