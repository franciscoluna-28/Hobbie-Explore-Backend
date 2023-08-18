import { Schema, Document, model } from "mongoose";

// Interfaz para el modelo de ratings
export interface IUserRating extends Document {
  userId: Schema.Types.ObjectId;
  rating: number;
  activityId: string;
}

const ratingSchema = new Schema<IUserRating>({
  userId: {
    type: Schema.Types.ObjectId,
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
    required: true,
  },
});

// Modelo para el rating
const RatingModel = model<IUserRating>("Rating", ratingSchema);

export default RatingModel;
