export type OrderByComparator<T> = (a: T, b: T) => number;

export class List<T> extends Array<T> {
  public static from<T>(iterable: Iterable<T>): List<T>;
  public static from<T>(rec: Record<any, T>): List<T>;
  public static from<K, V>(map: Map<K, V>): List<[K, V]>;
  public static from<T, U>(iterable: Iterable<T> | Record<any, T>) {
    if (iterable instanceof Map) return new List<[T, U]>(...Array.from(iterable.entries()));
    return new List<T>(...Object.values(iterable));
  }
  
  /**
   * Order the list by multiple comparators in sequence
   * @param comparators Comparators to order by in sequence
   * @returns Same list ordered by the given comparators
   */
  public orderBy(...comparators: OrderByComparator<T>[]): List<T> {
    return this.sort((a, b) => {
      for (const comparator of comparators) {
        const result = comparator(a, b);
        if (result !== 0) return result;
      }
      return 0; // If all comparisons are equal
    });
  }

  public groupBy<K>(keyGetter: (item: T) => K): Map<K, List<T>> {
    return this.reduce((map, item) => {
      const key = keyGetter(item);
      const group = map.get(key) ?? new List<T>();
      
      group.push(item);
      map.set(key, group);
      return map;
    }, new Map<K, List<T>>());
  }

  /**
   * Filter the list to only unique values
   * @returns New unique list
   */
  public unique(): List<T> {
    return List.from([...new Set(this)]);
  }

  /**
   * Map the list and return only unique mapped values
   * @param callback Mapper
   * @returns New list with unique mapped values
   */
  public mapUnique<U>(callback?: (value: T, index: number, array: T[]) => U): List<U> {
    const seen = new Set<U>();
    const results: U[] = [];
    this.forEach((value, index, array) => {
      const result = callback?.(value, index, array);
      if (result !== undefined && !seen.has(result)) {
        seen.add(result);
        results.push(result);
      }
    });
    return List.from(results);
  }

  public toArray(): T[] {
    return Array.from(this);
  }
  
  // #region Force Array methods to return List
  public map<U>(callback: (value: T, index: number, array: T[]) => U): List<U> {
    return List.from(super.map(callback));
  }
  public mapToArray<U>(callback: (value: T, index: number, array: T[]) => U): U[] {
    return super.map(callback)
  }

  public filter<U extends T>(callback: (value: T, index: number, array: T[]) => value is U): List<U>;
  public filter(callback: (value: T, index: number, array: T[]) => unknown): List<T>;
  public filter(callback: (value: T, index: number, array: T[]) => unknown): List<T> {
    return List.from(super.filter(callback));
  }
  public sort(compareFn?: (a: T, b: T) => number): this {
    return List.from(super.sort(compareFn)) as this;
  }
  public flatten<R extends T extends Array<infer U> ? U : T>(depth?: number): List<R> {
    const result = new List<R>();

    for (let i = 0; i < (depth ?? 1); i++) {
      const item = this[0];
      if (!item) continue;
      if (item instanceof Array) result.push(...item);
    }

    while (result.some(item => item instanceof Array)) {
      for (let i = 0; i < result.length; i++) {
        if (result[i] instanceof Array) {
          result.splice(i, 1, ...(result[i] as []));
        }
      }
    }

    return List.from<R>(result as R[])
  }
  concat(...items: (T | ConcatArray<T>)[]): List<T> {
    return List.from(super.concat(...items));
  }
  // #endregion
}