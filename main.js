const { createServer } = require('vite');
const path = require('path');

async function start() {
  const server = await createServer({
    configFile: path.resolve(__dirname, 'vite.config.ts'),
    server: { open: true }
  });
  await server.listen();
  server.printUrls();
}

start();
