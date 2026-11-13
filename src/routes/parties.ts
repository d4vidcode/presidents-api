import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { getPartyModel } from '../lib/models.js';
import { parseWithSchema, parseLang, notFound } from '../lib/errors.js';

const paramsLang = z.object({ lang: z.enum(['en', 'es']) });
const paramsCode = z.object({
  lang: z.enum(['en', 'es']),
  code: z.string().min(1).transform((v) => v.toLowerCase()),
});
const queryCountry = z.object({
  country: z.string().min(2).max(3).transform((v) => v.toUpperCase()).optional(),
});

const partiesRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Params: { lang: string }; Querystring: { country?: string } }>('/', async (request) => {
    const { lang } = parseWithSchema(paramsLang, request.params);
    parseLang(lang);
    const query = parseWithSchema(queryCountry, request.query);
    const filter: Record<string, unknown> = {};
    if (query.country) filter.countryIsoCode = query.country;
    const parties = await getPartyModel(lang).find(filter).sort({ name: 1 }).lean();
    return { data: parties, meta: { total: parties.length, language: lang } };
  });

  app.get<{ Params: { lang: string; code: string }; Querystring: { country?: string } }>('/:code', async (request) => {
    const { lang, code } = parseWithSchema(paramsCode, request.params);
    const query = parseWithSchema(queryCountry, request.query);
    const filter: Record<string, unknown> = { code };
    if (query.country) filter.countryIsoCode = query.country;
    const party = await getPartyModel(lang).findOne(filter).lean();
    if (!party) notFound(`Party with code "${code}" not found`);
    return { data: party };
  });
};

export default partiesRoutes;
