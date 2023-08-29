  import { IUser } from "./../../../types/userTypes";
  import { Model } from "mongoose";
  import { IPredefinedActivityIDArray } from "../../../types/activityTypes";
  import { IPredefinedActivity } from "../../../types/activityTypes";
  import ActivityModel from "../../activity/default-activity-model";
  import { findUserByUid } from "../../../helpers/userRepositoryHelper";
  import { IActivityCard } from "../../../types/activityTypes";


  export class UserActivityRepository {
    private userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
      this.userModel = userModel;
    }

    private async removeActivityFromUser(user: IUser, id: string) {
      await this.userModel.updateOne(
        { uid: user.uid },
        { $pull: { savedDefaultActivities: { id: id } } }
      );
    }

    private async updateOrCreateActivity(activityData: IActivityCard) {
      const { id } = activityData;

      let existingActivity = await ActivityModel.findOne({ id });

      if (!existingActivity) {
        existingActivity = await ActivityModel.create({
          ...activityData,
        });
      }

      return existingActivity;
    }

    isActivitySavedByUser(user: IUser, id: string): boolean {
      const savedDefaultActivities = user.savedDefaultActivities;
      
      if (!savedDefaultActivities) {
        return false; 
      } 

      console.log("id", id)
      
      return savedDefaultActivities.includes(id);
    }

    async deleteActivityFromUser(uid: string, id: string) {
      try {
        const currentUser: IUser | null = await findUserByUid(
          this.userModel,
          uid
        );

        if (!currentUser) {
          return { error: "User not found" };
        }

        if (!this.isActivitySavedByUser(currentUser, id)) {
          return { error: "Activity not found in user's saved list" };
        }

        await this.removeActivityFromUser(currentUser, id);

        return { success: true };
      } catch (error) {
        console.error("Error deleting activity:", error);
        throw new Error("An error occurred while deleting the activity");
      }
    }

    async addActivityIdToUser(uid: string, id: string) {
      try {
        const currentUser = await this.userModel.findOne({ uid });

        if (!currentUser) {
          return { error: "User not found" };
        }

        const activityExists = currentUser.savedDefaultActivities.includes(id)
        

        if (activityExists) {
          return { error: "Duplicated activity!" }; 
        }

        const newActivity = await this.userModel.findOneAndUpdate(
          { uid: uid },
          { $addToSet: { savedDefaultActivities: id } }
        );

        return { success: true, newActivity };
      } catch (error) {
        console.error("Error adding activity ID to user:", error);
        throw new Error(
          "An error occurred while adding the activity ID to the user"
        );
      }
    }

    async addActivityToUserAndDatabase(uid: string, activityData: IActivityCard) {
      try {
        const { id } = activityData;

        const addActivityResult = await this.addActivityIdToUser(uid, id);
        if (addActivityResult.error) {
          return { error: addActivityResult.error };
        }

        const existingActivity = await this.updateOrCreateActivity(activityData);

        return { success: true, insertedActivity: existingActivity };
      } catch (error) {
        console.error("Error adding activity to user and database:", error);
        throw new Error(
          "An error occurred while adding the activity to the user and database"
        );
      }
    }

    // TODO implement a middleware to do pagination
    // It's kind of uncomfortable to do things this way
    async getUserActivities(uid: string, page: number) {
      try {
        const currentUser = await findUserByUid(this.userModel, uid);
        const options = {
          page: page,
          limit: 10,
        };
        if (!currentUser) {
          throw new Error("User not found");
        }

        const activityIds = currentUser.savedDefaultActivities;

        console.log(activityIds);

        const activities = await ActivityModel.paginate(
          { id: { $in: activityIds } },
          options
        );

        return activities.docs;
      } catch (error) {
        console.error("Error retrieving user activities:", error);
        throw new Error("An error occurred while retrieving user activities");
      }
    }
  }
