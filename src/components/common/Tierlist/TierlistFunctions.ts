import { generateId } from "@/common/functions/random";
import { Entry, Tier } from "./TierlistTypes";

export const getHslColor = (index: number) => `hsl(${index * 15}, 50%, 50%)`;

export function generateBlankTier<T>(items: Array<any>) {
  return (title?: string) => ({
    id: generateId(),
    invert: false,
    title,
    color: getHslColor(items.length - 1),
    entries: [],
    position: items.length
  } as Tier<T>);
}

export function getDefaultTiers<T>(items: Array<T>) {
  const tiers = (
    ['S', 'A', 'B', 'C', 'D', 'F']
      .map(generateBlankTier(items))
      .map((data, i) => ({ ...data, entries: [], color: getHslColor(i), position: i }) as Tier<T>)
  );

  tiers.push({
    id: 'unsorted',
    title: 'Unsorted',
    color: 'var(--background-secondary)',
    entries: items.map(generateEntry),
    invert: false,
    position: tiers.length
  });

  return tiers;
}

export function generateEntry<T>(item: T) {
  return {
    item,
    id: generateId()
  } as Entry<T>;
}