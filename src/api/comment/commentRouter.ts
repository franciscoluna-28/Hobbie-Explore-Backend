import { Router } from "express";
import { CommentController } from "./commentController";
const commentRouter =  Router();

const commentController = new CommentController()

commentRouter.post("/add-comment-in-activity", commentController.addNewComment)
commentRouter.get("/get-comments-from-activity/:activityId", commentController.getAllCommentsFromActivity);


export default commentRouter;