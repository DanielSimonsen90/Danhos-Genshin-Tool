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

export default {
  pick,
  exclude,
}