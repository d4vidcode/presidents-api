import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { connectDB, disconnectDB } from '../lib/db.js';
import { CountryEnModel } from '../models/CountryEn.js';
import { CountryEsModel } from '../models/CountryEs.js';
import { PartyEnModel } from '../models/PartyEn.js';
import { PartyEsModel } from '../models/PartyEs.js';
import { PresidentEnModel } from '../models/PresidentEn.js';
import { PresidentEsModel } from '../models/PresidentEs.js';

export async function importFile(file: string) {
  const filePath = resolve(process.cwd(), file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const isEs = file.includes('_es');

  const CountryModel = isEs ? CountryEsModel : CountryEnModel;
  const PartyModel = isEs ? PartyEsModel : PartyEnModel;
  const PresidentModel = isEs ? PresidentEsModel : PresidentEnModel;

  const isoCode = data.country.isoCode;

  await CountryModel.findOneAndUpdate(
    { isoCode },
    { ...data.country, isoCode },
    { upsert: true }
  );

  let partiesCount = 0;
  for (const party of data.parties || []) {
    await PartyModel.findOneAndUpdate(
      { code: party.code, countryIsoCode: isoCode },
      { ...party, countryIsoCode: isoCode },
      { upsert: true }
    );
    partiesCount++;
  }

  let presidentsCount = 0;
  for (const president of data.presidents || []) {
    await PresidentModel.findOneAndUpdate(
      { slug: president.slug },
      { ...president, countryIsoCode: isoCode },
      { upsert: true, setDefaultsOnInsert: true }
    );
    presidentsCount++;
  }

  await CountryModel.updateOne({ isoCode }, { totalPresidents: presidentsCount });
  return { isoCode, partiesCount, presidentsCount, lang: isEs ? 'es' : 'en' };
}

export async function clearCollections() {
  await Promise.all([
    CountryEnModel.deleteMany({}),
    CountryEsModel.deleteMany({}),
    PartyEnModel.deleteMany({}),
    PartyEsModel.deleteMany({}),
    PresidentEnModel.deleteMany({}),
    PresidentEsModel.deleteMany({}),
  ]);
}

export async function runImport(files = ['data/peru_en.json', 'data/peru_es.json']) {
  await clearCollections();
  const results = [];
  for (const file of files) results.push(await importFile(file));
  return results;
}

async function main() {
  await connectDB();
  const results = await runImport();
  console.log(JSON.stringify({ ok: true, results }));
  await disconnectDB();
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
