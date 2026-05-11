import net from "node:net";

const [host = "localhost", port = "5432", timeoutMs = "30000"] = process.argv.slice(2);
const deadline = Date.now() + Number(timeoutMs);

function canConnect() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port: Number(port) });
    socket.setTimeout(1000);
    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

while (Date.now() < deadline) {
  if (await canConnect()) {
    console.log(`${host}:${port} is accepting connections`);
    process.exit(0);
  }
  await new Promise((resolve) => setTimeout(resolve, 750));
}

console.error(`Timed out waiting for ${host}:${port}`);
process.exit(1);
