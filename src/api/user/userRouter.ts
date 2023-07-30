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
);
userRouter.delete("/delete-user/:uid", routerController.deleteUser);
/* userRouter.post("/rate-activity", routerController.rateActivity);
userRouter.post(
  "/get-rating-in-activity",
  routerController.getCurrentUserRating
); */
/* userRouter.post("/comment-activity", routerController.addCommentToActivity); */
/* userRouter.post("/get-activity-comments", routerController.getActivityComments)
userRouter.post("/edit-comment", routerController.editComment) */


export default userRouter;
