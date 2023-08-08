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
activityRouter.get(
  "/get-activity-by-id/:id",
  activityController.getActivityById
);
activityRouter.get(
  "/download-image-from-activity",
  activityController.downloadActivityImage
);
activityRouter.get(
  "/get-three-activities-from-db-with-type",
  activityController.recommendThreeRandomDefaultDBActivities
);

export default activityRouter;
