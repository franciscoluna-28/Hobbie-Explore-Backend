import { UserActivitiesController } from "./controller/userActivitiesController";
import { Router } from "express";
import { UserActionsController } from "./controller/userActionsController";
import { UserStatsController } from "./controller/userStatsController";
import UserModel from "./userModel";
import { UserDescriptionController } from "./controller/userDescriptionController";

// Instance Controller
const userRouter = Router();

// Creating a single instance to the user actions controller
const userActionsController = UserActionsController.getInstance();
const userActivitiesController =
  UserActivitiesController.getInstance(UserModel);
const userStatsController = new UserStatsController(UserModel);
const userDescriptionController = new UserDescriptionController();

// User - actions routes
userRouter.post("/register", userActionsController.create);
userRouter.delete("/delete/:uid", userActionsController.delete);

// User - activities routes
userRouter.get(
  "/default-activities/:uid",
  userActivitiesController.getUserHobbyExploreActivities
);
userRouter.delete(
  "/delete-default-activity/:uid",
  userActivitiesController.deleteActivityFromUser
);
userRouter.post(
  "/save-default-activity/:uid",
  userActivitiesController.addActivityToUser
);
userRouter.get(
  "/is-saved/:uid",
  userActivitiesController.checkIfActivityIsSaved
);

// User - stats routes
userRouter.get(
  "/global-favorite-categories/:uid",
  userStatsController.getFavoriteCategories
);
userRouter.get("/global-stats/:uid", userStatsController.getUserTotalStats);

// User - description routes
userRouter.get(
  "/description/:uid",
  userDescriptionController.getUserDescription
);
userRouter.patch(
  "/description/:uid",
  userDescriptionController.updateUserDescription
);



export default userRouter;
