import { Schema, model } from 'mongoose';

const CountryEnSchema = new Schema(
  {
    isoCode: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    officialName: { type: String, default: null },
    independenceDate: { type: Date, default: null },
    governmentSystem: { type: String, default: null, trim: true },
    currency: { type: String, default: null },
    officialLanguages: { type: [String], default: ['es'] },
    totalPresidents: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'countries_en' }
);

export const CountryEnModel = model('CountryEn', CountryEnSchema);