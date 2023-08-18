import express, { Application, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import activityRouter from "./api/activity/activityRouter";
import Middleware from "./middlewares/firebaseValidation";
import userRouter from "./api/user/userRouter";
import ratingRouter from "./api/rating/ratingRouter";
import commentRouter from "./api/comment/commentRouter";

// Starting the application
const app: Application = express();

const firebaseMiddleware = new Middleware(); 

// Proper middleware setup
dotenv.config();
app.use(express.json());
app.use(cors());
/* app.use(firebaseMiddleware.decodeToken) */


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
