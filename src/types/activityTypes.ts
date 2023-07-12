import { BoredAPIActivityType, BoredAPIModifiedActivity } from "./boredAPITypes";
import { ProcessedUnsplashImage } from "./unsplashAPITypes";

// Type to be used by the final API
export interface ActivityWithImage extends BoredAPIModifiedActivity {
  image?: ProcessedUnsplashImage;
}

// Final API reponse to be consumed by the Frontend
export interface HobbieExploreActivityWihtImage {
  activity: string;
  type: BoredAPIActivityType | string;
  participants: number;
  price: number;
  link: string;
  accessibility: number;
  activityId: string;
  urls: {
    full: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      medium: string;
    };
  };
}

export type HobbieExploreActivityIDArray = { id: string };