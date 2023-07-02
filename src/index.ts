import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Starting the application
const app = express();

// Proper middleware setup
dotenv.config();
app.use(cors());
app.use(express.json());

export default app;