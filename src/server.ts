import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();
import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ZodError } from 'zod';
import { connectDB } from './lib/db.js';
import { AppError } from './lib/errors.js';

import './models/CountryEn.js';
import './models/CountryEs.js';
import './models/PartyEn.js';
import './models/PartyEs.js';
import './models/PresidentEn.js';
import './models/PresidentEs.js';

import healthRoutes from './routes/health.js';
import countriesRoutes from './routes/countries.js';
import partiesRoutes from './routes/parties.js';
import presidentsRoutes from './routes/presidents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicRoot = path.resolve(__dirname, '../public');

export function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.code(error.statusCode).send({
        error: error.error,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      });
    }
    if (error instanceof ZodError) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Validation failed', details: error.issues });
    }
    const status = typeof (error as any).statusCode === 'number' ? (error as any).statusCode : 500;
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return reply.code(status).send({ error: status >= 500 ? 'Internal Server Error' : 'Error', message });
  });

  app.register(cors, { origin: true, credentials: true });
  app.register(fastifyStatic, { root: path.join(publicRoot, 'assets'), prefix: '/assets/', decorateReply: false });
  app.register(healthRoutes);

  app.get('/', async (_request, reply) => reply.type('text/html').send(await readFile(path.join(publicRoot, 'index.html'))));
  app.get('/docs', async (_request, reply) => reply.type('text/html').send(await readFile(path.join(publicRoot, 'docs.html'))));
  app.get('/about', async (_request, reply) => reply.type('text/html').send(await readFile(path.join(publicRoot, 'about.html'))));

  app.register(async (instance) => {
    await instance.register(countriesRoutes, { prefix: '/countries' });
    await instance.register(partiesRoutes, { prefix: '/parties' });
    await instance.register(presidentsRoutes, { prefix: '/presidents' });
  }, { prefix: '/api/v1/:lang' });

  return app;
}

const start = async () => {
  const app = buildApp();
  try {
    await connectDB();
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    await app.listen({ port, host });
    app.log.info(`Server running at http://${host}:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

const isDirectRun = (() => {
  const entry = process.argv[1];
  if (!entry) return false;
  const entryPath = path.resolve(entry);
  const selfPath = fileURLToPath(import.meta.url);
  return entryPath === selfPath || entryPath === selfPath.replace(/\.ts$/, '.js');
})();

if (isDirectRun) {
  start();
}

export default buildApp;
