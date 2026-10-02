// Kontrola stanowiska przed szkoleniem: npm run sprawdz
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

globalThis.__req = createRequire(import.meta.url);

const results = [];
const check = (name, fn, hint) => {
  try { const v = fn(); results.push([v === false ? 'BRAK' : 'OK', name, v === false ? hint : (v ?? '')]); }
  catch { results.push(['BRAK', name, hint]); }
};
const run = (cmd) => execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();

check('Node.js >= 20', () => (Number(process.versions.node.split('.')[0]) >= 20 ? process.versions.node : false), 'zainstaluj Node.js LTS z nodejs.org');
check('Git', () => run('git --version'), 'zainstaluj Git z git-scm.com');
check('Zależności (npm ci)', () => (existsSync('node_modules/tsx') && 'zainstalowane') || false, 'uruchom: npm ci');
check('Przeglądarka Playwright', () => {
  const { chromium } = require_('playwright-core');
  return (existsSync(chromium.executablePath()) && 'zainstalowana') || false;
}, 'uruchom: npx playwright install chromium');
check('Dostęp do GitHuba', () => (run('git ls-remote --heads origin main').length > 0 && 'repo dostępne') || false, 'sprawdź logowanie do GitHuba (git push / Git Credential Manager)');

function require_(m) { return globalThis.__req(m); }

console.log('\nStanowisko BeanShop\n');
for (const [s, n, d] of results) console.log(`  [${s.padEnd(4)}] ${n.padEnd(26)} ${d}`);
const missing = results.filter((r) => r[0] !== 'OK').length;
console.log(missing ? `\n${missing} do poprawienia.\n` : '\nWszystko gotowe. Start aplikacji: npm run app\n');
process.exit(missing ? 1 : 0);
