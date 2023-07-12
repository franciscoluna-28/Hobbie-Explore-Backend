import { Router } from "express";
import { UserController } from "./userController";

const userRouter = Router();

const routerController = new UserController();

userRouter.post("/register-user", routerController.registerUser);
userRouter.post("/register-user-token/:uid", routerController.addTokenToUser);
userRouter.post("/add-activity-to-user/:uid", routerController.addActivityToUser);
userRouter.delete("/remove-activity-from-user/:uid", routerController.deleteActivityFromUser);

export default userRouter;
