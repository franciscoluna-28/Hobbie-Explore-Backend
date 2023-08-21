import {
  IPredefinedActivity,
  IActivityCard,
} from "../../../../types/activityTypes";
import { IUserRating } from "../../../rating/ratingModel";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../../../boredAPI/getActivitiesFromAPI";
import { getUnsplashImageWithQuery } from "../../../unsplashImage/getImageWithQuery";
import { RatingRepository } from "../../../rating/ratingRepository";
import { BoredAPIActivityType } from "../../../../types/boredAPITypes";

// Repository that contains the logic to handle random activities
// from the API
export class PredefinedRandomActivityRepository {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository(); // TODO avoid creating multiple instances
  }

  private async getOneRandomActivityToUser(): Promise<IActivityCard> {
    const boredApiActivity = await getOneRandomActivity();
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.name
    );

    const { ratingsLength, averageRatingToFixed: averageRating } =
      await this.ratingRepository.getNumberOfReviewsAndAverageRating(
        boredApiActivity.id
      );

    const customActivity: IActivityCard = {
      ...boredApiActivity,
      ...unsplashImage,
      averageRating: averageRating,
      reviews: ratingsLength,
    };

    return customActivity;
  }

  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IActivityCard> {
    const boredApiActivity = await getOneRandomActivityWithQuery(query);
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.name
    );

    const { ratingsLength, averageRatingToFixed: averageRating } =
      await this.ratingRepository.getNumberOfReviewsAndAverageRating(
        boredApiActivity.id
      );

    const customActivity: IActivityCard = {
      ...boredApiActivity,
      ...unsplashImage,
      averageRating: averageRating,
      reviews: ratingsLength,
    };

    return customActivity;
  }

  public getThreeRandomActivitiesToUser = async (): Promise<
    IActivityCard[]
  > => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUser()
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<IActivityCard[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUserUsingQuery(query)
    );
    const activities = await Promise.all(promises);
    return activities;
  };
}
