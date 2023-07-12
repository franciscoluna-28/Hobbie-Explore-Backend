import { Router } from "express";
import { ActivityController } from "./activityController";

const activityRouter = Router();
const activityController = new ActivityController();

activityRouter.get("/random", activityController.getThreeRandomActivities);
activityRouter.get("/random-with-query/:type", activityController.getThreeRandomActivitiesWithQuery);
activityRouter.get("/search/:query", activityController.searchActivities);

export default activityRouter;

