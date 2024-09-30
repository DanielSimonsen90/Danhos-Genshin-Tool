import { DEBUGS } from "../constants/dev";

const canLog = (title: string) => {
  if (title in DEBUGS) return DEBUGS[title as keyof typeof DEBUGS];
  console.warn(`DEBUG_LOG: ${title} not found in debugs`);
  return true;
};

export const DebugLog = (prefix: string) => (...data: any[]) =>
  canLog(prefix) ?
    data[0] === 'group' ? 
      console.groupCollapsed(prefix, ...data.slice(1))
      : data[0] === 'groupEnd' ? console.groupEnd()
      : console.log(`[${prefix}]`, ...data)
    : null;
DebugLog.DEBUGS = Object.keys(DEBUGS).reduce((acc, key) => ({ ...acc, [key]: key }), {}) as Record<keyof typeof DEBUGS, string>;