    import { Model } from "mongoose";
import UserModel from "../userModel";
import { IUser } from "../../../types/userTypes";
import { findUserByUid } from "../../../helpers/userRepositoryHelper";

export class UserDescriptionRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  // TODO only users with their own ID can update the description
  async updateUserDescription(uid: string, newText: string) {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);
      if (!currentUser) {
        throw new Error("User not found!");
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        { description: newText },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found after update!");
      }

      return updatedUser;
    } catch (error: any) {
      console.error(`Error updating the user's description for ${uid}:`, error);
      throw new Error(`Failed to update user's description for ${uid}`);
    }
  }

  // TODO add authorization to see user description if needed
  async getUserDescription(uid: string) {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);
      if (!currentUser) {
        throw new Error("User not found!");
      }

      return currentUser.description;
    } catch (error) {
      console.error(
        "There was an error getting the current user description",
        error
      );
    }
  }
}
