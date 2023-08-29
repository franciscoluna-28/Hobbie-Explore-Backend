import { Document, PaginateModel } from "mongoose";
import { getExistingActivityById } from "../../../../utils/getExistingActivities";
import { IPredefinedActivity } from "../../../../types/activityTypes";

/**
 * Repository to handle the default activities from the DB.
 * This class encapsulates the business logic related to the database operations for default activities.
 */
export class DefaultActivityFromDB {
  private activityModel: PaginateModel<IPredefinedActivity & Document>;

  /**
   * Creates an instance of DefaultActivityFromDB.
   * @param {PaginateModel<IPredefinedActivity & Document>} activityModel - The Mongoose model for predefined activities.
   */
  constructor(activityModel: PaginateModel<IPredefinedActivity & Document>) {
    this.activityModel = activityModel;
  }

  /**
   * Retrieves a list of recommended activities with a specified type.
   * @param {string} type - The type of activities to retrieve.
   * @returns {Promise<IPredefinedActivity[]>} A promise that resolves to an array of recommended activities.
   * @throws {Error} Throws an error if there's an issue retrieving activities from the database.
   */
  async recommendThreeActivitiesFromDBAndWithType(
    type: string
  ): Promise<IPredefinedActivity[]> {
    try {
      // Get random activities with aggregate method with a maxium of 3 activities
      const activitiesWithSpecifiedCategory =
        await this.activityModel.aggregate([
          { $match: { type: type } },
          { $sample: { size: 3 } },
        ]);

      return activitiesWithSpecifiedCategory;
    } catch (error) {
      console.error(
        "An error occurred while retrieving activities from the DB:",
        error
      );
      throw error;
    }
  }

  /**
   * Searches for activities based on a query string.
   * @param {string} query - The query string to search for activities.
   * @param {number} page - The page number for pagination.
   * @returns {Promise<IPredefinedActivity[]>} A promise that resolves to an array of matched activities.
   * @throws {Error} Throws an error if there's an issue searching for activities.
   */
  async searchActivityByQuery(
    query: string,
    page: number
  ): Promise<IPredefinedActivity[]> {
    try {
      const regexQuery = new RegExp(query);

      const options = {
        page: page,
        limit: 10,
      };

      // Add pagination to the filtered results
      const matchedActivities = await this.activityModel.paginate(
        { name: regexQuery },
        options
      );

      // Return the filtered results
      return matchedActivities.docs;
    } catch (error) {
      console.error(error);
      throw new Error("Error searching activities by query");
    }
  }

  /**
   * Retrieves information about an activity by its ID.
   * @param {string} id - The ID of the activity to retrieve.
   * @returns {Promise<IPredefinedActivity|null>} A promise that resolves to the retrieved activity or null if not found.
   */
  public async retrieveExistingActivityFromDb(
    id: string
  ): Promise<IPredefinedActivity | null> {
    try {
      const existingActivity = await getExistingActivityById(
        this.activityModel,
        id
      );
      return existingActivity;
    } catch (error) {
      console.error("Error al obtener la actividad:", error);
      return null;
    }
  }
}
