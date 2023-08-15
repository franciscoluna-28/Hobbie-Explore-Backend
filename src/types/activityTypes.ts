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
export interface IPredefinedActivity extends Document {
  name: string;
  type: BoredAPIActivityType | string;
  participants: number;
  price: number;
  accessibility: number;
  _id: string;
  description: string;
  averageRating: number;
  reviews: number;
  listOfLinks: ActivityLink;
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

export type IPredefinedActivityIDArray = {
  rating: number;
  id: string;
};

interface ActivityLink {
  url: string;
}
