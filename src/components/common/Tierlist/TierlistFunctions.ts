import { generateId } from "@/common/functions/random";
import { Tier } from "./TierlistTypes";

export const getHslColor = (index: number) => `hsl(${index * 15}, 50%, 50%)`;

export function generateBlankTier<T>(items: Array<any>) {
  return (title?: string) => ({
    id: generateId(),
    invert: false,
    title,
    color: getHslColor(items.length - 1),
    items: [],
    position: items.length
  } as Tier<T>);
}

export function getDefaultTiers<T>(items: Array<T>) {
  return () => {
    const tiers = (
      ['S', 'A', 'B', 'C', 'D', 'F']
        .map(generateBlankTier(items))
        .map((data, i) => ({ ...data, items: [], color: getHslColor(i), position: i }) as Tier<T>)
    );

    tiers.push({
      id: 'unsorted', 
      title: 'Unsorted',
      color: 'var(--background-secondary)',
      items: items.map(item => ({ item, id: generateId() })),
      invert: false,
      position: tiers.length
    });

    return tiers;
  };
}