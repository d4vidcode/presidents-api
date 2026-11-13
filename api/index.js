let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const { buildApp } = await import('../dist/server.js');
      const { connectDB } = await import('../dist/lib/db.js');
      await connectDB();
      const app = buildApp();
      await app.ready();
      return app;
    })();
  }
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  app.server.emit('request', req, res);
}
