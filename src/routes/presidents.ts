import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { getPresidentModel } from '../lib/models.js';
import { parseWithSchema, parseLang, parseDateParam, notFound } from '../lib/errors.js';

const paramsLang = z.object({ lang: z.enum(['en', 'es']) });
const paramsSlug = z.object({
  lang: z.enum(['en', 'es']),
  slug: z.string().min(1).transform((v) => v.toLowerCase()),
});
const queryList = z.object({
  country: z.string().min(2).max(3).transform((v) => v.toUpperCase()).optional(),
  party: z.string().min(1).transform((v) => v.toLowerCase()).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
});

const presidentsRoutes: FastifyPluginAsync = async (app) => {
  app.get<{
    Params: { lang: string };
    Querystring: { country?: string; party?: string; from?: string; to?: string; page?: string; limit?: string };
  }>('/', async (request) => {
    const { lang } = parseWithSchema(paramsLang, request.params);
    parseLang(lang);
    const q = parseWithSchema(queryList, request.query);
    const from = parseDateParam(q.from, 'from');
    const to = parseDateParam(q.to, 'to');
    if (from && to && from > to) {
      throw Object.assign(new Error('"from" must be <= "to"'), { statusCode: 400 });
    }

    const page = q.page ?? 1;
    const limit = q.limit ?? 20;
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {};
    if (q.country) filter.countryIsoCode = q.country;

    const periodMatch: Record<string, unknown> = {};
    if (q.party) periodMatch['mainParty.id'] = q.party;
    if (from) periodMatch.startDate = { $gte: from };
    if (to) periodMatch.endDate = { $lte: to };
    if (Object.keys(periodMatch).length > 0) filter.periods = { $elemMatch: periodMatch };

    const PresidentModel = getPresidentModel(lang);
    const [presidents, total] = await Promise.all([
      PresidentModel.find(filter).sort({ 'periods.startDate': 1 }).skip(skip).limit(limit).lean(),
      PresidentModel.countDocuments(filter),
    ]);

    return {
      data: presidents,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit), language: lang },
    };
  });

  app.get<{ Params: { lang: string; slug: string } }>('/:slug', async (request) => {
    const { lang, slug } = parseWithSchema(paramsSlug, request.params);
    const president = await getPresidentModel(lang).findOne({ slug }).lean();
    if (!president) notFound(`President with slug "${slug}" not found`);
    return { data: president };
  });
};

export default presidentsRoutes;
