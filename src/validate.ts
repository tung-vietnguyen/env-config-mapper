import { MappingResult, ValidationResult } from './types';

export function validateMappings(m: MappingResult): ValidationResult {
  const missing: string[] = [];
  const duplicates: string[] = [];

  // example checks: each section listed should have wap mapping
  for (const floor of Object.keys(m.sectionLists)) {
    const sections = m.sectionLists[floor] || [];
    for (const s of sections) {
      if (!m.sectionToWapIds[s]) missing.push(s);
    }
  }

  // duplicate wap ids across sections (naive)
  const seen: Record<string, string[]> = {};
  for (const [section, waps] of Object.entries(m.sectionToWapIds)) {
    for (const w of waps) {
      seen[w] = seen[w] || [];
      seen[w].push(section);
    }
  }
  for (const [wap, secs] of Object.entries(seen)) {
    if (secs.length > 1) duplicates.push(wap);
  }

  return { valid: missing.length === 0 && duplicates.length === 0, missing: missing.length ? missing : undefined, duplicates: duplicates.length ? duplicates : undefined };
}
