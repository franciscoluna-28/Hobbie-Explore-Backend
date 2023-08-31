// Ok first we get the existing activities
// Then we create a object with the description and the links
// And finally we add those to the respective DB
import { db } from "../db";
import { Model } from "mongoose";

export const getExistingActivities = async () => {
  try {
    const activitiesCollection = db.collection("activities");
    const allActivities = await activitiesCollection.find({}).toArray();
    return allActivities;
  } catch (error) {
    console.error("There was an error while getting all the activities", error);
    return [];
  }
};


export const getExistingActivityById = async <T>(ActivityModel: Model<T>, id: string): Promise<T | null> => {
  try {
    const activity = await ActivityModel.findOne({ _id: id });
    return activity;
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    return null;
  }
};
