
import { Document } from "mongodb";
import { HobbieExploreActivityIDArray } from "./activityTypes";

// User to be inserted into the database
export interface IUser extends Document {
    uid: string;
    email?: string | null;
    emailVerified: boolean;
    displayName?: string | null;
    photoURL?: string | null;
    phoneNumber?: string | null;
    disabled: boolean;
    bearedToken: string;
    metadata: {
      creationTime?: string | null;
      lastSignInTime?: string | null;
    };
    providerData: Array<{
      uid: string;
      displayName?: string | null;
      email?: string | null;
      photoURL?: string | null;
      phoneNumber?: string | null;
      providerId: string;
    }>;
    savedHobbiesAndActivities: HobbieExploreActivityIDArray[]
  }
  

