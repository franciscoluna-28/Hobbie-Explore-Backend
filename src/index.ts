import express, { Application, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import activityRouter from "./api/activity/activityRouter";
import Middleware from "./middlewares/firebaseValidation";
import userRouter from "./api/user/userRouter";

// Starting the application
const app: Application = express();

// Proper middleware setup
dotenv.config();
app.use(express.json());
app.use(cors());

const authMiddlewareFirebase = new Middleware();

app.use(authMiddlewareFirebase.decodeToken);

// Create the main API router
const apiRouter: Router = Router();

// Mount the user router without the middleware
apiRouter.use("/user", userRouter);

// Apply the middleware only to the activity routes

// Mounting additional routers in our API
apiRouter.use("/activity", activityRouter);

// Application is under /api path
app.use("/api", apiRouter);

export default app;
