import { ZodError, ZodSchema } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type Language = 'en' | 'es';

export class AppError extends Error {
  statusCode: number;
  error: string;
  details?: unknown;

  constructor(statusCode: number, error: string, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.details = details;
  }
}

export function parseWithSchema<T>(schema: ZodSchema<T>, data: unknown, message = 'Invalid request parameters'): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new AppError(400, 'Bad Request', message, result.error.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
    })));
  }
  return result.data;
}

export function parseLang(lang: string): Language {
  if (lang !== 'en' && lang !== 'es') {
    throw new AppError(400, 'Bad Request', `Unsupported language "${lang}". Supported: en, es`);
  }
  return lang;
}

export function parseDateParam(value: string | undefined, name: string): Date | undefined {
  if (value === undefined || value === '') return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, 'Bad Request', `Invalid date for "${name}". Expected a valid ISO/date string.`);
  }
  return date;
}

export function notFound(message: string): never {
  throw new AppError(404, 'Not Found', message);
}

export function sendAppError(reply: FastifyReply, err: unknown) {
  if (err instanceof AppError) {
    return reply.code(err.statusCode).send({
      error: err.error,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }
  if (err instanceof ZodError) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Validation failed',
      details: err.issues,
    });
  }
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  return reply.code(500).send({ error: 'Internal Server Error', message });
}
