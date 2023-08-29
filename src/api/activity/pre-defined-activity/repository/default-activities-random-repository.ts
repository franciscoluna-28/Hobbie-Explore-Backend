import {
  IActivityCard,
  IPredefinedActivity,
} from "../../../../types/activityTypes";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../../../boredAPI/getActivitiesFromAPI";
import { getUnsplashImageWithQuery } from "../../../unsplashImage/getImageWithQuery";
import { RatingRepository } from "../../../rating/ratingRepository";
import {
  BoredAPIActivityType,
  ProcessedBoredAPIModifiedActivity,
} from "../../../../types/boredAPITypes";
import DefaultActivityModel from "../../default-activity-model";

// Default activity random repository
export class DefaultRandomActivityRepository {
  private ratingRepository: RatingRepository;

  // TODO: Apply singeton to this instance
  // We initialize an instance of the rating repository
  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  /**
   * Fetches a random activity from the API, processes it, and returns it for the user.
   *
   * @param {Function} getActivityFunction - The function to retrieve a random activity from the API.
   * @param {string} queryId - The ID used to check for existing instances in the database.
   * @param {string} name - The name of the activity.
   * @returns {Promise<IPredefinedActivity>} A promise resolving to the user-ready activity.
   * @throws {Error} If there's an issue fetching or processing the activity.
   */
  private async fetchAndGenerateActivity(
    getActivityFunction: () => Promise<ProcessedBoredAPIModifiedActivity>,
    queryId: string,
    name: string
  ): Promise<IPredefinedActivity> {
    try {
      // Check if the activity exists in the database using the queryId or name
      const existingActivity = await DefaultActivityModel.findOne({
        $or: [{ id: queryId }, { name: name }],
      });

      // If it exists, we get it from the database to avoid making unnecessary queries
      // API calls to Unsplash.
      if (existingActivity) {
        console.log(`Fetched activity from: Database`);
        console.log(
          `Duplicated activity with name: ${name}. It won't be added to the DB...`
        );

        return existingActivity;
      }

      // If the activity is not found in the database, meaning that it doesn't exist yet
      // We get the image from Unsplash and create the actual activity
      const boredApiActivity = await getActivityFunction();
      const unsplashImage = await getUnsplashImageWithQuery(
        boredApiActivity.name
      );

      // And since it's a new activity, we verify the ratings in case they exits
      // EX: Using an old version of the API
      const { ratingsLength, averageRatingToFixed: averageRating } =
        await this.ratingRepository.getNumberOfReviewsAndAverageRating(
          boredApiActivity.id
        );

      // Create the new activity with its respective model
      const newActivity = new DefaultActivityModel({
        ...boredApiActivity,
        ...unsplashImage,
        id: queryId,
        averageRating: averageRating,
        reviews: ratingsLength,
      });

      // Save activity in the DB and retrieve it at the end
      await newActivity.save();

      console.log(`Saved new activity from: API`);
      return newActivity;
    } catch (error) {
      // If the external API requests fail, get up to 3 random activities from the database
      console.error("Error:", error);

      const dbActivities = await DefaultActivityModel.aggregate([
        { $sample: { size: 3 } },
      ]);

      console.log(`Fetched activities from: Database`);
      return dbActivities as any;
    }
  }

  /**
   * Gets a random activity for the user using information from the BoredAPI.
   *
   * @returns {Promise<IPredefinedActivity>} A promise resolving to a user-ready activity.
   * @throws {Error} If there's an issue fetching or processing the activity.
   */
  private async getOneRandomActivityToUser(): Promise<IPredefinedActivity> {
    const myActivity = getOneRandomActivity();
    const activityId = (await myActivity).id;
    const activityName = (await myActivity).name;

    // And we use its information to use our helper function
    return this.fetchAndGenerateActivity(
      getOneRandomActivity,
      activityId,
      activityName
    );
  }
  // Function to get one activity to the user but using a query
  // The queries are the types from BoredAPI
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IActivityCard> {
    const myActivity = getOneRandomActivityWithQuery(query);
    const activityId = (await myActivity).id;
    const activityName = (await myActivity).name;

    // We use our helper function too here to get the final activity
    return this.fetchAndGenerateActivity(
      getOneRandomActivityWithQuery.bind(null, query),
      activityId,
      activityName
    );
  }

  // Generate a list with the different activities obtained
  private async generateActivityList(
    generatorFunction: () => Promise<IActivityCard>
  ): Promise<IActivityCard[]> {
    const promises = Array.from({ length: 3 }, generatorFunction);
    return Promise.all(promises);
  }

  // Create three activities using the generateActivityList function
  public getThreeRandomActivitiesToUser = async (): Promise<
    IActivityCard[]
  > => {
    return this.generateActivityList(
      this.getOneRandomActivityToUser.bind(this)
    );
  };

  // Create three activities using a query string and generateActivityList
  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<IActivityCard[]> => {
    return this.generateActivityList(() =>
      this.getOneRandomActivityToUserUsingQuery(query)
    );
  };
}
