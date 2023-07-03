import { ActivityWithImage } from "../../types/activityTypes";
import { getOneRandomActivity } from "../boredAPI/getActivitiesFromApi";
import { getUnsplashImageWithQuery } from "../unsplashImage/getImageWithQuery";

interface ActivityRepositoryProps {
  getOneRandomActivity(): Promise<ActivityWithImage>;
}

export class ActivityRepository implements ActivityRepositoryProps {
  public async getOneRandomActivity(): Promise<ActivityWithImage> {
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
}
