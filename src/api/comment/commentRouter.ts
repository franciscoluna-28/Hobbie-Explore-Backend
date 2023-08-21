import { Router } from "express";
import { CommentController } from "./commentController";
const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post("/add-comment-in-activity", commentController.addNewComment);
commentRouter.get(
  "/get-comments-from-activity/:activityId",
  commentController.getAllCommentsFromActivity
);
commentRouter.delete(
  "/remove-comment-from-activity/:uid/:commentId",
  commentController.removeCommentFromActivity
);
commentRouter.post(
  "/edit-comment-from-activity/:uid/:commentId",
  commentController.editComment
);

export default commentRouter;
