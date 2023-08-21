import { Router } from "express";
import { RatingController } from "./ratingController";

const ratingRouter = Router()

const ratingController = new RatingController();

ratingRouter.post("/rate-activity", ratingController.rateActivity)
ratingRouter.get("/current-rating-in-activity/:uid/:activityId", ratingController.getCurrentUserRating)
ratingRouter.post("/get-reviews-and-average-rating", ratingController.getReviewsAndAverageRating)

export default ratingRouter;