import { WithId, Document } from "mongodb";
import { IActivity, ActivityModel } from "./activityModel";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../boredAPI/getActivitiesFromAPI";
import { getUnsplashImageWithQuery } from "../unsplashImage/getImageWithQuery";
import { BoredAPIActivityType } from "../../types/boredAPITypes";
import { getExistingActivities } from "../../utils/getExistingActivities";
import { getExistingActivityById } from "../../utils/getExistingActivities";

interface ActivityRepositoryProps {
  getThreeRandomActivitiesToUser(): Promise<IActivity[]>;
  getThreeRandomActivitiesToUserWithQuery(
    query: BoredAPIActivityType
  ): Promise<IActivity[]>;
  searchActivityByQuery(query: string): Promise<WithId<Document>[]>;
}

export class ActivityRepository implements ActivityRepositoryProps {
  private async getOneRandomActivityToUser(): Promise<IActivity> {
    const boredApiActivity = await getOneRandomActivity();
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activityName
    );

    const customActivity: IActivity = new ActivityModel({
      ...boredApiActivity,
      ...unsplashImage,
      ratingMean: 0,
      totalReviews: 0,
      links: [],
      description: "",
    });

    return customActivity;
  }
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IActivity> {
    const boredApiActivity = await getOneRandomActivityWithQuery(query);
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activityName
    );

    // Crea una nueva instancia del modelo IActivity con los datos combinados de boredApiActivity y unsplashImage
    const customActivity: IActivity = new ActivityModel({
      ...boredApiActivity,
      ...unsplashImage,
      ratingMean: 0,
      totalReviews: 0,
      links: [],
      description: "",
    });

    return customActivity;
  }
  private async searchActivitiesWithQuery(
    query: string
  ): Promise<WithId<Document>[]> {
    try {
      const regexQuery = new RegExp(query, "i");
      const matchedActivities = await ActivityModel.find({
        activityName: regexQuery,
      })
        .lean()
        .exec();
     
      return matchedActivities;
    } catch (error) {
      console.log(error);
      throw new Error("Error searching activities by query");
    }
  }

  public getThreeRandomActivitiesToUser = async (): Promise<IActivity[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUser()
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<IActivity[]> => {
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
    console.log(query);
    return matchedActivities;
  }

  public async retrieveExistingActivitiesFromDb() {
    getExistingActivities();
  }

  public async retrieveExistingActivityFromDb(id: string) {
    try {
      const existingActivity = await getExistingActivityById(id);
      return existingActivity;
    } catch (error) {
      console.error("Error al obtener la actividad:", error);
      return null;
    }
  }
}
