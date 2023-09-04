import { Document } from "mongoose";
import { BoredAPIActivityType } from "./boredAPITypes";

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

// Create a shared interface for common properties
interface CommonActivityProperties {
  name: string;
  type: BoredAPIActivityType;
  participants: number;
  price: number;
  description: string;
  averageRating: number;
  reviews: number;
  accesibility: string;
  listOfLinks: string[];
  accessibility: number;
}

export interface IPredefinedActivity
  extends Document,
    CommonActivityProperties {
  imageId: string;
  blur_hash: string;
  urls: {
    full: string;
    thumb: string;
    regular: string;
  };
  user: User;
}

export interface ICustomActivity extends Document, CommonActivityProperties {
  imageURL: string;
  userUID: string;
  userPictureURL: string;
}

export interface IPredefinedActivityIDArray {
  rating: number;
  id: string;
}
