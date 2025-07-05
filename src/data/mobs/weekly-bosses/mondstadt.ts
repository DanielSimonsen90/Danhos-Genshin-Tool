import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Berserker, GladiatorsFinale, Instructor, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Northlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DreamSolvent } from "@/data/materials/drops/general";
import { 
  TailOfBoreas, RingOfBoreas, SpiritLocketOfBoreas,
  DvalinsPlume, DvalinsClaw, DvalinsSigh,
  ChessGameKnight, ChessGameRook, ChessGameQueen
} from "@/data/materials/drops/mondstadt";

export const Boreas = new WeeklyBoss(
  "Lupus Boreas, Dominator of Wolves",
  `A noble soul that watches over Wolvendom. When the safety of the wolves is threatened, it will take the form of a wolf and bare its fangs and claws. It is said that its powers were given to it by an ancient god.`,
  'Mondstadt',
  [
    TailOfBoreas, RingOfBoreas, SpiritLocketOfBoreas,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Geo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    ...Northlander
  ]
);

export const StormTerror = new WeeklyBoss(
  "Dvalin, Stormterror",
  `The towering but broken spire tells of its tragic story silently. Its chambers and halls are filled with memories and longing, as well as howling winds.`,
  'Mondstadt',
  [
    DvalinsPlume, DvalinsClaw, DvalinsSigh,
    ...ElementalCrystals.Anemo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    ...Northlander
  ]
);

export const ChessGame = new WeeklyBoss(
  "Unresolved Chess Game",
  `If you wish to earn the mages' approval, you must face up to the riddle at hand.`,
  'Mondstadt',
  [
    ChessGameKnight, ChessGameRook, ChessGameQueen,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Northlander
  ]
)