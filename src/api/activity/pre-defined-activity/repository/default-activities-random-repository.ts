import { createFetchUniqueActivities } from "../../utils/fetch-unique-items";
import { BoredAPIActivityType } from "../../../../types/boredAPITypes";
import { IPredefinedActivity } from "../../../../types/activityTypes";
import { Model } from "mongoose";
import { RANDOM_ACTIVITIES_VALUE } from "../../../constants/number-of-activities";
export class DefaultRandomActivityRepository {
  fetchedActivityIds: Set<string>;
  fetchUniqueActivities: (type?: BoredAPIActivityType) => Promise<IPredefinedActivity[]>;

  constructor(model: Model<IPredefinedActivity>) {
    this.fetchedActivityIds = new Set();
    this.fetchUniqueActivities = createFetchUniqueActivities<IPredefinedActivity, Model<IPredefinedActivity>>(
      model, RANDOM_ACTIVITIES_VALUE
    );
  }

  async getThreeRandomActivitiesToUser(type?: BoredAPIActivityType): Promise<IPredefinedActivity[]> {
    this.resetFetchedActivityIds();
    return this.fetchUniqueActivities(type);
  }

  resetFetchedActivityIds() {
    this.fetchedActivityIds.clear();
  }
}