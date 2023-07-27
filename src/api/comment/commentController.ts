import { CommentRepository } from "./commentRepository";
import { RatingRepository } from "./../rating/ratingRepository";
import { Response, Request } from "express";

export class CommentController {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
    this.addNewComment = this.addNewComment.bind(this);
    this.getAllCommentsFromActivity =
      this.getAllCommentsFromActivity.bind(this);
  }

  async addNewComment(req: Request, res: Response) {
    try {
      const { uid, activityId, commentText } = req.body;

      const commentToAdd = await this.commentRepository.addCommentToActivity(
        uid,
        activityId,
        commentText
      );

      return res.status(200).json(commentToAdd);
    } catch (error) {
      return res.status(500).json({ error: "Couldn't add comment" });
    }
  }

  async getAllCommentsFromActivity(req: Request, res: Response) {
    try {
      const { activityId } = req.params;

      const commentsFromActivity = await
        this.commentRepository.getAllCommentsInActivity(activityId);

      return res.status(200).json(commentsFromActivity);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Couldn't find comments from existing activity" });
    }
  }
}
