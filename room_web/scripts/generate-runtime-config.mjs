import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = resolve(projectRoot, '.env');
const outputFile = resolve(projectRoot, 'src/app/core/config/runtime-config.generated.ts');

if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const DEFAULT_ROOMS_API_URL = 'api/rooms.json';
const TEST_ENVIRONMENTS = ['dev', 'qa', 'sit', 'uat'];

const testPageEnabled = ['true', '1', 'on', 'yes'].includes(
  (process.env.ENABLE_TEST_PAGE ?? '').trim().toLowerCase(),
);

const roomsApiUrls = Object.fromEntries(
  TEST_ENVIRONMENTS.map((env) => [
    env,
    process.env[`TEST_PAGE_ROOMS_API_URL_${env.toUpperCase()}`]?.trim() || DEFAULT_ROOMS_API_URL,
  ]),
);

const config = { testPageEnabled, roomsApiUrls };

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(
  outputFile,
  `import { RuntimeConfig } from './runtime-config.model';\n\nexport const RUNTIME_CONFIG: RuntimeConfig = ${JSON.stringify(config, null, 2)};\n`,
);

console.log(`[runtime-config] test page ${testPageEnabled ? 'ENABLED' : 'DISABLED'} -> ${outputFile}`);
