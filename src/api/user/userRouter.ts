  import { UserActivitiesController } from './controller/userActivitiesController';
  import { Router } from "express";
  import { UserActionsController } from "./controller/userActionsController";
  import { UserStatsController } from './controller/userStatsController';
  import UserModel from "./userModel";

  const userRouter = Router();

  // Creating a single instance to the user actions controller
  const userActionsController = UserActionsController.getInstance();
  const userActivitiesController = UserActivitiesController.getInstance(UserModel);
  const userStatsController = new UserStatsController(UserModel);

  // User - actions routes
  userRouter.post("/register", userActionsController.create);
  userRouter.delete("/delete/:uid", userActionsController.delete);

  // User - activities routes
  userRouter.get("/default-activities/:uid", userActivitiesController.getUserHobbyExploreActivities);  
  userRouter.delete("/delete-default-activity/:uid", userActivitiesController.deleteActivityFromUser);
  userRouter.post("/save-default-activity/:uid", userActivitiesController.addActivityToUser);
  userRouter.get("/is-saved/:uid", userActivitiesController.checkIfActivityIsSaved);

  // User - stats routes
  userRouter.get("/global-favorite-categories/:uid", userStatsController.getFavoriteCategories);
  userRouter.get("/global-stats/:uid", userStatsController.getUserTotalStats);

  export default userRouter;







/* userRouter.post("/register-user-token/:uid", routerController.addTokenToUser);
userRouter.post(
  "/add-activity-to-user/:uid",
  routerController.addActivityToUser
);
userRouter.delete(
  "/remove-activity-from-user/:uid",
  routerController.deleteActivityFromUser
);
userRouter.get(
  "/get-activities-by-user/:uid",
  routerController.getCurrentUserActivities
);

userRouter.get("/get-activities-ids/:uid", routerController.getSavedActivitiesIds)
userRouter.get("/get-favority-categories/:uid", routerController.getFavorityCategories)
userRouter.post("/update-description/:uid", routerController.updateUserDescription)
userRouter.get("/get-description/:uid", routerController.getUserDescription) */

// TODO 
/* Skip watch and learn as keywords
 */

