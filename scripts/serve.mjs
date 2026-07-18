import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const routes = new Map([
  ['/', ['agents.html', 'text/html; charset=utf-8']],
  ['/agents.html', ['agents.html', 'text/html; charset=utf-8']],
  ['/media.mp4', ['media.mp4', 'video/mp4']]
]);

export function createAtlasServer(host = '127.0.0.1') {
  return createServer(async (request, response) => {
    const pathname = new URL(request.url || '/', `http://${host}`).pathname;
    const route = routes.get(pathname);

    if (!route) {
      response.writeHead(pathname === '/favicon.ico' ? 204 : 404);
      response.end();
      return;
    }

    const [relativePath, contentType] = route;
    const filePath = resolve(root, relativePath);

    try {
      const fileStat = await stat(filePath);
      response.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileStat.size,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer'
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
}

export async function startServer({
  host = process.env.HOST || '127.0.0.1',
  port = Number.parseInt(process.env.PORT || '4278', 10)
} = {}) {
  const server = createAtlasServer(host);
  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(port, host, resolveListen);
  });
  return server;
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const host = process.env.HOST || '127.0.0.1';
  const port = Number.parseInt(process.env.PORT || '4278', 10);
  const server = await startServer({ host, port });
  console.log(`CASPER Atlas listening on http://${host}:${port}`);

  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
