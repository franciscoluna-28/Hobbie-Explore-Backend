import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

// Setting up environment variables
dotenv.config();

// TODO maybe we need to get rid of this
// Global db variable
let db: Db;

// TODO make this in a cleaner way
export async function connectToDatabase() {
  try {
    const client: MongoClient = new MongoClient(process.env.DATABASE_URI!);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

//TODO maybe we need to get rid of this
// Function to get the current database
export function getDb(): Db {
  if (!db) {
    throw new Error("Database connection has not been established");
  }
  return db;
}

export { db };

