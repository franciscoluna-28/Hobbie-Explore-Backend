import { Model } from "mongoose";
import { IUser } from "../../../types/userTypes";
import {
  findUserByUid,
  getTotalActivitiesForUser,
} from "../../../helpers/userRepositoryHelper";
import { IPredefinedActivityIDArray } from "../../../types/activityTypes";
import ActivityModel from "../../activity/activityModel";
import CommentModel from "../../comment/commentModel";
import { CategoryCounts } from "../../../types/statsType";

export class UserStatsRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }
  async getFavoriteCategories(uid: string) {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);
      if (!currentUser) {
        throw new Error("User not found");
      }
  
      const currentUserActivities = currentUser.savedDefaultActivities;
  
      const activities = await ActivityModel.find({
        id: { $in: currentUserActivities },
      });
  
      const categoryCounts: CategoryCounts = activities.reduce(
        (counts, activity) => {
          const { type } = activity;
          counts[type] = (counts[type] || 0) + 1;
          return counts;
        },
        {} as CategoryCounts
      );
  
      const favoriteCategories = Object.entries(categoryCounts).map(
        ([category, count]) => ({ category, count })
      );
  
      return favoriteCategories; // This is an array of objects
    } catch (error) {
      console.error("Error retrieving user favorite categories:", error);
      throw new Error("An error occurred while retrieving user favorite categories");
    }
  }
  
  
  // Gets the user current stats within the global app
  async getUserTotalStats(uid: string) {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);
      if (!currentUser) {
        throw new Error("User not found");
      }

      const userTotalComments = await CommentModel.countDocuments({
        userUid: uid,
      }); // Use countDocuments for efficiency
      const userTotalSavedActivities = await getTotalActivitiesForUser(
        this.userModel,
        uid
      );

      return {
        totalComments: userTotalComments,
        totalSavedActivities: userTotalSavedActivities,
      };
    } catch (error) {
      console.error("Error getting user total stats:", error);
      throw new Error("An error occurred while getting user total stats");
    }
  }
}
