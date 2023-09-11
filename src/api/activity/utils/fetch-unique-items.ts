import { Model, Document } from "mongoose";
import { IUser } from "../../../types/userTypes";
import { isActivitySavedByUserProperty } from "./is-activity-saved-by-user";
import { IPredefinedActivity } from "../../../types/activityTypes";
import { BoredAPIActivityType } from "../../../types/boredAPITypes";

export type ActivityWithSavedState = {
  activity: IPredefinedActivity;
  savedByUser: boolean;
};

export async function fetchActivities<T extends Document & IPredefinedActivity>(
  activityModel: Model<T>,
  numberOfActivitiesToCreate: number,
  type?: BoredAPIActivityType
): Promise<T[]> {
  const aggregationQuery = type ? { type } : {};

  try {
    return await activityModel.aggregate([
      { $match: aggregationQuery },
      { $sample: { size: numberOfActivitiesToCreate } },
    ]);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export async function getActivitySavedState(
  userModel: Model<IUser>,
  userUID: string,
  propertyName: keyof IUser,
  activityId: string
): Promise<boolean> {
  try {
    const user = await userModel.findOne({ uid: userUID });

    if (!user) {
      throw new Error("User not found");
    }

    return await isActivitySavedByUserProperty(user, propertyName, activityId);
  } catch (error) {
    console.error("Error checking if activity is saved by user:", error);
    return false;
  }
}

export async function fetchUniqueActivitiesWithSavedState<
  T extends Document & IPredefinedActivity
>(
  userModel: Model<IUser>,
  activityModel: Model<T>,
  userUID: string,
  propertyName: keyof IUser,
  numberOfActivitiesToCreate: number,
  type?: BoredAPIActivityType
): Promise<ActivityWithSavedState[]> {
  try {
    const activities = await fetchActivities(
      activityModel,
      numberOfActivitiesToCreate,
      type
    );

    const results = await Promise.all(
      activities.map(async (activity) => {
        const savedByUser = await getActivitySavedState(
          userModel,
          userUID,
          propertyName,
          activity._id.toString()
        );
        return { activity, savedByUser };
      })
    );

    return results;
  } catch (error) {
    console.error("Error fetching unique items with saved state:", error);
    return [];
  }
}
