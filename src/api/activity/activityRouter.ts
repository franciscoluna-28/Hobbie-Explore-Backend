import { Router } from "express";
import { ActivityController } from "./activityController";

const activityRouter = Router();
const activityController = new ActivityController();

activityRouter.get("/random", activityController.getThreeRandomActivities);
activityRouter.get(
  "/random-with-query/:type",
  activityController.getThreeRandomActivitiesWithQuery
);
activityRouter.get("/search", activityController.searchActivities);
activityRouter.get("/get-activity-by-id/:id", activityController.getActivityById);

export default activityRouter;
