import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { getCountryModel, getPresidentModel } from '../lib/models.js';
import { parseWithSchema, parseLang, notFound } from '../lib/errors.js';

const langParams = z.object({ lang: z.enum(['en', 'es']) });
const isoParams = z.object({ lang: z.enum(['en', 'es']), isoCode: z.string().min(2).max(3).transform((v) => v.toUpperCase()) });

const countriesRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Params: { lang: string } }>('/', async (request) => {
    const { lang } = parseWithSchema(langParams, request.params);
    parseLang(lang);
    const CountryModel = getCountryModel(lang);
    const countries = await CountryModel.find().sort({ name: 1 }).lean();
    return { data: countries, meta: { total: countries.length, language: lang } };
  });

  app.get<{ Params: { lang: string; isoCode: string } }>('/:isoCode', async (request) => {
    const { lang, isoCode } = parseWithSchema(isoParams, request.params);
    const CountryModel = getCountryModel(lang);
    const country = await CountryModel.findOne({ isoCode }).lean();
    if (!country) notFound(`Country with ISO code "${isoCode}" not found`);
    return { data: country };
  });

  app.get<{ Params: { lang: string; isoCode: string } }>('/:isoCode/presidents', async (request) => {
    const { lang, isoCode } = parseWithSchema(isoParams, request.params);
    const CountryModel = getCountryModel(lang);
    const PresidentModel = getPresidentModel(lang);
    const country = await CountryModel.findOne({ isoCode }).lean();
    if (!country) notFound(`Country with ISO code "${isoCode}" not found`);
    const presidents = await PresidentModel.find({ countryIsoCode: isoCode }).sort({ 'periods.startDate': 1 }).lean();
    return {
      data: presidents,
      meta: { total: presidents.length, country: (country as any).name, language: lang },
    };
  });
};

export default countriesRoutes;
