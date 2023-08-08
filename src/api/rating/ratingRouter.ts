import { Router } from "express";
import { RatingController } from "./ratingController";

const ratingRouter = Router()

const ratingController = new RatingController();

ratingRouter.post("/rate-activity", ratingController.rateActivity)
ratingRouter.post("/get-current-rating-in-activity", ratingController.getCurrentUserRating)
ratingRouter.post("/get-reviews-and-average-rating", ratingController.getReviewsAndAverageRating)

export default ratingRouter;