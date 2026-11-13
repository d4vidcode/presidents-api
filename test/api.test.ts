import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { buildApp } from '../src/server.js';
import { connectDB, disconnectDB } from '../src/lib/db.js';
import { runImport } from '../src/scripts/import.js';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;
let app: ReturnType<typeof buildApp>;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  await connectDB();
  await runImport();
  app = buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
  await disconnectDB();
  await mongod.stop();
});

describe('health', () => {
  it('returns health status', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe('ok');
    expect(body.db.connected).toBe(true);
  });
});

describe('countries routes', () => {
  it('lists countries', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/en/countries' });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.length).toBeGreaterThan(0);
  });

  it('gets country and presidents', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/en/countries/PE' });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.isoCode).toBe('PE');

    const pres = await app.inject({ method: 'GET', url: '/api/v1/en/countries/PE/presidents' });
    expect(pres.statusCode).toBe(200);
    expect(pres.json().meta.total).toBeGreaterThan(0);
  });

  it('rejects invalid lang', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/fr/countries' });
    expect(res.statusCode).toBe(400);
  });
});

describe('parties and presidents routes', () => {
  it('lists and gets parties', async () => {
    const list = await app.inject({ method: 'GET', url: '/api/v1/en/parties?country=pe' });
    expect(list.statusCode).toBe(200);
    expect(list.json().data.length).toBeGreaterThan(0);
    const code = list.json().data[0].code;
    const one = await app.inject({ method: 'GET', url: `/api/v1/en/parties/${code}?country=pe` });
    expect(one.statusCode).toBe(200);
  });

  it('lists presidents with filters and pagination', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/en/presidents?country=pe&page=1&limit=5' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data.length).toBeLessThanOrEqual(5);
    expect(body.meta.language).toBe('en');
  });

  it('rejects invalid dates', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/en/presidents?from=not-a-date' });
    expect(res.statusCode).toBe(400);
  });

  it('gets president by slug and 404s unknown', async () => {
    const list = await app.inject({ method: 'GET', url: '/api/v1/en/presidents?limit=1' });
    const slug = list.json().data[0].slug;
    const ok = await app.inject({ method: 'GET', url: `/api/v1/en/presidents/${slug}` });
    expect(ok.statusCode).toBe(200);
    const missing = await app.inject({ method: 'GET', url: '/api/v1/en/presidents/does-not-exist' });
    expect(missing.statusCode).toBe(404);
  });
});

describe('import script', () => {
  it('imports data into collections', async () => {
    const db = mongoose.connection.db;
    const countries = await db.collection('countries_en').countDocuments();
    const presidents = await db.collection('presidents_en').countDocuments();
    expect(countries).toBeGreaterThan(0);
    expect(presidents).toBeGreaterThan(0);
  });
});
