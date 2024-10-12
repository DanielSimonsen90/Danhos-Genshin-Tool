type Comparator<T> = (a: T, b: T) => number;

export class List<T> extends Array<T> {
  public static from<T>(iterable: Iterable<T>): List<T>;
  public static from<T>(rec: Record<any, T>): List<T>;
  public static from<T>(iterable: Iterable<T> | Record<any, T>): List<T> {
    return new List<T>(...Object.values(iterable));
  }
  
  public orderBy(...comparators: Comparator<T>[]): T[] {
    return this.sort((a, b) => {
      for (const comparator of comparators) {
        const result = comparator(a, b);
        if (result !== 0) return result;
      }
      return 0; // If all comparisons are equal
    });
  }

  // #region Force Array methods to return List
  public map<U>(callback: (value: T, index: number, array: T[]) => U): List<U> {
    return List.from(super.map(callback));
  }
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