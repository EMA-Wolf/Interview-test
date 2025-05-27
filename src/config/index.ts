// config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dev-db';
export const PORT = process.env.PORT || 5000;
