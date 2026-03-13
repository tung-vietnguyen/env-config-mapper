import { ParseOptions } from './types';

export function csvToArray(value?: string, separator = ','): string[] {
  if (!value) return [];
  return value
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}

export const defaultKeyTransform = (raw: string) => raw.toLowerCase();

export function normalizePrefix(prefix?: string) {
  if (!prefix) return '';
  return prefix;
}
