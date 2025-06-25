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
  'Sliver',
  'Fragment',
  'Chunk',
  'Gemstone',
] as const;

export type ElementalCrystals = Record<
  Element,
  Record<typeof CrystalChunks[number], MobDrop> & {
    [Symbol.iterator]: () => IterableIterator<MobDrop>;
  }
>

export type ElementalCrystal<TElement extends Element> = ElementalCrystals[TElement];

export const ElementalCrystals = (function defineElementalCrystals() {
  const crystals = Object.keys(ElementalCrystalMap).reduce((acc, element) => {
    const chunks = Object.values(CrystalChunks).reduce((acc, chunk) => {
      acc[chunk] = new MobDrop(
        `${ElementalCrystalMap[element as keyof typeof ElementalCrystalMap]} ${chunk}`,
        `Elemental crystal for ${element}.`,
        undefined,
        CrystalChunks.indexOf(chunk) + 1 as Rarity,
      );
      return acc;
    }, {} as ElementalCrystals[Element]);

    chunks[Symbol.iterator] = function* () {
      for (const chunk of CrystalChunks) {
        yield this[chunk]
      }
    };

    acc[element as Element] = chunks;
    return acc;
  }, {} as ElementalCrystals);

  return crystals;
})();

export default ElementalCrystals;