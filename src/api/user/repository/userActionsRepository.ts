import { Model } from "mongoose";
import UserModel from "../userModel";
import { IUser } from "../../../types/userTypes";
import RatingModel from "../../rating/ratingModel";
import CommentModel from "../../comment/commentModel";
import { findUserByUid } from "../../../helpers/userRepositoryHelper";

export class UserActionsRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  /**
   * Registers a user in the database or updates the existing user if found.
   * @param email - User's email.
   * @param uid - User's UID from Firebase.
   * @param bearedToken - User's bearer token.
   * @param photoUrl - URL of user's photo.
   * @param displayName - User's display name.
   * @param emailVerified - Whether the email is verified. Dictated by Firebase.
   * @param disabled - Whether the user is disabled.
   * @returns The registered or updated user in the database.
   * @throws Error if the operation fails.
   */
  async registerUser(
    email: string,
    uid: string,
    bearedToken: string,
    photoUrl: string,
    displayName: string,
    emailVerified: boolean,
    disabled: boolean
  ) {
    try {
      const existingUser = await this.userModel.findOneAndUpdate(
        { uid },
        {
          email,
          bearedToken,
          photoURL: photoUrl,
          displayName,
          emailVerified,
          disabled,
        },
        { new: true }
      );

      if (existingUser) {
        return existingUser;
      } else {
        const newUser = new this.userModel({
          uid,
          email,
          bearedToken,
          photoURL: photoUrl,
          displayName,
          emailVerified,
          disabled,
          savedHobbiesAndActivities: [],
        });

        const result = await newUser.save();
        return result;
      }
    } catch (error) {
      throw new Error("Could not create/update user document!");
    }
  }

  /**
   * Deletes a user and associated data from the database.
   * @param uid - User's UID.
   * @returns Object indicating success and message and the collection without the user.
   * @throws Error if the operation fails.
   */
  async deleteUser(uid: string) {
    try {
      const currentUser = await findUserByUid(this.userModel, uid);
      if (!currentUser) {
        throw new Error("User not found");
      }

      // Deletes all the instances of documents from the user in 
      // Different collections
      await this.userModel.deleteOne({ uid: currentUser.uid });
      await RatingModel.deleteMany({ userId: currentUser._id });
      await CommentModel.deleteMany({ userUid: currentUser.uid });

      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}
