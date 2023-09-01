import { IUser } from "../../../../types/userTypes";
import UserModel from "../../../user/userModel";
import DefaultActivityModel from "../../default-activity-model";
import { findUserByUid } from "../../../../helpers/userRepositoryHelper";
import { Model } from "mongoose";

/**
 * Repository for managing user actions related to default activities.
 */
export default class DefaultActivityUserActionsRepository {
  private userModel: Model<IUser>;

  /**
   * Creates an instance of DefaultActivityUserActionsRepository.
   * @param {Model<IUser>} userModel - The Mongoose model for user data.
   */
  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  /**
   * Removes an activity from a user's savedDefaultActivities list.
   * @param {IUser} user - The user from which to remove the activity.
   * @param {string} id - The ID of the activity to remove.
   * @returns {Promise<void>} A promise that resolves once the activity is removed.
   * @throws {Error} Throws an error if there's an issue removing the activity.
   */
  private async removeActivityFromUser(user: IUser, id: string): Promise<void> {
    try {
      await this.userModel.updateOne(
        { uid: user.uid },
        { $pull: { savedDefaultActivities: id } }
      );
    } catch (error) {
      console.error("Error removing activity from user:", error);
      throw new Error(
        "An error occurred while removing the activity from the user"
      );
    }
  }

  /**
   * Checks if an activity is saved by the user.
   * @param {IUser} user - The user to check for saved activities.
   * @param {string} id - The ID of the activity to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the activity is saved by the user.
   */
  async isActivitySavedByUser(user: IUser, id: string): Promise<boolean> {
    const savedDefaultActivities = user.savedDefaultActivities || [];

    // If saved return a boolean value
    return savedDefaultActivities.includes(id);
  }

  /**
   * Deletes an activity from a user's saved list.
   * @param {string} uid - The UID of the user.
   * @param {string} id - The ID of the activity to delete.
   * @returns {Promise<{ success?: boolean; error?: string }>} A promise that resolves to an object indicating the result of the deletion.
   * @throws {Error} Throws an error if there's an issue deleting the activity.
   */
  async deleteActivityFromUser(
    uid: string,
    id: string
  ): Promise<{ success?: boolean; error?: string }> {
    try {
      const currentUser: IUser | null = await findUserByUid(
        this.userModel,
        uid
      );

      if (!currentUser) {
        return { error: "User not found" };
      }

      if (!(await this.isActivitySavedByUser(currentUser, id))) {
        return { error: "Activity not found in user's saved list" };
      }

      await this.removeActivityFromUser(currentUser, id);

      // We obtain a success message
      return { success: true };
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw new Error("An error occurred while deleting the activity");
    }
  }

  /**
   * Adds an activity ID to a user's savedDefaultActivities list.
   * @param {string} uid - The UID of the user.
   * @param {string} id - The ID of the activity to add.
   * @returns {Promise<{ success?: boolean; error?: string; newActivity?: IUser }>} A promise that resolves to an object indicating the result of adding the activity ID.
   * @throws {Error} Throws an error if there's an issue adding the activity ID.
   */
  async addActivityIdToUser(
    uid: string,
    id: string
  ): Promise<{ success?: boolean; error?: string; newActivity?: IUser }> {
    try {
      const currentUser = await this.userModel.findOne({ uid });

      if (!currentUser) {
        return { error: "User not found" };
      }

      if (await this.isActivitySavedByUser(currentUser, id)) {
        return { error: "Duplicated activity!" };
      }

      // Update the user's default activities collection
      const newActivity = await this.userModel.findOneAndUpdate(
        { uid: uid },
        { $addToSet: { savedDefaultActivities: id } },
        { new: true }
      );

      // Check for any errors here
      if (!newActivity) {
        return {
          error: "There was an error adding the activity to the user list.",
        };
      }

      // Return the new activty to the user
      return { success: true };
    } catch (error) {
      console.error("Error adding activity ID to user:", error);
      throw new Error(
        "An error occurred while adding the activity ID to the user"
      );
    }
  }

  /**
   * Gets user activities based on the savedDefaultActivities list.
   * @param {string} uid - The UID of the user.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The maximum number of activities per page.
   * @returns {Promise<any>} A promise that resolves to user activities.
   * @throws {Error} Throws an error if there's an issue retrieving user activities.
   */
  async getUserActivities(
    uid: string,
    page: number,
    limit: number
  ): Promise<any> {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);

      // Options to use with Mongoose Paginate V2 plugin

      const options = {
        page: page,
        limit: limit,
      };

      if (!currentUser) {
        throw new Error("User not found");
      }

      // Return an empty array in case the user doesn't have saved activities
      const activityIds = currentUser.savedDefaultActivities || [];

      console.log(activityIds);
      // Use pagination to handle the user's activities passing the options
      // Paginate is exactly the same as a find method, except that this one
      // Supports pagination out of the box
      const activities = await DefaultActivityModel.paginate(
        { _id: { $in: activityIds } },
        options
      );

      console.log(activities);

      return activities;
    } catch (error) {
      console.error("Error retrieving user activities:", error);
      throw new Error("An error occurred while retrieving user activities");
    }
  }

  async checkIfActivityIsSavedByUser(
    uid: string,
    activityId: string
  ): Promise<boolean> {
    try {
      const currentUser = await this.userModel.findOne({ uid });

      if (!currentUser) {
        console.error("Error retrieving the current user");
        throw new Error("Error retrieving the current user");
      }

      return currentUser.savedDefaultActivities.includes(activityId);
    } catch (error) {
      console.error("Error checking if activity is saved:", error);
      throw new Error("An error occurred while checking if activity is saved");
    }
  }
}
