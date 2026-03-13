import { EnvRaw, EnvMap, ParseOptions } from './types';
import { csvToArray, defaultKeyTransform } from './helpers';

export function parseEnv(env: EnvRaw, options: ParseOptions = {}): EnvMap {
  const prefix = options.prefix ?? 'REACT_APP_';
  const separator = options.separator ?? ',';
  const keyTransform = options.keyTransform ?? defaultKeyTransform;

  const result: EnvMap = {};

  for (const rawKey of Object.keys(env)) {
    if (!rawKey.startsWith(prefix)) continue;
    const rawValue = env[rawKey];
    const logicalKey = keyTransform(rawKey.slice(prefix.length));
    if (rawValue == null) {
      result[logicalKey] = [];
      continue;
    }
    // Heuristic: treat JSON arrays specially, otherwise CSV
    const trimmed = rawValue.trim();
    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          result[logicalKey] = parsed.map((v) => String(v));
          continue;
        }
        result[logicalKey] = [String(parsed)];
        continue;
      } catch (e) {
        // fall back to CSV
      }
    }

    result[logicalKey] = csvToArray(rawValue, separator);
  }

  return result;
}
