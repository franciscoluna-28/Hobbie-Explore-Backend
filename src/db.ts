import mongoose from "mongoose";

// Mongoose Connection
mongoose.connect(process.env.DATABASE_URI!, {
  dbName: process.env.DB_NAME,
});

export const db = mongoose.connection;