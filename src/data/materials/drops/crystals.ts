import { Element, Rarity } from "@/common/types";
import MobDrop, { ElementalCrystal } from "@/common/models/materials/MobDrop";

export const ElementalCrystalMap: Record<Element, string> = {
  Anemo: 'Vayuda Turquoise',
  Cryo: 'Shivada Jade',
  Geo: 'Prithiva Topaz',
  Electro: 'Vajrada Amethyst',
  Dendro: 'Nagadus Emerald',
  Hydro: 'Varunada Lazurite',
  Pyro: 'Agnidus Agate',
};

export const CrystalChunks = [
  'Sliver',
  'Fragment',
  'Chunk',
  'Gemstone',
] as const;

export type ElementalCrystals = Record<
  Element,
  ElementalCrystal
> & {
  [Symbol.iterator]: () => IterableIterator<ElementalCrystal>;
};

export type ElementalCrystalGroup<TElement extends Element> = ElementalCrystals[TElement];

export const ElementalCrystals = (function defineElementalCrystals() {
  const crystals = Object.keys(ElementalCrystalMap).reduce((acc, element) => {
    acc[element as Element] = ElementalCrystal.create(
      ElementalCrystalMap[element as keyof typeof ElementalCrystalMap],
      {
        [Rarity.Uncommon]: 'Sliver',
        [Rarity.Rare]: 'Fragment',
        [Rarity.Epic]: 'Chunk',
        [Rarity.Legendary]: 'Gemstone',
      },
      {
        [Rarity.Uncommon]: `${element} elemental crystal`,
        [Rarity.Rare]: `${element} elemental crystal`,
        [Rarity.Epic]: `${element} elemental crystal`,
        [Rarity.Legendary]: `${element} elemental crystal`,
      },
      { prependName: true }
    );;
    return acc;
  }, {} as ElementalCrystals);


  crystals[Symbol.iterator] = function* () {
    for (const element of Object.keys(crystals)) {
      yield* crystals[element as Element].getCraftingTreeAsMaterials();
    }
  };

  return crystals;
})();

export default ElementalCrystals;