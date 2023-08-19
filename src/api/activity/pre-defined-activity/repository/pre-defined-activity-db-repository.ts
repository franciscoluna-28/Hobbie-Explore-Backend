import { Document, PaginateModel } from "mongoose";
import { getExistingActivityById } from "../../../../utils/getExistingActivities";
import { IPredefinedActivity } from "../../../../types/activityTypes";

export class PredefinedActivityDBRepository {
  private activityModel: PaginateModel<IPredefinedActivity & Document>;

  constructor(activityModel: PaginateModel<IPredefinedActivity & Document>) {
    this.activityModel = activityModel;
  }

  async recommendThreeActivitiesFromDBAndWithType(
    type: string
  ): Promise<IPredefinedActivity[]> {
    try {
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

      const matchedActivities = await this.activityModel.paginate(
        { name: regexQuery },
        options
      );

      return matchedActivities.docs;
    } catch (error) {
      console.log(error);
      throw new Error("Error searching activities by query");
    }
  }

  public async retrieveExistingActivityFromDb(id: string) {
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
