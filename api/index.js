import { buildApp } from '../dist/server.js';
import { connectDB } from '../dist/lib/db.js';

let ready;

async function getApp() {
  if (!ready) {
    ready = (async () => {
      await connectDB();
      const app = buildApp();
      await app.ready();
      return app;
    })().catch((err) => {
      ready = undefined;
      throw err;
    });
  }
  return ready;
}

export default async function handler(req, res) {
  const app = await getApp();
  await new Promise((resolve, reject) => {
    res.on('finish', resolve);
    res.on('close', resolve);
    res.on('error', reject);
    app.server.emit('request', req, res);
  });
}
