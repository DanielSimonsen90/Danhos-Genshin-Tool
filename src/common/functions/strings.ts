export function addSpacesToCamelCase(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function snakeCaseFromCamelCase(value: string): string {
  const result = value.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  return result.startsWith('_') ? result.slice(1) : result;
}

export function pascalCaseFromSnakeCase(value: string): string {
  return value.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join('');
}