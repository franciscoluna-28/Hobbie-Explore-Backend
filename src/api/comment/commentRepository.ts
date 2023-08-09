import RatingModel from "../rating/ratingModel";
import UserModel from "../user/userModel";
import CommentModel, { IUserComment } from "./commentModel";

import { RatingRepository } from "../rating/ratingRepository";

export class CommentRepository {
  async addCommentToActivity(
    uid: string,
    activityId: string,
    commentText: string
  ) {
    const currentUser = await UserModel.findOne({ uid });

    if (!currentUser) {
      throw new Error("User not found");
    }

    if (commentText !== "") {
      const ratingRepository = new RatingRepository();
      const userRating = await ratingRepository.getUserRatingInActivity(
        uid,
        activityId
      );
      const newComment = new CommentModel({
        userUid: uid,
        text: commentText,
        activityId: activityId,
        userPfp: currentUser.toObject().photoURL,
        userName: currentUser.toObject().displayName,
        createdAt: new Date(),
        isContentModified: false,
        userRating: userRating
      });

      console.log(newComment);

      // Save to the database if everything was done correctly
      try {
        const createdComment = await CommentModel.create(newComment);
        return createdComment;
      } catch (error) {
        console.error("Error while adding comment:", error);
        // TODO add error handling
      }
    }
  }

  async getAllCommentsInActivity(activityId: string) {
    console.log(activityId);

    try {
      const activityComments = await CommentModel.find({
        activityId: activityId,
      });

      return activityComments;
    } catch (error) {
      console.error("Error while getting activity comments", error);
    }
  }
  async removeCommentFromActivity(
    uid: string,
    _id: string,
    activityId: string
  ) {
    try {
      const currentUser = await UserModel.findOne({ uid: uid });

      if (!currentUser || currentUser.toObject().uid !== uid) {
        console.error("You're not allowed to remove this comment");
        return;
      }

      const currentCommentToDelete = await CommentModel.deleteOne({
        userUid: uid,
        _id: _id,
        activityId: activityId,
      });

      if (
        currentCommentToDelete.deletedCount &&
        currentCommentToDelete.deletedCount > 0
      ) {
        console.log("Comment successfully removed:", currentCommentToDelete);
      } else {
        console.log("Comment not found or unable to remove.");
      }

      return currentCommentToDelete;
    } catch (error) {
      console.error("There was an error while deleting the comment", error);
    }
  }

  async editComment(
    uid: string,
    _id: string,
    activityId: string,
    newText: string
  ) {
    try {
      // Verificar si el usuario actual tiene permiso para editar el comentario.
      const currentUser = await UserModel.findOne({ uid: uid });

      if (!currentUser || currentUser.toObject().uid !== uid) {
        console.error("You're not allowed to edit this comment");
        return;
      }

      // Buscar el comentario que se desea editar por su '_id', 'activityId' y 'userUid'.
      const currentComment = await CommentModel.findOne({
        _id: _id,
        activityId: activityId,
        userUid: uid,
      });

      if (!currentComment) {
        console.error(
          "Comment not found or you don't have permission to edit it"
        );
        return;
      }

      // Actualizar el texto del comentario con el nuevo texto proporcionado.
      currentComment.text = newText;

      // Marcar el comentario como modificado (si es necesario).
      currentComment.isContentModified = true;

      // Guardar los cambios en la base de datos.
      const updatedComment = await currentComment.save();

      console.log("Comment successfully edited:", updatedComment);

      return updatedComment;
    } catch (error) {
      console.error("There was an error while editing the comment", error);
    }
  }
}
