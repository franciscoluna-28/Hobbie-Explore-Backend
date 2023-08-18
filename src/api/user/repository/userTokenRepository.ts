import { Model } from "mongoose";
import { IUser } from "../../../types/userTypes";
import { findUserByUid } from "../../../helpers/userRepositoryHelper";

export class UserTokenRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async giveTokenToUser(uid: string, newToken: string) {
    const currentUser = await findUserByUid(this.userModel, uid);

    if (!currentUser) {
      return { error: "User not found" };
    }

    await this.userModel.findOneAndUpdate(
      { uid: uid },
      { $set: { bearerToken: newToken } }
    );

    return { success: true };
  }
}
