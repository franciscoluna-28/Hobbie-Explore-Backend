// Ok first we get the existing activities
// Then we create a object with the description and the links
// And finally we add those to the respective DB
import { db } from "../db"

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

  export const getExistingActivityById = async (id: string) => {
    try {
      const activitiesCollection = db.collection("activities");
      const activity = await activitiesCollection.findOne({ activityId: id });
      return activity;
    } catch (error) {
      console.error("Error al obtener la actividad:", error);
      return null;
    }
  };
  
