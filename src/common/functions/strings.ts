export function addSpacesToCamelCase<T extends string>(value: T): T {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2') as T;
}

export function snakeCaseFromCamelCase<T extends string>(value: T): T {
  const result = value.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  return result.startsWith('_') ? result.slice(1) as T : result as T;
}

export function pascalCaseFromSnakeCase<T extends string>(value: T): T {
  return value.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join('') as T;
}