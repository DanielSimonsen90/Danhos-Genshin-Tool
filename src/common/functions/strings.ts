import { Rarity } from "../types";
import { SearchFormData } from "../types/store-data";
import { DebugLog } from "./dev";

const debugLog = DebugLog(DebugLog.DEBUGS.strings);

export function addSpacesToCamelCase<T extends string>(value: T): T {
  const result = value.replace(/([a-z])([A-Z])/g, '$1 $2') as T;
  debugLog(`[addSpacesToCamelCase] ${value} -> ${result}`);
  return result as T;
}

export function snakeCaseFromCamelCase<T extends string>(value: T): T {
  const transform = value.replace(/ [A-Za-z]/g, (match) => `_${match}`).replace(/ /g, '').toLowerCase();
  const noUnderscoreAfterDash = transform.replace(/-_/g, '-') as T;
  const result = noUnderscoreAfterDash as T;
  debugLog(`[snakeCaseFromCamelCase] ${value} -> ${result}`);
  return result;
}

export function snakeCaseFromPascalCase<T extends string>(value: T): T {
  const words = value.split(' ').map(word => word.substring(0, 1).toUpperCase() + word.substring(1)).join(' ') as T;
  return snakeCaseFromCamelCase(words.replace(/-/g, ' ')) as T;
}

export function pascalCaseFromSnakeCase<T extends string>(value: T): T {
  const result = value.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ') as T;
  const returned = result.replace(/- /g, '-') as T;
  debugLog(`[pascalCaseFromSnakeCase] ${value} -> ${returned}`);
  return returned as T;
}

export function pascalCaseFromCamelCase<T extends string>(value: T): T {
  const result = value.replace(/([A-Z])/g, (match) => ` ${match}`);
  debugLog(`[pascalCaseFromCamelCase] ${value} -> ${result}`);
  return (result[0].toUpperCase() + result.slice(1)) as T;
}

export function pascalCaseFromKebabCase<T extends string>(value: T): T {
  const result = value.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ') as T;
  debugLog(`[pascalCaseFromKebabCase] ${value} -> ${result}`);
  return result;
}

export function formatSearchData(value: SearchFormData, withSet = false) {
  const { artifactSetName, artifactPartName, mainStat, subStats } = value;
  const stats = `${mainStat} & ${subStats.join(', ')}`;
  const result = withSet
    ? `${artifactSetName} ${artifactPartName} - ${stats}`
    : stats;

  debugLog(`[formatSearchData] ${value} -> ${result}`, { value, withSet });
  return result;
}

export function classNames(...args: string[]) {
  return args.filter(Boolean).join(' ') || undefined
}

export function fromList(list: string[] = []) {
  // Join list with commas and 'and' before the last item
  return list.length > 1
    ? list.slice(0, -1).join(', ') + ' & ' + list.slice(-1)
    : list[0];
}

export function effectivenessString(effectiveness: number, reverse = false) {
  const strings = ['Unknown', 'Least Effective', 'Less Effective', 'Effective', 'Very Effective', 'Most Effective'];
  return reverse ? strings.reverse()[effectiveness] : strings[effectiveness];
}

export function rarityString(rarity: Rarity) {
  const strings = ['Unknown', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  return strings[rarity];
}