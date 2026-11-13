import { Schema } from 'mongoose';

const PartyRefSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    acronym: { type: String, default: null },
  },
  { _id: false }
);

const PlaceSchema = new Schema(
  {
    city: { type: String, default: null },
    region: { type: String, default: null },
    country: { type: String, default: null },
  },
  { _id: false }
);

const SourceSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, default: null },
    type: { type: String, default: null },
    author: { type: String, default: null },
    year: { type: Number, default: null },
  },
  { _id: false }
);

const PeriodSchema = new Schema(
  {
    termNumber: { type: Number, required: true, min: 1 },
    officialTitle: { type: String, required: true },
    positionType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    completedTerm: { type: Boolean, default: false },
    mainParty: { type: PartyRefSchema, default: null },
    comingToPowerMethod: { type: String, required: true },
    leavingPowerMethod: { type: String, default: null },
    comingToPowerDescription: { type: String, default: null },
    leavingPowerDescription: { type: String, default: null },
    vicePresidents: { type: [String], default: [] },
    relevantEvents: { type: [String], default: [] },
    notes: { type: String, default: null },
  },
  { _id: true }
);

export function createPresidentSchema() {
  const PresidentSchema = new Schema(
    {
      slug: { type: String, required: true, unique: true, index: true },
      countryIsoCode: { type: String, required: true, uppercase: true, index: true },
      fullName: { type: String, required: true },
      commonName: { type: String, required: true, index: true },
      gender: { type: String, default: null },
      birthDate: { type: Date, default: null },
      birthPlace: { type: PlaceSchema, default: () => ({}) },
      deathDate: { type: Date, default: null },
      deathPlace: { type: PlaceSchema, default: () => ({}) },
      profession: { type: [String], default: [] },
      photoUrl: { type: String, default: null },
      periods: { type: [PeriodSchema], default: [] },
      notes: { type: String, default: null },
      sources: { type: [SourceSchema], default: [] },
      dataConfidence: { type: String, default: null },
    },
    { timestamps: true }
  );

  PresidentSchema.index({ countryIsoCode: 1, commonName: 1 });
  PresidentSchema.index({ 'periods.startDate': 1 });
  PresidentSchema.index({ 'periods.mainParty.id': 1 });

  return PresidentSchema;
}