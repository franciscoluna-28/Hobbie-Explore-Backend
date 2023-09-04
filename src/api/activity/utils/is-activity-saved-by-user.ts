import { IUser } from "../../../types/userTypes";

// Define a generic function to check if an activity is saved in a user's property
async function isActivitySavedByUserProperty(
  user: IUser,
  propertyName: keyof IUser, // Make propertyName a parameter
  id: string
): Promise<boolean> {
  // Access the specified property and check if it includes the ID
  return user[propertyName].includes(id);
}

export { isActivitySavedByUserProperty };
