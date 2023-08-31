import { Document } from "mongoose";
import { BoredAPIActivityType } from "./boredAPITypes";

interface ActivityLink {
  url: string;
}

interface User {
  name: string;
  username: string;
  links: {
    html: string;
  };
  profile_image: {
    medium: string;
  };
}

export interface BasePredefinedActivity {
  name: string;
  type: BoredAPIActivityType | string;
  imageId: string;
  blur_hash: string;
  participants: number;
  price: number;
  accessibility: number;
  averageRating: number;
  reviews: number;
  urls: {
    full: string;
    thumb: string;
    regular: string;
  };
  user: User;
}

export interface IPredefinedActivityNoDocument extends BasePredefinedActivity {
  description: string;
  listOfLinks: ActivityLink;
}

export interface IPredefinedActivity extends BasePredefinedActivity {
  description: string;
  listOfLinks: ActivityLink;
}

export type IActivityCard = Omit<
  IPredefinedActivityNoDocument,
  "description" | "listOfLinks"
>;

export interface IPredefinedActivityIDArray {
  rating: number;
  id: string;
}
