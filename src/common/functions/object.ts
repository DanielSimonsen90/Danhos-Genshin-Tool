import { Functionable } from "../types";

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

export function exclude<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key as K)) (acc as any)[key] = obj[key as keyof T];
    return acc;
  }, {} as Omit<T, K>);
}

export function is<A, B>(a: A, b: B) {
  return JSON.stringify(a) === JSON.stringify(b)
}
export function isDifferent<A, B>(a: A, b: B) {
  return !is(a, b);
}

export function keysOf<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function resolveFunctionable<TReturned, TArgs extends any[]>(
  input: Functionable<TReturned, TArgs>,
  args: TArgs
): TReturned {
  return typeof input === 'function' ? (input as Function)(...args) as TReturned : input;
}

export default {
  pick, exclude,
  is, isDifferent,
  keysOf,
  resolveFunctionable,
}