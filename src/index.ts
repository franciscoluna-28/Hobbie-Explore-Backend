import express, { Application, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import activityRouter from "./api/activity/default-activity-router";
import Middleware from "./middlewares/firebase-validation";
import userRouter from "./api/user/userRouter";
import ratingRouter from "./api/rating/ratingRouter";
import commentRouter from "./api/comment/commentRouter";
import morgan from "morgan";

// Starting the application
const app: Application = express();

// Cors middleware to make sure the API is accesible for other services
app.use(
  cors({
    origin: "*",
  })
);

// Body parser middleware
app.use(express.json());

// Create a new instance of the Firebase middleware
const firebaseMiddleware = new Middleware();

// Firebase middleware checking the user token to handle authentication
app.use(firebaseMiddleware.decodeToken);

// Environment variables setup
dotenv.config();

// Logger to use to test the HTTP requests
app.use(morgan("tiny"));

// Create the main API router
const apiRouter: Router = Router();

// Sub - routes
apiRouter.use("/user", userRouter);
apiRouter.use("/rating", ratingRouter);
apiRouter.use("/activity", activityRouter);
apiRouter.use("/comment", commentRouter);

// Application is under /api path
app.use("/api", apiRouter);

export default app;
