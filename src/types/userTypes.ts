import { Document } from "mongoose";

// User to be inserted into the database

/**

  Interface for representing a user
  @extends Document
  @property {string} uid - Unique identifier of the user
  @property {string|null} email - Email address of the user
  @property {boolean} emailVerified - Whether the user's email address has been verified
  @property {string|null} displayName - Display name of the user
  @property {string|null} photoURL - Photo URL of the user
  @property {boolean} disabled - Whether the user is disabled
  @property {string} bearerToken - Bearer token of the user
  @property {[{string}]} savedDefaultActivities - Default activities that the user is interested in
  @property {[{string}]} createdActivities - Activities that the user has created
  @property {[{string}]} savedUserActivities - Saved activities from other users
  @property {string} description - Description of the user 
  @property {[{string}]} friends - List of friends within the app
  @property {boolean} isAccountPrivated - Whether the account is privated or not
  @property {Date} createdAt - Identifies the date of creation of a user
  */

/** Fields provided by Firebase when registering
  @property {string} uid 
  @property {string|null} email 
  @property {boolean} emailVerified 
  @property {string|null} displayName 
  @property {string|null} photoURL 
  @property {boolean} disabled 
  @property {string} bearerToken 
  @property {Date} createdAt - Identifies the date of creation of a user
  */

/** Fields that can be modified by the user
  @property {boolean} isAccountPrivated 
  @property {string} description 
  */

/** Fields that can be modified within the app
  @property {[{string}]} friends 
  @property {[{string}]} savedUserActivities 
  @property {[{string}]} savedDefaultActivities 
  @property {[{string}]} createdActivities 
  */

/** Can be changed when login with Google
  @property {boolean} emailVerified - To true
  @property {string|null} displayName - To the name of the user in Google
  @property {string|null} photoURL - To the photo provided by Google
  */

/** Changes after logout and login
  @property {string} bearerToken 
  */

export interface IUser extends Document {
  uid: string;
  email?: string | null;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
  disabled: boolean;
  bearerToken: string;
  savedDefaultActivities: string[];
  createdActivities: string[];
  savedCustomActivities: string[];
  description: string;
  isAccountPrivated: boolean;
  friends: string[];
  createdAt: string;
}
