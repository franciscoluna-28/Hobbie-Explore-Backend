import CustomActivityModel from "../custom-activity-model";
import { ICustomActivity } from "../../../../types/activityTypes";
import UserModel from "../../../user/userModel";
import paginateModel from "../../utils/get-user-activities";

class CustomActivityActions {
  async addCustomActivity(activityData: ICustomActivity, uid: string) {
    try {
      const newCustomActivity = new CustomActivityModel(activityData);

      console.log(newCustomActivity);
      const savedActivity = await newCustomActivity.save();

      if (savedActivity) {
        // Use findOneAndUpdate to add the ID to the createdActivities array
        const updatedUser = await UserModel.findOneAndUpdate(
          { uid: uid },
          { $addToSet: { createdActivities: savedActivity._id } },
          { new: true }
        );

        if (!updatedUser) {
          return {
            error: "There was an error adding the activity to the user list.",
          };
        }

        return savedActivity;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error adding custom activity:", error);
      return null;
    }
  }

  async deleteCustomActivityFromDatabase(id: string, uid: string) {
    try {
      // Find the custom activity by its ID
      const customActivity = await CustomActivityModel.findById(id);

      if (!customActivity) {
        return false; // Activity not found
      }

      // Check if the user's UID matches the UID of the activity's creator
      if (customActivity.userUID !== uid) {
        return false; // User is not authorized to delete this activity
      }

      const deletedActivity = await CustomActivityModel.findByIdAndDelete(id);
      return deletedActivity ? true : false;
    } catch (error) {
      console.error("Error deleting custom activity:", error);
      return null;
    }
  }

  async getUserActivities(uid: string, page: number, limit: number) {
    try {
      const user = await UserModel.findOne({ uid });

      if (!user) {
        return {
          error: "User not found",
        };
      }

      const conditions = { userUID: uid };
      const options = {
        page,
        limit,
      };

      const result = await paginateModel(
        CustomActivityModel,
        conditions,
        options
      );

      return result;
    } catch (error) {
      console.error("Error getting user activities:", error);
      throw new Error("An error occurred while getting user activities");
    }
  }
}

export default CustomActivityActions;