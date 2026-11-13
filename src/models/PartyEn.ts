import { model, InferSchemaType, Types } from 'mongoose';
import { createPartySchema } from './PartyBase.js';

const schema = createPartySchema();

export type PartyEn = InferSchemaType<typeof schema> & { _id: Types.ObjectId };
export const PartyEnModel = model('PartyEn', schema, 'parties_en');