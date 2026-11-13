import { Schema } from 'mongoose';

export function createPartySchema() {
  const PartySchema = new Schema(
    {
      code: { type: String, required: true, lowercase: true, trim: true },
      countryIsoCode: { type: String, required: true, uppercase: true, index: true },
      name: { type: String, required: true },
      acronym: { type: String, default: null },
      spectrum: { type: String, default: null },
      ideology: { type: [String], default: [] },
      foundedAt: { type: Date, default: null },
      dissolvedAt: { type: Date, default: null },
      founder: { type: String, default: null },
      active: { type: Boolean, default: true },
      logoUrl: { type: String, default: null },
      history: { type: String, default: null },
    },
    { timestamps: true }
  );

  PartySchema.index({ countryIsoCode: 1, code: 1 }, { unique: true });

  return PartySchema;
}