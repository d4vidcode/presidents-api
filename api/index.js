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
  app.server.emit('request', req, res);
}
