 import { Request, Response } from "express"; // Importa los tipos de Request y Response de Express
import { GlobalPredefinedActivityRepository, PredefinedActivityRepository } from "../repository/pre-defined-activity-repository";
import { BoredAPIActivityType } from "../../../../types/boredAPITypes";
import { PredefinedRandomActivityRepository } from "../repository/pre-defined-random-activity-repository";

export class PredefinedActivitiesController {
  private activityRepository: PredefinedActivityRepository
  private randomActivities: PredefinedRandomActivityRepository


  constructor() {
    this.activityRepository = GlobalPredefinedActivityRepository
    this.randomActivities = this.activityRepository.getPredefinedRandomActivityRepository()
  }

  public getThreeRandomActivities = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const activities =
        await this.randomActivities.getThreeRandomActivitiesToUser()
      res.json(activities);
    } catch (error) {
      console.error("Error retrieving random activities:", error);
      res.status(500).json({ error: "Failed to retrieve random activities" });
    }
  };

  public getThreeRandomActivitiesWithQuery = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const type = req.params.type as BoredAPIActivityType; // Asegúrate de tener la definición de BoredAPIActivityType
      const activities =
        await this.randomActivities.getThreeRandomActivitiesToUserWithQuery(
          type
        );
      res.json(activities);
    } catch (error) {
      console.error("Error retrieving random activities with query:", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve random activities with query" });
    }
  };
}
 