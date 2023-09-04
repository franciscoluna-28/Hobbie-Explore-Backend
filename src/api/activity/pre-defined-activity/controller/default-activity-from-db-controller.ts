import { Request, Response } from "express"; // Importa los tipos Request y Response de Express
import { DefaultActivityFromDB } from "../repository/default-activities-db-repository";
import { getExistingActivityById } from "../../../../utils/getExistingActivities";
import PredefinedActivityModel from "../default-activity-model";
import { DefaultActivityRepository, GlobalDefaultActivityRepository } from "../repository/default-activity-repository";

// Handle the default activities form the Database
// Unless
export class DefaultActivityFromDBController {
  private activityRepository: DefaultActivityRepository;
  activitiesFromDB: DefaultActivityFromDB;

  constructor() {
    this.activityRepository = GlobalDefaultActivityRepository
    this.activitiesFromDB =
      this.activityRepository.getDefaultActivityDBRepository();
  }

  // TODO: Remove this
  // Gets the information of an existing activity
  public getActivityById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const activityToGetById = await getExistingActivityById(
        PredefinedActivityModel,
        id
      );

      res.json(activityToGetById);
    } catch (error) {
      console.error("There was an error getting the activity: ", error);
      res
        .status(500)
        .json({ error: "Failed to get activity, make sure if exists" });
    }
  };

  // Get 3 random activities with a specific type from the database
  public recommendThreeRandomDefaultDBActivities = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { type } = req.query as { type: string }; // Asegúrate de que req.query sea un objeto con una propiedad "type"
      const activities =
        await this.activitiesFromDB.recommendThreeActivitiesFromDBAndWithType(
          type
        );


      res.status(200).json(activities);
    } catch (error) {
      console.error(
        "An error occurred while recommending random activities:",
        error
      );
      res.status(500).json({ error: "Failed to recommend random activities" });
    }
  };
}
