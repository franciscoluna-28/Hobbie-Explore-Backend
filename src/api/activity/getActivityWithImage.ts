import { BoredAPIModifiedActivity } from './../../types/boredAPITypes';
import { ActivityWithImage } from "../../types/activityTypes";
import { getOneRandomActivity } from '../boredAPI/getActivitiesFromAPI';
import { getBestKeyword } from '../../helpers/keywordExtractor';
import { getUnsplashImageWithQuery } from '../unsplashImage/getImageFromAPI';


// TODO: Refactor this logic

// Get random activity with an image from Unsplash
export async function getRandomActivityWithImage(
    type?: string
  ): Promise<ActivityWithImage> {
    try {
      let activity: BoredAPIModifiedActivity;
  
      if (type) {
        activity = await getOneRandomActivity()
      } else {
        activity = await getOneRandomActivity();
      }
  
      console.log(`Activity: ${activity.activity}`);
      const keyword = getBestKeyword(activity)
      console.log(`Best keyword: ${keyword}`);
  
      const image = await getUnsplashImageWithQuery(keyword);
      console.log(`Image ID: ${image.id}`);
  
      if (image.urls != null) {
        console.log(`Image URL: ${image.urls.regular}`);
      } else {
        console.log("Image URL not found");
      }
  
      const customActivity: ActivityWithImage = {
        ...activity,
        image,
      };
  
      return customActivity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  