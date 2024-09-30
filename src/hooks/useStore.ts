import { DebugLog } from "@/common/functions/dev";
import { BaseStore } from "@/stores/BaseStore";
import { useEffect, useState } from "react";

const debugLog_useStoreEvent = DebugLog(DebugLog.DEBUGS.useStoreEvent);
const debugLog_useStoreProperty = DebugLog(DebugLog.DEBUGS.useStoreProperty);

export function useStoreEvent<
  TEventKey extends string,
  TEventsMap extends Record<TEventKey, any[]>,
  TStore extends BaseStore<TEventsMap>
>(store: TStore, event: TEventKey, callback: (...args: TEventsMap[TEventKey]) => any) {
  useEffect(() => {
    const _callback = (...args: TEventsMap[TEventKey]) => {
      debugLog_useStoreEvent(`[${event}]: [${args.join(', ')}]`, { event, args })
      const result = callback(...args);
      debugLog_useStoreEvent(`[${event}] [result]`, result);
    }
    store.on(event, _callback);
    debugLog_useStoreEvent(`[${store.name}] [${event}] event Added`);
    return () => {
      store.off(event, _callback);
      debugLog_useStoreEvent(`[${store.name}] [${event}] event Removed`)
    }
  }, []);
}

export function useStoreProperty<
  TStore extends BaseStore<Record<'update', any[]> & {[key: string]: any[]}>,
  TProperty extends any
>(store: TStore, property: (store: TStore) => TProperty) {
  const [state, setState] = useState(property(store));

  useEffect(() => {
    const callback = () => {
      debugLog_useStoreProperty(`${store.name} updated`, { store });
      setState(property(store));
    }
    store.on('update', callback);
    debugLog_useStoreProperty(`${store.name} update event added`);
    return () => { 
      store.off('update', callback); 
      debugLog_useStoreProperty(`${store.name} update event removed`);
    }
  }, []);

  debugLog_useStoreProperty('Update', state, { store, state });

  return state;
}