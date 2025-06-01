import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGODB_URI)
export const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose; // ✅ Already connected, return instance
  }

  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('✅ MongoDB connected');
  return mongoose; // ✅ Return instance after new connection
};
