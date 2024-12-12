export function generateId(onlyStrings = false) {
  return !onlyStrings ? Math.random().toString(36).substring(2, 15) : Math.random().toString(36).substring(2, 15).replace(/[0-9]/g, '');
}

export function generateRandomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}