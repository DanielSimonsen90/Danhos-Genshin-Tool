import MemoizeService from "@/services/MemoizeService";
import StoreBuilder from "../StoreBuilder";

export default function <T extends Record<string, (...args: any[]) => any>>(
  cacheKeys: T,
) {
  const memoService = new MemoizeService();

  return new StoreBuilder()
    .addApi(() => {
      return {
        memoize: <T>(
          getKeys: (keys: typeof cacheKeys) => string,
          initializer: () => T,
          ...dependencies: unknown[]
        ) => {
          const key = getKeys(cacheKeys);
          return memoService.memoize(initializer, key, ...dependencies);
        },
        clearCache: (getKeys?: (keys: typeof cacheKeys) => string) => {
          if (!getKeys) return memoService.clear();

          const key = getKeys(cacheKeys);
          memoService.clearByPrefix(key);
        }
      };
    });
}