import { Schema, Document, model } from "mongoose";
import { BoredAPIActivityType } from "../../types/boredAPITypes";

// Interfaz de la actividad con imagen
export interface IHobbieExploreActivityWithImage extends Document {
  activity: string;
  type: BoredAPIActivityType | string;
  participants: number;
  price: number;
  link: string;
  accessibility: number;
  id: string;
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

// Esquema de la actividad con imagen
const hobbieExploreActivityWithImageSchema = new Schema<IHobbieExploreActivityWithImage>({
  activity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  urls: {
    full: {
      type: String,
      required: true,
    },
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    links: {
      html: {
        type: String,
        required: true,
      },
    },
    profile_image: {
      medium: {
        type: String,
        required: true,
      },
    },
  },
});

// Modelo de la actividad con imagen
const HobbieExploreActivityWithImage = model<IHobbieExploreActivityWithImage>(
  "HobbieExploreActivityWithImage",
  hobbieExploreActivityWithImageSchema
);

export default HobbieExploreActivityWithImage;