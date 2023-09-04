import { Model, Document } from "mongoose";
import { findUserByUid } from "../../../helpers/userRepositoryHelper";
import { IUser } from "../../../types/userTypes";
import { isActivitySavedByUserProperty } from "./is-activity-saved-by-user";

// Define a generic function to remove an activity from a user's property
async function removeFromUserProperty<T extends Document>(
  userModel: Model<T>,
  user: T,
  propertyName: keyof IUser,
  id: string
): Promise<void> {
  try {
    const updateQuery: Record<string, any> = {};
    updateQuery[propertyName] = id;

    // Use $pull to remove the item from the specified property
    await userModel.updateOne({ _id: user._id }, { $pull: updateQuery });
  } catch (error) {
    console.error("Error removing activity from user's property:", error);
    throw new Error(
      "An error occurred while removing the activity from the user's property"
    );
  }
}

// Define a generic function to delete an activity from a user's property
async function deleteFromUserProperty(
  userModel: Model<IUser>,
  uid: string,
  propertyName: keyof IUser, // Make propertyName a parameter
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    const currentUser: IUser | null = await findUserByUid(userModel, uid);

    if (!currentUser) {
      return { error: "User not found" };
    }

    if (!(await isActivitySavedByUserProperty(currentUser, propertyName, id))) {
      return { error: "Activity not found in user's property" };
    }

    await removeFromUserProperty(userModel, currentUser, propertyName, id);

    // We obtain a success message
    return { success: true };
  } catch (error) {
    console.error("Error deleting activity from user's property:", error);
    throw new Error(
      "An error occurred while deleting the activity from the user's property"
    );
  }
}

export { deleteFromUserProperty };
