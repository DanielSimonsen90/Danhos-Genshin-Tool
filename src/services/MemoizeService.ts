/**
 * MemoizeService
 */

export default class MemoizeService {
  private cache = new Map<string, any>();

  private getKey(dependencies: Array<any>): string {
    return JSON.stringify(dependencies);
  }

  public memoize<T>(fn: () => T, dependencies: Array<any>): T {
    const key = this.getKey(dependencies);
    if (!this.cache.has(key)) this.cache.set(key, fn());
    return this.cache.get(key);
  }

  public unmemoize(dependencies: Array<any>): void {
    const key = this.getKey(dependencies);
    this.cache.delete(key);
  }
  
  public clear(): void {
    this.cache.clear();
  }
}