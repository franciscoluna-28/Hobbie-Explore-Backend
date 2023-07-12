import { WithId, Document } from "mongodb";
import { ActivityWithImage, HobbieExploreActivityWihtImage } from "../../types/activityTypes";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../boredAPI/getActivitiesFromAPI";
import { getUnsplashImageWithQuery } from "../unsplashImage/getImageWithQuery";
import { db } from "../../db";
import { BoredAPIActivityType } from "../../types/boredAPITypes";


interface ActivityRepositoryProps {
  getThreeRandomActivitiesToUser(): Promise<ActivityWithImage[]>;
  getThreeRandomActivitiesToUserWithQuery(
    query: BoredAPIActivityType
  ): Promise<ActivityWithImage[]>;
  searchActivityByQuery(query: string): Promise<WithId<Document>[]>;
}

// TODO Have the DB as a parameter here
export class ActivityRepository implements ActivityRepositoryProps {
  private async getOneRandomActivityToUser(): Promise<ActivityWithImage> {
    const boredApiActivity = await getOneRandomActivity();
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activity
    );

    const customActivity: ActivityWithImage = {
      ...boredApiActivity,
      ...unsplashImage,
    };

    return customActivity;
  }
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<ActivityWithImage> {
    const boredApiActivity = await getOneRandomActivityWithQuery(query);
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activity
    );

    const customActivity: HobbieExploreActivityWihtImage = {
      
      ...boredApiActivity,
      ...unsplashImage,
    };

    return customActivity;
  }

  private async searchActivitiesWithQuery(
    query: string
  ): Promise<WithId<Document>[]> {
    try {
      const regexQuery = new RegExp(query, "i");
      const matchedActivities = await db
        .collection("activities")
        .find<WithId<Document>>({ activity: regexQuery })
        .toArray();
      return matchedActivities;
    } catch (error) {
      throw new Error("Error searching activities by query");
    }
  }

  public getThreeRandomActivitiesToUser = async (): Promise<
    ActivityWithImage[]
  > => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUser()
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<ActivityWithImage[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUserUsingQuery(query)
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public async searchActivityByQuery(
    query: string
  ): Promise<WithId<Document>[]> {
    const matchedActivities = await this.searchActivitiesWithQuery(query);
    return matchedActivities;
  }
}
