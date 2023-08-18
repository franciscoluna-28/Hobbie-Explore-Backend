import { Model } from "mongoose";
import { IUser } from "../types/userTypes";

export async function findUserByUid(
  userModel: Model<IUser>,
  uid: string
): Promise<IUser | null> {
  return await userModel.findOne({ uid });
}

export async function getTotalActivitiesForUser(
  userModel: Model<IUser>,
  uid: string
): Promise<number> {
  const currentUser = await userModel.findOne({ uid });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return currentUser.savedDefaultActivities.length;
}
