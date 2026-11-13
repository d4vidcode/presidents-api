import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { isDbConnected } from '../lib/db.js';

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async (_request, reply) => {
    const db = isDbConnected();
    const payload = {
      status: db ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db: { connected: db },
    };
    return reply.code(db ? 200 : 503).send(payload);
  });
};

export default healthRoutes;
