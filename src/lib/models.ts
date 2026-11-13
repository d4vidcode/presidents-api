import { PresidentEnModel } from '../models/PresidentEn.js';
import { PresidentEsModel } from '../models/PresidentEs.js';
import { CountryEnModel } from '../models/CountryEn.js';
import { CountryEsModel } from '../models/CountryEs.js';
import { PartyEnModel } from '../models/PartyEn.js';
import { PartyEsModel } from '../models/PartyEs.js';

export type Language = 'en' | 'es';

export function getPresidentModel(lang: Language) {
  return lang === 'es' ? PresidentEsModel : PresidentEnModel;
}

export function getCountryModel(lang: Language) {
  return lang === 'es' ? CountryEsModel : CountryEnModel;
}

export function getPartyModel(lang: Language) {
  return lang === 'es' ? PartyEsModel : PartyEnModel;
}