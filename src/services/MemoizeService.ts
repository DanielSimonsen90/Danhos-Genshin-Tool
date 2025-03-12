/**
 * MemoizeService
 */

export default class MemoizeService {
  private cache = new Map<string, any>();

  public memoize<T>(fn: () => T, dependencies: Array<any>): T {
    const key = JSON.stringify(dependencies);
    if (!this.cache.has(key)) this.cache.set(key, fn());
    return this.cache.get(key);
  }
}