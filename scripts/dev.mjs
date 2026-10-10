import { spawn } from "node:child_process";
import net from "node:net";
import process from "node:process";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

function isPortOpen(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

const processes = [];

function cleanup() {
  for (const p of processes) {
    try {
      p.kill();
    } catch {}
  }
  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

async function start() {
  const dbRunning = await isPortOpen(5432);
  if (!dbRunning) {
    console.log("PostgreSQL not detected on port 5432, starting local embedded postgres...");
    const db = spawn(npmCmd, ["run", "db:local"], {
      cwd: "./backend",
      stdio: "inherit",
      shell: true,
    });
    processes.push(db);

    let retries = 30;
    while (retries-- > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      if (await isPortOpen(5432)) {
        console.log("PostgreSQL ready!");
        break;
      }
    }
  }

  console.log("Starting backend and frontend dev servers...\n");

  const backend = spawn(npmCmd, ["run", "dev"], {
    cwd: "./backend",
    stdio: "inherit",
    shell: true,
  });
  processes.push(backend);

  const frontend = spawn(npmCmd, ["run", "dev"], {
    cwd: "./frontend",
    stdio: "inherit",
    shell: true,
  });
  processes.push(frontend);

  backend.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Backend process exited with code ${code}`);
    }
  });

  frontend.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Frontend process exited with code ${code}`);
    }
  });
}

start();
