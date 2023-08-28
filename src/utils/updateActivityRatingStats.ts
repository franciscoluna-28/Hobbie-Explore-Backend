import RatingModel from "../api/rating/ratingModel";
import PredefinedActivityModel from "../api/activity/default-activity-model";

export async function updateActivityRatingStats(activityId: string) {
  try {
    const reviews = await RatingModel.find({ activityId });

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    const averageRatingToFixed = Number(averageRating.toFixed(2));

    const ratingsLength = reviews.length;

    await PredefinedActivityModel.updateOne(
      { id: activityId },
      {
        $set: {
          averageRating: averageRatingToFixed,
          reviews: ratingsLength,
        },
      }
    );

    console.log(`Updated rating stats for activity ${activityId}`);
  } catch (error) {
    console.error("Error while updating activity rating stats:", error);
    throw new Error("An error occurred while updating activity rating stats");
  }
}





