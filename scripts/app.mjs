// Start / restart / stop aplikacji BeanShop (Windows, macOS, Linux).
// Uzycie: npm run app        -> restart z czystymi danymi (dziala w tle)
//         npm run app:stop   -> zatrzymanie
import { spawn } from 'node:child_process';
import { existsSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pidFile = path.join(root, '.beanshop.pid');
const logFile = path.join(root, 'beanshop.log');
const port = Number(process.env.PORT ?? 3000);
const url = `http://localhost:${port}`;

async function healthy() {
  try { return (await fetch(`${url}/api/health`)).ok; } catch { return false; }
}

function stop() {
  if (!existsSync(pidFile)) return false;
  const pid = Number(readFileSync(pidFile, 'utf8'));
  try {
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' });
    else process.kill(-pid, 'SIGTERM');
  } catch { /* proces juz nie istnieje */ }
  rmSync(pidFile, { force: true });
  return true;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (process.argv[2] === 'stop') {
  console.log(stop() ? 'BeanShop zatrzymany.' : 'BeanShop nie był uruchomiony przez npm run app.');
  process.exit(0);
}

stop();
for (let i = 0; i < 10 && (await healthy()); i++) await sleep(300);
if (await healthy()) {
  console.error(`Port ${port} jest zajęty przez inny proces. Zamknij go albo ustaw inny port: PORT=3100 npm run app`);
  process.exit(1);
}

const out = openSync(logFile, 'w');
const child = spawn(process.execPath, [path.join(root, 'node_modules', 'tsx', 'dist', 'cli.mjs'), 'src/server.ts'], {
  cwd: root,
  env: { ...process.env, ENABLE_TEST_API: '1', PORT: String(port) },
  detached: true,
  stdio: ['ignore', out, out],
  windowsHide: true,
});
writeFileSync(pidFile, String(child.pid));
child.unref();

for (let i = 0; i < 40; i++) {
  if (await healthy()) {
    console.log(`BeanShop działa: ${url}  (dane startowe, log: beanshop.log, stop: npm run app:stop)`);
    process.exit(0);
  }
  await sleep(250);
}
console.error('Aplikacja nie wystartowała. Zobacz beanshop.log');
process.exit(1);
