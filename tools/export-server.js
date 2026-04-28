const http = require('http');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const exportDir = path.resolve(process.env.EXPORT_DIR || 'C:\\Users\\factoy\\Documents\\ProjectC\\Export');
const port = Number(process.env.EXPORT_PORT || 53175);
const host = '127.0.0.1';

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Export-Filename',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    ...headers
  });
  if (body && typeof body.pipe === 'function') {
    body.pipe(res);
  } else {
    res.end(body);
  }
}

function safeFilename(value) {
  const decoded = decodeURIComponent(value || '');
  const base = path.basename(decoded).replace(/[\\/:*?"<>|]+/g, '-').trim();
  if (!base) return 'character_codex_export.zip';
  return base.toLowerCase().endsWith('.zip') ? base : `${base}.zip`;
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function handleExport(req, res) {
  const body = await readRequestBody(req);
  if (!body.length) {
    send(res, 400, JSON.stringify({ ok: false, error: 'empty export body' }), {
      'Content-Type': 'application/json; charset=utf-8'
    });
    return;
  }

  await fsp.mkdir(exportDir, { recursive: true });
  const filename = safeFilename(req.headers['x-export-filename']);
  const target = path.join(exportDir, filename);
  await fsp.writeFile(target, body);

  send(res, 200, JSON.stringify({
    ok: true,
    filename,
    bytes: body.length,
    relativePath: target,
    path: target
  }), {
    'Content-Type': 'application/json; charset=utf-8'
  });
}

async function handleStatic(req, res) {
  const url = new URL(req.url, `http://${host}:${port}`);
  const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const target = path.resolve(rootDir, `.${decodeURIComponent(requestPath)}`);
  if (!target.startsWith(rootDir)) {
    send(res, 403, 'Forbidden');
    return;
  }

  try {
    const stat = await fsp.stat(target);
    if (!stat.isFile()) throw new Error('Not a file');
    const ext = path.extname(target).toLowerCase();
    send(res, 200, fs.createReadStream(target), {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream'
    });
  } catch {
    send(res, 404, 'Not found');
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      send(res, 204, '');
      return;
    }
    if (req.method === 'GET' && req.url === '/health') {
      send(res, 200, JSON.stringify({ ok: true }), {
        'Content-Type': 'application/json; charset=utf-8'
      });
      return;
    }
    if (req.method === 'POST' && req.url === '/export') {
      await handleExport(req, res);
      return;
    }
    if (req.method === 'GET') {
      await handleStatic(req, res);
      return;
    }
    send(res, 405, 'Method not allowed');
  } catch (error) {
    send(res, 500, JSON.stringify({ ok: false, error: error.message }), {
      'Content-Type': 'application/json; charset=utf-8'
    });
  }
});

server.listen(port, host, () => {
  console.log(`Export server running at http://${host}:${port}`);
  console.log(`Exports will be saved to ${exportDir}`);
});
