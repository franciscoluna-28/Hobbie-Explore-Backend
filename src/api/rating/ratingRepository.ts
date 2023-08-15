import RatingModel, { IUserRating } from "./ratingModel";
import UserModel from "../user/userModel";
import { IUser } from "../../types/userTypes";
import ActivityModel from "../activity/activityModel";

export class RatingRepository {
  async rateActivity(uid: string, activityId: string, rating: number) {
    try {
      // Buscar el usuario por su UID
      const currentUser = await UserModel.findOne({ uid });

      if (!currentUser) {
        throw new Error("User not found");
      }

      // Verificar si el rating ya existe para esta actividad y usuario
      const existingRating = await RatingModel.findOne({
        userId: currentUser._id,
        activityId,
      });

      if (existingRating) {
        // Si el rating ya existe, actualizar el rating existente con el nuevo valor
        existingRating.rating = rating;
        await existingRating.save();
      } else {
        // Si el rating no existe, crear un nuevo documento de rating
        const newRating: IUserRating = new RatingModel({
          userId: currentUser._id,
          activityId,
          rating,
        });

        console.log(newRating);
        await newRating.save();
      }

      console.log(
        `User with UID ${uid} rated activity ${activityId} with ${rating} stars.`
      );
    } catch (error) {
      console.error("Error while rating activity:", error);
      throw new Error("An error occurred while rating the activity");
    }
  }

  async getUserRatingInActivity(uid: string, activityId: string) {
    try {
      const currentUser = await UserModel.findOne({ uid });

      if (!currentUser) {
        throw new Error("User not found");
      }

      const userRating = await RatingModel.findOne({
        userId: currentUser._id,
        activityId,
      });

      return userRating ? userRating.rating : 0;
    } catch (error) {
      console.error("Error while getting user rating in activity:", error);
      throw new Error(
        "An error occurred while getting user rating in activity"
      );
    }
  }

  async getNumberOfReviewsAndAverageRating(activityId: string) {
    try {
      console.log(activityId);

      const reviews = await RatingModel.find({ activityId: activityId });

      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating =
        reviews.length > 0 ? totalRating / reviews.length : 0;

      const averageRatingToFixed = averageRating.toFixed(2);

      const ratingsLength = reviews.length;

      console.log(totalRating, averageRatingToFixed, ratingsLength);

      await ActivityModel.updateOne(
        { activityId: activityId },
        {
          $set: {
            ratingMean: averageRating,
            totalReviews: ratingsLength,
          },
        }
      );

      return { reviews, averageRatingToFixed, ratingsLength };
    } catch (error) {
      console.error("Error while getting reviews and average rating:", error);
      throw new Error(
        "An error occurred while getting reviews and average rating"
      );
    }
  }
}
