import { db } from "../db";
import { getExistingActivities } from "./getExistingActivities";
import { activitiesDescription } from "../db/activitiesDescription";

export const updateActivitiesWithDescription = async () => {
    try {
      const existingActivities = await getExistingActivities();
      existingActivities.forEach(activity => {
        const matchingDescription = activitiesDescription.find(desc => desc.idToAdd === activity.activityId);
        if (matchingDescription) {
          if (!activity.description) {
            activity.description = matchingDescription.description;
          }
          if (!activity.links) {
            activity.links = matchingDescription.links;
          }
        }
      });
  
      // Actualizamos las actividades en la base de datos
      const activitiesCollection = db.collection("activities");
      existingActivities.forEach(async activity => {
        await activitiesCollection.updateOne({ _id: activity._id }, { $set: { description: activity.description, links: activity.links } });
      });
  
      return existingActivities;
    } catch (error) {
      console.error("Error al actualizar las actividades:", error);
      return [];
    }
  };