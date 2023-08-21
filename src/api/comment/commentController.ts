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
    this.removeCommentFromActivity = this.removeCommentFromActivity.bind(this);
    this.editComment = this.editComment.bind(this);
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

      const commentsFromActivity =
        await this.commentRepository.getAllCommentsInActivity(activityId);

      return res.status(200).json(commentsFromActivity);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Couldn't find comments from existing activity" });
    }
  }

  async removeCommentFromActivity(req: Request, res: Response) {
    try {
      const { uid, commentId } = req.params;    
      console.log(commentId, uid)
      const deleteResult =
        await this.commentRepository.removeCommentFromActivity(
          uid,
          commentId,
        );



      if (
        deleteResult &&
        deleteResult.deletedCount &&
        deleteResult.deletedCount > 0
      ) {
        return res
          .status(200)
          .json({ message: "Comment successfully deleted" });
      } else {
        return res
          .status(404)
          .json({ error: "Comment not found or unable to remove." });
      }
    } catch (error) {
      console.error("There was an error while deleting the comment", error);
      return res
        .status(500)
        .json({ error: "Error while deleting the comment" });
    }
  }

  async editComment(req: Request, res: Response) {
    try {
      const { uid, commentId } = req.params;
      const { newText } = req.body;

      console.log(newText);

      const updatedComment = await this.commentRepository.editComment(
        uid,
        commentId,
        newText
      );

      if (updatedComment) {
        return res.status(200).json(updatedComment);
      } else {
        return res
          .status(404)
          .json({ error: "Comment not found or unable to edit." });
      }
    } catch (error) {
      console.error("There was an error while editing the comment", error);
      return res.status(500).json({ error: "Error while editing the comment" });
    }
  }
}
