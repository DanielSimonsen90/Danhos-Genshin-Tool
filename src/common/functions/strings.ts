import { SearchFormData } from "../types/store-data";
import { DebugLog } from "./dev";

const debugLog = DebugLog(DebugLog.DEBUGS.strings);

export function addSpacesToCamelCase<T extends string>(value: T): T {
  const result = value.replace(/([a-z])([A-Z])/g, '$1 $2') as T;
  debugLog(`[addSpacesToCamelCase] ${value} -> ${result}`);
  return result as T;
}

export function snakeCaseFromCamelCase<T extends string>(value: T): T {
  value = value.includes(' ') ? value.replace(/ /g, '') as T : value;

  const result = value.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  const returned = result.startsWith('_') ? result.slice(1) as T : result as T;
  debugLog(`[snakeCaseFromCamelCase] ${value} -> ${returned}`);
  return returned;
}

export function pascalCaseFromSnakeCase<T extends string>(value: T): T {
  const result = value.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ') as T;
  debugLog(`[pascalCaseFromSnakeCase] ${value} -> ${result}`);
  return result as T;
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