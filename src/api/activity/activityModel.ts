import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { BoredAPIActivityType } from "../../types/boredAPITypes";
import paginate from "mongoose-paginate-v2";
import { IPredefinedActivity } from "../../types/activityTypes";

/**

  Interface for representing a user
  @extends Document
  @property {string} name - Refers to the name of the retrieved activity
  @property {string} type - Category of the saved activity
  @property {number} participants - Number of participants within one activity
  @property {number} price - (0 - 1) - Range of price of one activity 
  @property {number} accesibility - Refers to the accesibility of one activity
  @property {string} id - Unique identifier for one activity
  @property {string} description - Description of one activity
  @property {number} averageRating - Average rating of one activity
  @property {number} reviews - Number of reviews for one activity
  @property {[{string}]} listOfLinks - An array of links related to one activity
  @property {urls} urls - Object containing the full and regular urls of the activity
  @property {user} - Object containing the name, username, links, 
  and profile_image of the user who created the activity */

// Esquema de la actividad con imagen
const ActivitySchema = new Schema<IPredefinedActivity>({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true
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
  accessibility: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  blur_hash: {
    type: String,
    required: true
  },
  listOfLinks: [
    {
      type: String,
      default: []  
    },
  ],
  urls: {
    full: {
      type: String,
      required: true,
    },
    regular: {
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

// Aplicar el plugin de paginación al esquema
ActivitySchema.plugin(paginate);

// Declarar una interfaz para el documento de actividad (opcional pero recomendado)
const PredefinedActivityModel = mongoose.model<
  IPredefinedActivity & Document,
  mongoose.PaginateModel<IPredefinedActivity & Document>
>("PredefinedActivity", ActivitySchema);

export default PredefinedActivityModel;
