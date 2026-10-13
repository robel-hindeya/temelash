import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import net from 'node:net';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import EmbeddedPostgres from 'embedded-postgres';

const isWindows = process.platform === 'win32';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

function isPortOpen(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

let pgInstance = null;
let shuttingDown = false;

async function cleanup() {
  if (shuttingDown) return;
  shuttingDown = true;
  if (pgInstance) {
    try {
      console.log('\nStopping local PostgreSQL...');
      await pgInstance.stop();
      console.log('PostgreSQL stopped.');
    } catch {}
  }
}

process.on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

async function main() {
  const port = Number(process.env.PGPORT ?? 5432);
  const dbRunning = await isPortOpen(port);

  if (!dbRunning) {
    console.log(`PostgreSQL not detected on port ${port}. Starting embedded PostgreSQL...`);
    const databaseDir = join(dirname(fileURLToPath(import.meta.url)), '..', '.pgdata');
    const fresh = !existsSync(join(databaseDir, 'PG_VERSION'));

    pgInstance = new EmbeddedPostgres({
      databaseDir,
      user: 'temelash',
      password: 'change_me',
      port,
      persistent: true,
      initdbFlags: ['--encoding=UTF8', '--locale=C'],
      postgresFlags: ['-c', 'timezone=UTC', '-c', 'log_timezone=UTC'],
    });

    if (fresh) await pgInstance.initialise();
    await pgInstance.start();
    if (fresh) {
      await pgInstance.createDatabase('temelashcard');
      await pgInstance.createDatabase('temelashcard_test');
    }
    console.log(`PostgreSQL ready on localhost:${port}\n`);
  } else {
    console.log(`PostgreSQL is already running on port ${port}.\n`);
  }

  const nest = spawn(npxCmd, ['nest', 'start', '--watch'], {
    stdio: 'inherit',
    shell: true,
  });

  nest.on('exit', async (code) => {
    await cleanup();
    process.exit(code ?? 0);
  });
}

main().catch(async (err) => {
  console.error('Failed to start development server:', err);
  await cleanup();
  process.exit(1);
});
