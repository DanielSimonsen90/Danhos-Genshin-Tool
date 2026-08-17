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

export const getDefaultUnsortedTier = <T>(itemsInTier: Array<T>, tiersLength: number) => ({
  id: 'unsorted',
  title: 'Unsorted',
  color: 'var(--background-secondary)',
  entries: itemsInTier.map(generateEntry),
  invert: false,
  position: tiersLength
});

export function getDefaultTiers<T>(items: Array<T>) {
  const tiers = (
    ['S', 'A', 'B', 'C', 'D', 'F']
      .map(generateBlankTier(items))
      .map((data, i) => ({ ...data, entries: [], color: getHslColor(i), position: i }) as Tier<T>)
  );

  tiers.push(getDefaultUnsortedTier(items, tiers.length));

  return tiers;
}

export function generateEntry<T>(item: T) {
  return {
    item,
    id: generateId()
  } as Entry<T>;
}

export function moveSelectedEntries<T>(tiers: Array<Tier<T>>, selectedIds: Set<string>, overId: string) {
  const selectedEntries = tiers
    .slice()
    .sort((a, b) => a.position - b.position)
    .flatMap(tier => tier.entries)
    .filter(entry => selectedIds.has(entry.id));
  if (!selectedEntries.length) return tiers;

  const destinationTier = tiers.find(tier => tier.id === overId)
    ?? tiers.find(tier => tier.entries.some(entry => entry.id === overId));
  if (!destinationTier) return tiers;

  const strippedTiers = tiers.map(tier => ({ ...tier, entries: tier.entries.filter(entry => !selectedIds.has(entry.id)) }));
  const strippedDestination = strippedTiers.find(tier => tier.id === destinationTier.id)!;
  const targetIndex = strippedDestination.entries.findIndex(entry => entry.id === overId);

  const destinationEntries = [...strippedDestination.entries];
  destinationEntries.splice(targetIndex === -1 ? destinationEntries.length : targetIndex, 0, ...selectedEntries);

  return strippedTiers.map(tier => tier.id === destinationTier.id ? { ...tier, entries: destinationEntries } : tier);
}