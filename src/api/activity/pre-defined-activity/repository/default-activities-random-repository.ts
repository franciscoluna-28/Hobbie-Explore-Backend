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

const numberOfActivitiesToCreate = 6;

/**
 * Repository for generating random activities.
 */
export class DefaultRandomActivityRepository {
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
    name: string
  ): Promise<IPredefinedActivity> {
    try {
      const existingActivity = await DefaultActivityModel.findOne({
        name: name,
      });
      if (existingActivity) {
        console.log(`Fetched activity from: Database`);
        console.log(
          `Duplicated activity with name: ${name}. It won't be added to the DB...`
        );
        return existingActivity;
      }

      // Check if an activity with the same name exists in the database
      const activityWithSameName = await DefaultActivityModel.findOne({
        name: name,
      });

      if (activityWithSameName) {
        console.log(
          `An activity with name "${name}" already exists in the database. Skipping...`
        );
        return activityWithSameName;
      }

      const boredApiActivity = await getActivityFunction();
      const unsplashImage = await getUnsplashImageWithQuery(
        boredApiActivity.name
      );

      const newActivity = new DefaultActivityModel({
        ...boredApiActivity,
        ...unsplashImage,
        averageRating: 0,
        reviews: 0,
      });

      await newActivity.save();

      console.log(`Saved new activity from: API with name ${name}`);
      return newActivity;
    } catch (error) {
      // TODO: Avoid getting duplicated activities from the database
      console.error("Error:", error);
      const randomActivity = DefaultActivityModel.findOne({});
      return randomActivity as any;
    }
  }

  /**
   * Gets a random activity for the user using information from the BoredAPI.
   *
   * @param {BoredAPIActivityType} query - Optional query type from BoredAPI.
   * @returns {Promise<IPredefinedActivity>} A promise resolving to a user-ready activity.
   * @throws {Error} If there's an issue fetching or processing the activity.
   */
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IPredefinedActivity> {
    let fetchedActivity;
    let activityName;

    do {
      fetchedActivity = await getOneRandomActivityWithQuery(query);
      activityName = fetchedActivity.name;
    } while (await this.checkIfActivityExists(activityName));

    return this.fetchAndGenerateActivity(
      getOneRandomActivityWithQuery.bind(null, query),
      activityName
    );
  }

  private async checkIfActivityExists(name: string): Promise<boolean> {
    const existingActivity = await DefaultActivityModel.findOne({
      name: name,
    });
    return !!existingActivity;
  }

  /**
   * Generates a list of random activities using the provided generator function.
   *
   * @param {Function} generatorFunction - The function to generate a single activity.
   * @returns {Promise<IPredefinedActivity[]>} A promise resolving to an array of activities.
   */
  private async generateActivityList(
    generatorFunction: () => Promise<IPredefinedActivity>
  ): Promise<IPredefinedActivity[]> {
    const promises = Array.from(
      { length: numberOfActivitiesToCreate },
      generatorFunction
    );
    return Promise.all(promises);
  }

  /**
   * Gets a single random activity for the user using the provided function and query.
   *
   * @param {Function} getActivityFunction - The function to retrieve a random activity.
   * @param {BoredAPIActivityType} query - Optional query type from BoredAPI.
   * @returns {Promise<IPredefinedActivity>} A promise resolving to a user-ready activity.
   */
  private async getRandomActivityToUser(
    getActivityFunction: () => Promise<ProcessedBoredAPIModifiedActivity>,
    query: BoredAPIActivityType
  ): Promise<IPredefinedActivity> {
    const activity = await getActivityFunction();
    const activityName = activity.name;

    if (query) {
      return this.getOneRandomActivityToUserUsingQuery(query);
    } else {
      return this.fetchAndGenerateActivity(getActivityFunction, activityName);
    }
  }

  /**
   * Generates an array of three random activities for the user.
   *
   * @param {BoredAPIActivityType} query - Optional query type from BoredAPI.
   * @returns {Promise<IPredefinedActivity[]>} A promise resolving to an array of activities.
   */
  public getThreeRandomActivitiesToUser = async (
    query?: BoredAPIActivityType
  ): Promise<IPredefinedActivity[]> => {
    return this.generateActivityList(() =>
      this.getRandomActivityToUser(
        query
          ? getOneRandomActivityWithQuery.bind(null, query)
          : getOneRandomActivity,
        query!
      )
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
