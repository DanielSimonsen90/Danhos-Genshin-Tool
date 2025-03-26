import { Element, Rarity } from "@/common/types";
import MobDrop from "@/common/models/materials/MobDrop";

export const ElementalCrystalMap: Record<Element, string> = {
  Anemo: 'Vayuda Turquoise',
  Cryo: 'Shivada Jade',
  Geo: 'Prithiva Topaz',
  Electro: 'Vajrada Amethyst',
  Dendro: 'Nagadus Emerald',
  Hydro: 'Varunada Lazurite',
  Pyro: 'Agnidus Agate',
}

export const CrystalChunks = [
  'Silver',
  'Fragment',
  'Chunk',
  'Gemstone',
] as const;

export default (function defineElementalCrystals() {
  Object.keys(ElementalCrystalMap).reduce((acc, element) => {
    const chunks = Object.values(CrystalChunks).reduce((acc, chunk) => {
      acc[chunk] = new MobDrop(
        `${ElementalCrystalMap[element as keyof typeof ElementalCrystalMap]} ${chunk}`,
        `Elemental crystal for ${element}.`,
        undefined,
        CrystalChunks.indexOf(chunk) + 1 as Rarity,
        undefined, // TODO
      );
      return acc;
    }, {} as Record<typeof CrystalChunks[number], MobDrop>);

    acc[element as Element] = chunks;
    return acc;
  }, {} as Record<Element, Record<typeof CrystalChunks[number], MobDrop>>);
})();