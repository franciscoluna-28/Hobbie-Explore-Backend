import mongoose from "mongoose";


console.log("WORK PLEASE DB URL: ", process.env.DATABASE_URI)
// Mongoose Connection
mongoose.connect(process.env.DATABASE_URI!, {
  dbName: process.env.DB_NAME,
});

export const db = mongoose.connection;
