import { model, InferSchemaType, Types } from 'mongoose';
import { createPartySchema } from './PartyBase.js';

const schema = createPartySchema();

export type PartyEs = InferSchemaType<typeof schema> & { _id: Types.ObjectId };
export const PartyEsModel = model('PartyEs', schema, 'parties_es');