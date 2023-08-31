import { Router } from "express";
import { DefaultActivityFromDBController } from "./pre-defined-activity/controller/default-activity-from-db-controller";
import { DefaultActivityController } from "./pre-defined-activity/controller/default-activity-random-controller";
import { downloadImageHandler } from "../../utils/download-image-handler";
import { DefaultActivitiesUserController } from "./pre-defined-activity/controller/default-activity-user-actions-controller";

const defaultActivityRouter = Router();
const predefinedActivitiesDBController = new DefaultActivityFromDBController();
const predefinedActivitiesController = new DefaultActivityController();
const defaultUserActivitiesController = new DefaultActivitiesUserController();

// Random activities
defaultActivityRouter.get(
  "/random",
  predefinedActivitiesController.getThreeRandomActivities
);
defaultActivityRouter.get(
  "/random/:type",
  predefinedActivitiesController.getThreeRandomActivitiesWithQuery
);

defaultActivityRouter.get(
  "/three-activities-from-db-with-type",
  predefinedActivitiesDBController.recommendThreeRandomDefaultDBActivities
);

// Helper method to get one activity with its id
defaultActivityRouter.get(
  "/activity-by-id/:id",
  predefinedActivitiesDBController.getActivityById
);

// Helper method to donwload the image of one activity
defaultActivityRouter.get(
  "/download-image-from-activity",
  downloadImageHandler
);

// User - activities methods
defaultActivityRouter.get(
  "/user-activities/:uid",
  defaultUserActivitiesController.getUserHobbyExploreActivities
);

defaultActivityRouter.post(
  "/save-default-activity/:uid",
  defaultUserActivitiesController.addActivityToUser
);

defaultActivityRouter.get(
  "/is-saved/:uid",
  defaultUserActivitiesController.checkIfActivityIsSaved
);

export default defaultActivityRouter;
