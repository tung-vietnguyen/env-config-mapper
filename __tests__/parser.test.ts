import { parseEnv } from '../src/parser';
import { buildMappings } from '../src/mapping';
import { validateMappings } from '../src/validate';

describe('env-config-mapper basic flow', () => {
  const env = {
    REACT_APP_SPACEID_F1: 'space-123',
    REACT_APP_MAP_F1: 'A1,A2,A3',
    REACT_APP_WAP_MAP_A1: 'wap-1, wap-2',
    REACT_APP_WAP_MAP_A2: '["wap-3","wap-4"]'
  } as Record<string, string>;

  test('parseEnv returns mapped arrays', () => {
    const em = parseEnv(env, { prefix: 'REACT_APP_' });
    expect(em['spaceid_f1']).toEqual(['space-123']);
    expect(em['map_f1']).toEqual(['A1', 'A2', 'A3']);
    expect(em['wap_map_a1']).toEqual(['wap-1', 'wap-2']);
    expect(em['wap_map_a2']).toEqual(['wap-3', 'wap-4']);
  });

  test('buildMappings and validateMappings', () => {
    const em = parseEnv(env, { prefix: 'REACT_APP_' });
    const mappings = buildMappings(em, { spaceIdPrefix: 'SPACEID_', mapPrefix: 'MAP_', wapMapPrefix: 'WAP_MAP_' });
    expect(mappings.floorToSpaceId['F1']).toBe('space-123');
    expect(mappings.sectionLists['F1']).toEqual(['A1', 'A2', 'A3']);
    expect(mappings.sectionToWapIds['A1']).toEqual(['wap-1', 'wap-2']);

    const v = validateMappings(mappings);
    // A3 is listed but has no wap mapping, so validation should report missing
    expect(v.valid).toBe(false);
    expect(v.missing).toContain('A3');
  });
});
