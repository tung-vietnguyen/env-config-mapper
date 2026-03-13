import { EnvMap, MappingRules, MappingResult } from './types';

export function buildMappings(envMap: EnvMap, rules: MappingRules = {}): MappingResult {
  const spaceIdPrefix = (rules.spaceIdPrefix || 'SPACEID_').toLowerCase();
  const mapPrefix = (rules.mapPrefix || 'MAP_').toLowerCase();
  const wapMapPrefix = (rules.wapMapPrefix || 'WAP_MAP_').toLowerCase();

  const floorToSpaceId: Record<string, string> = {};
  const sectionToWapIds: Record<string, string[]> = {};
  const sectionLists: Record<string, string[]> = {};

  for (const key of Object.keys(envMap)) {
    const lk = key.toLowerCase();
    if (lk.startsWith(spaceIdPrefix)) {
      const floorKey = key.slice(spaceIdPrefix.length).toUpperCase();
      const vals = envMap[key];
      if (vals && vals.length > 0) floorToSpaceId[floorKey] = vals[0];
    }
    if (lk.startsWith(mapPrefix)) {
      const floorKey = key.slice(mapPrefix.length).toUpperCase();
      const sections = envMap[key] || [];
      sectionLists[floorKey] = sections;
    }
    if (lk.startsWith(wapMapPrefix)) {
      const sectionKey = key.slice(wapMapPrefix.length).toUpperCase();
      const waps = envMap[key] || [];
      sectionToWapIds[sectionKey] = waps;
    }
  }

  return { floorToSpaceId, sectionToWapIds, sectionLists };
}
