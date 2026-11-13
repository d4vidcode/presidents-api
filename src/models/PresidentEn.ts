import { model, InferSchemaType, Types } from 'mongoose';
import { createPresidentSchema } from './PresidentBase.js';

const schema = createPresidentSchema();

export type PresidentEn = InferSchemaType<typeof schema> & { _id: Types.ObjectId };
export const PresidentEnModel = model('PresidentEn', schema, 'presidents_en');