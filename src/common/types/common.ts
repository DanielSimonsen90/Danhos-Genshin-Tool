export type Nullable<T> = T | null;
export type Percentage<T extends number | string> = `${T}%`;
export type Percentable<T extends number | string> = T | Percentage<T>;
export type Functionable<T> = T | (() => T);
export type Arrayable<T> = T | T[];

/**
 * Situation: Model = Character | Artifact | Domain
 * Type must include generic type T, which is the Model type
 * Type must also include generic type TProps, which is the properties of the Model type. Selected properties of TProps must extract the types of Model whose properties has been selected.
 * 
 * Example:
 * type Model = Character | Artifact | Domain
 * Properties<Model, 'name' | 'rarity'>
 * 
 * Result: Character | Artifact, because only Character and Artifact have 'name' and 'rarity' properties
 */
export type ModelWithProps<T, TProps extends (keyof T | string)> = T extends Record<TProps, any> ? T : never;
