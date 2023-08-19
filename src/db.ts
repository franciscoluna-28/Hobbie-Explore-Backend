import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

// Mongoose Connection
mongoose.connect(process.env.DATABASE_URI!, {
  dbName: process.env.DB_NAME,
});

export const db = mongoose.connection;
