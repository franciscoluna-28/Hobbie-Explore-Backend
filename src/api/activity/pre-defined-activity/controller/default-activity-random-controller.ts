import { Request, Response } from "express";
import {
  DefaultActivityRepository,
  GlobalDefaultActivityRepository,
} from "../repository/default-activity-repository";
import { BoredAPIActivityType } from "../../../../types/boredAPITypes";
import { DefaultRandomActivityRepository } from "../repository/default-activities-random-repository";

/**
 * Controller class responsible for handling default activity related endpoints.
 */
export class DefaultActivityController {
  private activityRepository: DefaultActivityRepository;
  private randomActivities: DefaultRandomActivityRepository;

  constructor() {
    this.activityRepository = GlobalDefaultActivityRepository;
    this.randomActivities =
      this.activityRepository.getDefaultRandomActivityRepository();
  }

  /**
   * Handles the request to get three random activities for a user.
   * @param _req The Express request object.
   * @param res The Express response object.
   */
  public getThreeRandomActivities = async (req: Request, res: Response): Promise<void> => {
    try {
      const type = req.query.type as BoredAPIActivityType;
      console.log("type is", type)
      const activities = await this.randomActivities.getThreeRandomActivitiesToUser(type);
      res.json(activities);
    } catch (error) {
      console.error("Error retrieving random activities:", error);
      res.status(500).json({ error: "Failed to retrieve random activities" });
    }
  };

  /**
   * Handles the request to get three random activities for a user based on a specific type.
   * @param req The Express request object containing the activity type parameter.
   * @param res The Express response object.
   */
}