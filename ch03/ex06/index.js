export function substring(str, indexStart, indexEnd) {
  return str.substring(indexStart, indexEnd);
}

export function slice(str, indexStart, indexEnd) {
  return str.slice(indexStart, indexEnd);
}

export function padStart(str, targetLength, padString) {
  return str.padStart(targetLength, padString);
}

export function trim(str) {
  return str.trim();
}
