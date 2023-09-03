import { Schema, Document, model } from "mongoose";

// Interfaz para el modelo de ratings
export interface IUserRating extends Document {
  userUID: string;
  rating: number;
  activityId: string;
}

const ratingSchema = new Schema<IUserRating>({
  userUID: {
    type: String,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  activityId: {
    type: String, 
    ref: "PredefinedActivity",
    required: true,
  },
});

// Modelo para el rating
const RatingModel = model<IUserRating>("Rating", ratingSchema);

export default RatingModel;
