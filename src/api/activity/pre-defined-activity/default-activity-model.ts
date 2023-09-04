import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IPredefinedActivity } from "../../../types/activityTypes";

// Esquema de la actividad con imagen
const DefaultActivitySchema = new Schema<IPredefinedActivity>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    index: true, // Add an index to the type field
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
    required: true,
  },
  listOfLinks: [
    {
      type: String,
      default: [],
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

DefaultActivitySchema.plugin(paginate);

const DefaultActivityModel = mongoose.model<
  IPredefinedActivity & Document,
  mongoose.PaginateModel<IPredefinedActivity & Document>
>("DefaultActivity", DefaultActivitySchema);

export default DefaultActivityModel;
