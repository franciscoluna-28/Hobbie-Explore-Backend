import { Schema, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import mongoose from "mongoose";
import { ICustomActivity } from "../../../types/activityTypes";

const CustomActivitySchema = new Schema<ICustomActivity & Document>({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: [
      "education",
      "recreational",
      "social",
      "diy",
      "charity",
      "cooking",
      "relaxation",
      "music",
      "busywork",
      "all",
    ],
    required: true,
  },
  participants: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  userUID: {
    type: String,
    required: true,
  },
  userPictureURL: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  description: {
    type: String,
    required: true,
  },
  listOfLinks: {
    type: [String], // Array of strings
  },
});

// Apply pagination to the schema
CustomActivitySchema.plugin(paginate);

const CustomActivityModel = mongoose.model<
  ICustomActivity & Document,
  PaginateModel<ICustomActivity & Document>
>("CustomActivity", CustomActivitySchema);

export default CustomActivityModel;
