import { Router } from "express";
import { UserController } from "./userController";

const userRouter = Router();

const routerController = new UserController();

userRouter.post("/register-user", routerController.registerUser);
userRouter.post("/register-user-token/:uid", routerController.addTokenToUser);
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
); // TODO we shall change the name of this route to get current activities
userRouter.delete("/delete-user/:uid", routerController.deleteUser);
userRouter.get("/get-activities-ids/:uid", routerController.getSavedActivitiesIds)
userRouter.get("/get-favority-categories/:uid", routerController.getFavorityCategories)

// TODO 
/* Skip watch and learn as keywords
 */
export default userRouter;
