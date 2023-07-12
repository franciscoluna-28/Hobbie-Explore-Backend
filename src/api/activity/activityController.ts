import { BoredAPIActivityType } from "../../types/boredAPITypes";
import { ActivityRepository } from "./activityRepository";
import { Response, Request } from "express";

interface ActivityControllerProps {
  getThreeRandomActivities(req: Request, res: Response): Promise<void>;
  getThreeRandomActivitiesWithQuery(req: Request, res: Response): Promise<void>;
  searchActivities(req: Request, res: Response): Promise<void>;
}

// TODO avoid a bit more ther
export class ActivityController implements ActivityControllerProps {
  private activityRepository: ActivityRepository;

  constructor() {
    this.activityRepository = new ActivityRepository();
  }

  public getThreeRandomActivities = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const activities =
        await this.activityRepository.getThreeRandomActivitiesToUser();
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
      const type = req.params.type as BoredAPIActivityType;
      const activities =
        await this.activityRepository.getThreeRandomActivitiesToUserWithQuery(
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

  public searchActivities = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const query = req.query.q as string;
      const activities = await this.activityRepository.searchActivityByQuery(
        query
      );
      res.json(activities);
    } catch (error) {
      console.error("Error retrieving activities by query:", error);
      res.status(500).json({ error: "Failed to retrieve activities by query" });
    }
  };
}
