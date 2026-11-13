import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & { _mongoose?: MongooseCache };

const cached: MongooseCache = globalWithMongoose._mongoose || { conn: null, promise: null };
globalWithMongoose._mongoose = cached;

export async function connectDB(): Promise<void> {
  if (cached.conn && mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) return;
  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
