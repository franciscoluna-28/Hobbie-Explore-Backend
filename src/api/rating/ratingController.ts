import { Response, Request } from "express";
import { RatingRepository } from "./ratingRepository";

export class RatingController {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();

    this.rateActivity = this.rateActivity.bind(this);
    this.getCurrentUserRating = this.getCurrentUserRating.bind(this);
    this.getReviewsAndAverageRating =
      this.getReviewsAndAverageRating.bind(this);
  }

  async rateActivity(req: Request, res: Response) {
    try {
      const { uid, activityId, rating } = req.body;

      const activityToRate = await this.ratingRepository.rateActivity(
        uid,
        activityId,
        rating
      );

      console.log("ID IS", activityToRate);
      return res.status(200).json(activityToRate);
    } catch (error) {
      console.error("Error while rating activity:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while rating the activity" });
    }
  }

  async getCurrentUserRating(req: Request, res: Response) {
    try {
      const { uid, activityId } = req.params;

      const currentActivityRatingByUser =
        await this.ratingRepository.getUserRatingInActivity(uid, activityId);

      return res.status(200).json(currentActivityRatingByUser);
    } catch (error) {
      console.error(
        "Error while getting the current rating in this activity...",
        error
      );
      return res
        .status(500)
        .json({ error: "There was an error while getting the current rating" });
    }
  }

  async getReviewsAndAverageRating(req: Request, res: Response) {
    try {
      const { activityId } = req.params;

      const { averageRatingToFixed, ratingsLength } =
        await this.ratingRepository.getNumberOfReviewsAndAverageRating(
          activityId
        );

      return res.status(200).json({ averageRatingToFixed, ratingsLength });
    } catch (error) {
      console.error("Error while getting reviews and average rating:", error);
      return res.status(500).json({
        error: "An error occurred while getting reviews and average rating",
      });
    }
  }
}
