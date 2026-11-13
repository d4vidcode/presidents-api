import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment');
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  isConnected = true;
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
