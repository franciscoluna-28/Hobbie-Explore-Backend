import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "../../types/userTypes";
import paginate from "mongoose-paginate-v2";

/**

  Interface for representing a user
  @extends Document
  @property {string} uid -(Required) Unique identifier of the user
  @property {string|null} email - (Required) Email address of the user
  @property {boolean} emailVerified - Whether the user's email address has been verified
  @property {string|null} displayName - Display name of the user
  @property {string|null} photoURL - Photo URL of the user
  @property {boolean} disabled - Whether the user is disabled
  @property {string} bearerToken - (Required) Bearer token of the user
  @property {[{string}]} savedDefaultActivities -  Default activities that the user is interested in
  @property {[{string}]} createdActivities - Activities that the user has created
  @property {[{string}]} savedUserActivities - Saved activities from other users
  @property {string} description - Description of the user 
  @property {[{string}]} friends - List of friends within the app
  @property {boolean} isAccountPrivated - Whether the account is privated or not
  @property {Date} createdAt - (Required) Identifies the date of creation of a user
  */

// User schema
const UserSchema = new Schema<IUser>({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: "Anonymous user",
  },
  photoURL: {
    type: String,
    default: null,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  savedDefaultActivities: [{
    type: String,
    default: ""
  }],
  createdActivities: [{
    type: String,
    default: ""
  }],
  friends: [{
    type: String,
    default: ""
  }],
  bearerToken: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  description: {
    type: String,
    default: "",
    required: false
  },
  createdAt: {
    type: String,
    required: true,
  },
  isAccountPrivated: {
    type: Boolean,
    default: false
  }
});

// Using the pagination plugin within the user schema
UserSchema.plugin(paginate);

const UserModel = mongoose.model<
  IUser & Document,
  mongoose.PaginateModel<IUser & Document>
>("User", UserSchema);

export default UserModel;
