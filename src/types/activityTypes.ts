import {
  BoredAPIActivityType,
  BoredAPIModifiedActivity,
  ProcessedBoredAPIModifiedActivity,
} from "./boredAPITypes";
import { ProcessedUnsplashImage } from "./unsplashAPITypes";

// Type to be used by the final API
export interface ActivityWithImage extends ProcessedBoredAPIModifiedActivity {
  image?: ProcessedUnsplashImage;
}

// Final API reponse to be consumed by the Frontend
export interface HobbieExploreActivityWihtImage {
  activityName: string;
  type: BoredAPIActivityType | string;
  blur_hash: string;
  participants: number;
  price: number;
  accessibility: number;
  activityId: string;
  description: string;
  ratings: [];
  comments: [];
  links: any;
  urls: {
    full: string;
    thumb: string;
    regular: string;
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

export type HobbieExploreActivityIDArray = {
  rating: number;
  id: string;
};
