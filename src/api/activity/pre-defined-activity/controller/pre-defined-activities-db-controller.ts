import { Request, Response } from "express"; // Importa los tipos Request y Response de Express
import { PredefinedActivityDBRepository } from "../repository/pre-defined-activity-db-repository";
import { getExistingActivityById } from "../../../../utils/getExistingActivities";
import PredefinedActivityModel from "../../activityModel";
import {
  GlobalPredefinedActivityRepository,
  PredefinedActivityRepository,
} from "../repository/pre-defined-activity-repository";

export class PredefinedActivitiesDBController {
  private activityRepository: PredefinedActivityRepository;
  activitiesFromDB: PredefinedActivityDBRepository;

  constructor() {
    this.activityRepository = GlobalPredefinedActivityRepository;
    this.activitiesFromDB =
      this.activityRepository.getPredefinedActivityDBRepository();
  }

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

        console.log(activities);

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
