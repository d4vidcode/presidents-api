import { model, InferSchemaType, Types } from 'mongoose';
import { createPresidentSchema } from './PresidentBase.js';

const schema = createPresidentSchema();

export type PresidentEs = InferSchemaType<typeof schema> & { _id: Types.ObjectId };
export const PresidentEsModel = model('PresidentEs', schema, 'presidents_es');