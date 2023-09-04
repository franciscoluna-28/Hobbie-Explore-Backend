import { IPredefinedActivity } from "../../../types/activityTypes";
import { myCache } from "../../../middlewares/cache-middleware";
import { ProcessedBoredAPIModifiedActivity } from "../../../types/boredAPITypes";
import DefaultActivityModel from "../pre-defined-activity/default-activity-model";
import { getRandomUnfetchedActivityFromDatabase } from "./getRandomUnfetchedActivitiyFromDatabase";
import { getUnsplashImageWithQuery } from "../../unsplashImage/getImageWithQuery";

/**
 * Fetches an activity from the API or the database.
 *
 * @param {Function} getActivityFunction - The function to retrieve an activity from the API.
 * @param {string} name - The name of the activity.
 * @param {string} type - The type of the activity.
 * @param {Set<string>} fetchedActivityIds - A set of fetched activity IDs.
 * @returns {Promise<IPredefinedActivity>} A promise resolving to the fetched activity.
 */
async function fetchActivity(
  getActivityFunction: () => Promise<ProcessedBoredAPIModifiedActivity>,
  name: string,
  type: string,
  fetchedActivityIds: Set<string>
): Promise<IPredefinedActivity> {
  const activityId = `${name}:${type}`;
  const cacheKey = activityId;
  const cachedActivity = myCache.get<IPredefinedActivity>(cacheKey);

  if (cachedActivity) {
    return cachedActivity;
  }

  if (fetchedActivityIds.has(activityId)) {
    console.log(
      `Activity with name "${name}" and type "${type}" has already been fetched. Skipping...`
    );
    return getRandomUnfetchedActivityFromDatabase(
      DefaultActivityModel,
      new Set<string>()
    );
  }

  const existingActivity = await DefaultActivityModel.findOne({ name, type });

  if (existingActivity) {
    console.log(
      `Activity with name "${name}" and type "${type}" already exists in the database. Returning existing activity...`
    );

    return existingActivity;
  }

  try {
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
    fetchedActivityIds.add(activityId);
    console.log(`Saved new activity from: API with name ${name}`);
    myCache.set(cacheKey, newActivity);

    return newActivity;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Fetches and generates an activity from either the API or the database.
 *
 * @param {Function} getActivityFunction - The function to retrieve an activity.
 * @param {string} name - The name of the activity.
 * @param {string} type - The type of the activity.
 * @param {Set<string>} fetchedActivityIds - A set of fetched activity IDs.
 * @returns {Promise<IPredefinedActivity>} A promise resolving to the fetched and generated activity.
 */
async function fetchAndGenerateActivity(
  getActivityFunction: () => Promise<ProcessedBoredAPIModifiedActivity>,
  name: string,
  fetchedActivityIds: Set<string>,
  type?: string
): Promise<IPredefinedActivity> {
  return fetchActivity(
    getActivityFunction,
    name,
    type || "",
    fetchedActivityIds
  );
}

/**
 * Generates an activity from either the API or the database.
 *
 * @param {Function} getActivityFunction - The function to retrieve an activity.
 * @param {string} name - The name of the activity.
 * @param {string} type - The type of the activity.
 * @param {Set<string>} fetchedActivityIds - A set of fetched activity IDs.
 * @returns {Promise<IPredefinedActivity>} A promise resolving to the generated activity.
 */
export async function generateActivity(
  getActivityFunction: () => Promise<ProcessedBoredAPIModifiedActivity>,
  name: string,
  fetchedActivityIds: Set<string>,
  type?: string
): Promise<IPredefinedActivity> {
  if (type) {
    // Fetch activity by type
    return fetchAndGenerateActivity(
      getActivityFunction,
      name,
      fetchedActivityIds,
      type
    );
  } else {
    // Fetch random activity (type doesn't matter)
    return fetchAndGenerateActivity(
      getActivityFunction,
      name,
      fetchedActivityIds
    );
  }
}
