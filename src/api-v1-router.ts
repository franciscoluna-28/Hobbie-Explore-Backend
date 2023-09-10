import { Router } from "express";
import userRouter from "./api/user/userRouter";
import ratingRouter from "./api/rating/ratingRouter";
import defaultActivityRouter from "./api/activity/pre-defined-activity/default-activity-router";
import commentRouter from "./api/comment/commentRouter";
import customActivityRouter from "./api/activity/activities-by-users/custom-activity-router";

const apiV1Router: Router = Router();

// Montar las rutas específicas de la versión 1
apiV1Router.use("/users", userRouter);
apiV1Router.use("/rating", ratingRouter);
apiV1Router.use("/activities", defaultActivityRouter);
apiV1Router.use("/comment", commentRouter);
apiV1Router.use("/activities", customActivityRouter);

export default apiV1Router;
