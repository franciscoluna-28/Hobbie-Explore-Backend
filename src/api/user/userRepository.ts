import {
  HobbieExploreActivityIDArray,
  HobbieExploreActivityWihtImage,
} from "./../../types/activityTypes";
import { HobbieExploreUser } from "../../types/userTypes";

import { db } from "../../db";
import { WithId, Document, PushOperator } from "mongodb";

// TODO SPLIT INTO TWO CLASSES
// ONE FOR THE ACTIVITIES AND OTHER
// FOR LOGIN AND SO ON
// HAVE COMMON METHODS IN BOTH
// OR USE CLASS COMPOSITION
export class UserRepository {
  async registerUser(email: string, uid: string, bearedToken: string) {
    try {
      const user: HobbieExploreUser = {
        uid,
        email,
        emailVerified: false,
        disabled: false,
        bearedToken: bearedToken,
        metadata: {},
        providerData: [],
        savedHobbiesAndActivities: [],
      };

      const result = await db
        .collection<HobbieExploreUser>("users")
        .insertOne(user);
      return result;
    } catch (error) {
      throw new Error("Could not create a new document!");
    }
  }

  private async findUserByUid(uid: string) {
    return await db.collection<HobbieExploreUser>("users").findOne({ uid });
  }

  private isActivitySavedByUser(
    user: HobbieExploreUser,
    activityId: string
  ): boolean {
    return user.savedHobbiesAndActivities.some(
      (activity: HobbieExploreActivityIDArray) => activity.id === activityId
    );
  }

  private async removeActivityFromUser(
    user: WithId<HobbieExploreUser>,
    activityId: string
  ) {
    await db
      .collection("users")
      .updateOne(
        { uid: user.uid },
        { $pull: { savedHobbiesAndActivities: { id: activityId } } }
      );
  }

  async deleteActivityFromUser(uid: string, activityId: string) {
    try {
      const currentUser = await this.findUserByUid(uid);

      if (!currentUser) {
        return { error: "User not found" };
      }

      if (!this.isActivitySavedByUser(currentUser, activityId)) {
        return { error: "Activity not found in user's saved list" };
      }

      await this.removeActivityFromUser(currentUser, activityId);

      return { success: true };
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw new Error("An error occurred while deleting the activity");
    }
  }

  async addActivityIdToUser(uid: string, activityId: string) {
    try {
      const currentUser = (await db
        .collection("users")
        .findOne({ uid: uid })) as Required<WithId<HobbieExploreUser>>;
      if (!currentUser) {
        return { error: "User not found" };
      }

      currentUser.savedHobbiesAndActivities.map((currentActivity) => {
        if(currentActivity.id === activityId) {
          return { error: "Duplicated activity!" };
        }
        }
      )

      await db
        .collection("users")
        .findOneAndUpdate(
          { uid: uid },
          {
            $addToSet: {
              savedHobbiesAndActivities: { id: activityId },
            } as unknown as PushOperator<Document>,
          },
          { upsert: true }
        );

      return { success: true };
    } catch (error) {
      console.error("Error adding activity ID to user:", error);
      throw new Error(
        "An error occurred while adding the activity ID to the user"
      );
    }
  }

  async addActivityToDatabase(activityData: HobbieExploreActivityWihtImage) {
    try {
      const existingActivity = await db
        .collection("activities")
        .findOne({ activityId: activityData.activityId });

        

  
      if (existingActivity) {
        throw new Error("Activity already exists");
      }
  
      const insertedActivity = await db
        .collection("activities")
        .insertOne(activityData);
  
      return { success: true, insertedActivity };
    } catch (error) {
      console.error("Error adding activity to database:", error);
      throw new Error(
        "An error occurred while adding the activity to the database"
      );
    }
  }
  

  async addActivityToUserAndDatabase(uid: string, activityData: HobbieExploreActivityWihtImage) {
    try {
      const { ...activityToAdd } = activityData;
      const { activityId } = activityToAdd;

      console.log(activityData)

      console.log(activityId)
  
      await this.addActivityIdToUser(uid, activityId);
  
      try {
        const { insertedActivity } = await this.addActivityToDatabase(activityToAdd);
        return { success: true, insertedActivity };
      } catch (error) {
          return { error: "Activity already exists" };
      }
    } catch (error) {
      console.error("Error adding activity to user and database:", error);
      throw new Error("An error occurred while adding the activity to the user and database");
    }
  }

  async giveTokenToUser(uid: string, newToken: string) {
    const currentUser = await this.findUserByUid(uid);
  
    if (!currentUser) {
      return { error: "User not found" };
    }
  
    await db.collection("users").findOneAndUpdate(
      { uid: uid },
      { $set: { bearedToken: newToken } }
    );
  
    // Realiza cualquier otra operación necesaria con el usuario
  
    return { success: true };
  }
  
}  