export interface ParseOptions {
  prefix?: string; // e.g. 'REACT_APP_'
  separator?: string; // csv separator, default ','
  keyTransform?: (rawKey: string) => string; // convert env key to logical key
}

export type EnvRaw = Record<string, string | undefined>;

export type EnvMap = Record<string, string[]>;

export interface MappingRules {
  spaceIdPrefix?: string; // e.g. 'REACT_APP_SPACEID_'
  mapPrefix?: string; // e.g. 'REACT_APP_MAP_'
  wapMapPrefix?: string; // e.g. 'REACT_APP_WAP_MAP_'
}

export interface MappingResult {
  floorToSpaceId: Record<string, string>;
  sectionToWapIds: Record<string, string[]>;
  sectionLists: Record<string, string[]>; // sections per floor
}

export interface ValidationResult {
  valid: boolean;
  missing?: string[];
  duplicates?: string[];
}
