# env-config-mapper

Small TypeScript utilities to parse structured environment variables (e.g., `REACT_APP_*`) into typed maps and build simple mapping helpers (CSV/JSON parsing, WAP → space/section mappings).

Quick example

```ts
import { parseEnv, buildMappings } from 'env-config-mapper';

const env = process.env;
const em = parseEnv(env, { prefix: 'REACT_APP_' });
const mappings = buildMappings(em, { spaceIdPrefix: 'SPACEID_', mapPrefix: 'MAP_', wapMapPrefix: 'WAP_MAP_' });
```

See tests for usage examples.
