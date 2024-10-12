export type Nullable<T> = T | null;
export type Percentage<T extends number | string> = `${T}%`;
export type Percentable<T extends number | string> = T | Percentage<T>;
export type Functionable<T> = T | (() => T);
export type Arrayable<T> = T | T[];