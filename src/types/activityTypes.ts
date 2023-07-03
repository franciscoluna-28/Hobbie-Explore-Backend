import { BoredAPIModifiedActivity } from "./boredAPITypes";
import { UnsplashImage } from "./unsplashAPITypes";

// Type to be used by the final API
export interface ActivityWithImage extends BoredAPIModifiedActivity {
  image?: UnsplashImage;
}
