import DefaultActivityModel from "../../default-activity-model";
import { BoredAPIActivityType } from "../../../../types/boredAPITypes";
import { IPredefinedActivity } from "../../../../types/activityTypes";

const numberOfActivitiesToCreate = 6;

/**
 * Repository for generating random activities.
 */
export class DefaultRandomActivityRepository {
  fetchedActivityIds: Set<string>;

  constructor() {
    this.fetchedActivityIds = new Set();
  }

  async fetchUniqueActivities(type?: BoredAPIActivityType): Promise<IPredefinedActivity[]> {
    const aggregationQuery = type ? { type } : {};

    try {
      const uniqueActivities: IPredefinedActivity[] = await DefaultActivityModel.aggregate([
        { $match: aggregationQuery },
        { $sample: { size: numberOfActivitiesToCreate } },
      ]);

      return uniqueActivities;
    } catch (error) {
      console.error("Error fetching unique activities:", error);
      return [];
    }
  }
  
  async getThreeRandomActivitiesToUser(type?: BoredAPIActivityType): Promise<IPredefinedActivity[]> {
    this.resetFetchedActivityIds();
    return this.fetchUniqueActivities(type);
  }

  resetFetchedActivityIds() {
    this.fetchedActivityIds.clear();
  }
}
