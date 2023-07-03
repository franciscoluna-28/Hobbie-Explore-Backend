import { MongoClient, Db } from "mongodb";

// Global db variable
let db: Db;

// Connect to MongoDB
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

// Function to get the current database
export function getDb(): Db {
  if (!db) {
    throw new Error("Database connection has not been established");
  }
  return db;
}

export { db };
