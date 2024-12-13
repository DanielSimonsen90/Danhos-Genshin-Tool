export function generateId(onlyStrings = false) {
  return !onlyStrings ? Math.random().toString(36).substring(2, 15) : Math.random().toString(36).substring(2, 15).replace(/[0-9]/g, '');
}