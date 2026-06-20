import CraftableMaterial from "@/common/models/materials/CraftableMaterial";

export const findByName = <T extends { name: string; }>(arr: T[], name: string, suppressWarning = false): T | undefined => {
  const normalizedName = name.toLowerCase();

  // Direct name match first (most common case)
  let result = arr.find(item => item.name.toLowerCase() === normalizedName)
    // Check materials that can be crafted (less common)
    ?? arr.find(item =>
      CraftableMaterial.isCraftableMaterial(item) &&
      item.getCraftingTreeAsMaterials().some(m => m.name.toLowerCase() === normalizedName)
    );

  if (result) return result;

  if (!suppressWarning) console.warn(`Item with name "${name}" not found in array.`, arr);
  return undefined;
};

export const sortByRarityDesc = <T extends { rarity: number; }>(items: T[]): T[] => items.sort((a, b) => b.rarity - a.rarity);
