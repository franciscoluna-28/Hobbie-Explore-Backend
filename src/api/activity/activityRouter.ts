import { Router } from "express";
import { ActivityController } from "./activityController";

const activityRouter = Router();
const activityController = new ActivityController();

activityRouter.get("/random", activityController.getThreeRandomActivities);
activityRouter.get(
  "/random/:type",
  activityController.getThreeRandomActivitiesWithQuery
);
activityRouter.get("/search", activityController.searchActivities);
activityRouter.get(
  "/activity-by-id/:id",
  activityController.getActivityById
);
activityRouter.get(
  "/download-image-from-activity",
  activityController.downloadActivityImage
);
activityRouter.get(
  "/three-activities-from-db-with-type",
  activityController.recommendThreeRandomDefaultDBActivities
);

// TODO let users create their own activities

// TODO create a HOC to handle with both the actitivities from bored and the custom activities

// TODO add route to get only activities with description in the specified category

// TODO add route to get only activities from users in the specified category

// TODO add route to get the highest qualified activities within a range
// And deal with the conditional rendering of the pagination 

export default activityRouter;
