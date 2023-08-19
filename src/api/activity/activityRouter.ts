  import { Router } from "express";
import { PredefinedActivitiesDBController } from "./pre-defined-activity/controller/pre-defined-activities-db-controller";
import { PredefinedActivitiesController } from "./pre-defined-activity/controller/pre-defined-activities-random-controller";
import { downloadImageHandler } from "../../utils/download-image-handler";

const activityRouter = Router();
const predefinedActivitiesDBController = new PredefinedActivitiesDBController();
const predefinedActivitiesController = new PredefinedActivitiesController();

activityRouter.get(
  "/random",
  predefinedActivitiesController.getThreeRandomActivities
);
activityRouter.get(
  "/random/:type",
  predefinedActivitiesController.getThreeRandomActivitiesWithQuery
);
/* activityRouter.get("/search", activityController.searchActivities) */ activityRouter.get(
  "/activity-by-id/:id",
  predefinedActivitiesDBController.getActivityById
);
activityRouter.get("/download-image-from-activity", downloadImageHandler);
activityRouter.get(
  "/three-activities-from-db-with-type",
  predefinedActivitiesDBController.recommendThreeRandomDefaultDBActivities
);


export default activityRouter;
