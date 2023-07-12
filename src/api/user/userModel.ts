import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { HobbieExploreUser } from "../../types/userTypes";
import HobbieExploreActivityWithImage from "../activity/activityModel";

// User schema
const userSchema = new Schema<HobbieExploreUser>({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    nullable: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  displayName: {
    type: String,
    required: false,
    nullable: true,
  },
  photoURL: {
    type: String,
    required: false,
    nullable: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    nullable: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  metadata: {
    creationTime: {
      type: String,
      required: false,
      nullable: true,
    },
    lastSignInTime: {
      type: String,
      required: false,
      nullable: true,
    },
  },
  providerData: [
    {
      uid: {
        type: String,
        required: true,
      },
      displayName: {
        type: String,
        required: false,
        nullable: true,
      },
      email: {
        type: String,
        required: false,
        nullable: true,
      },
      photoURL: {
        type: String,
        required: false,
        nullable: true,
      },
      phoneNumber: {
        type: String,
        required: false,
        nullable: true,
      },
      providerId: {
        type: String,
        required: true,
      },
    },
  ],
  savedHobbiesAndActivities: {
    type: [HobbieExploreActivityWithImage.schema], // Uso del tipo de la actividad en el campo
    default: [],
  },
});

const User = mongoose.model<HobbieExploreUser>("User", userSchema);

export default User;
