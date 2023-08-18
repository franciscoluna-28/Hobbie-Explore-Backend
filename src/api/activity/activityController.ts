import { BoredAPIActivityType } from "../../types/boredAPITypes";
import { RatingRepository } from "../rating/ratingRepository";
import { ActivityRepository } from "./activityRepository";
import { Response, Request } from "express";

interface ActivityControllerProps {
  getThreeRandomActivities(req: Request, res: Response): Promise<void>;
  getThreeRandomActivitiesWithQuery(req: Request, res: Response): Promise<void>;
  searchActivities(req: Request, res: Response): Promise<void>;
}

export class ActivityController implements ActivityControllerProps {
  private ratingRepository: RatingRepository;
  private activityRepository: ActivityRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
    this.activityRepository = new ActivityRepository(this.ratingRepository);
  }

  public getThreeRandomActivities = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const activities =
        await this.activityRepository.getThreeRandomActivitiesToUser();
      console.log(activities);
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
      // Will this scale?
      const query = req.query.activity as string;
      const page: string | number = parseInt(req.query.page as string) ?? 1;

      const activities = await this.activityRepository.searchActivityByQuery(
        query,
        page
      );

      res.json(activities);
    } catch (error) {
      console.error("Error retrieving activities by query:", error);
      res.status(500).json({ error: "Failed to retrieve activities by query" });
    }
  };

  public getActivityById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const activityToGetById =
        await this.activityRepository.retrieveExistingActivityFromDb(id);



      res.json(activityToGetById);
    } catch (error) {
      console.error("There was an error getting the activity: ", error);
      res
        .status(500)
        .json({ error: "Failed to get activity, make sure if exists" });
    }
  };

  public downloadActivityImage = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const imageUrl = req.query.imageUrl as string;

      const imageToDownload =
        await this.activityRepository.downloadActivityImage(imageUrl);

      // Configurar las cabeceras para indicar que se está enviando un archivo descargable
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="activity_image.jpg"`
      );
      res.setHeader("Content-Type", "image/jpeg");

      // Enviar la imagen como archivo binario
      res.send(imageToDownload);
    } catch (error) {
      console.error("Error downloading activity image:", error);
      res.status(500).json({ error: "Failed to download activity image" });
    }
  };

  public recommendThreeRandomDefaultDBActivities = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { type } = req.query as { type: string }; // Asegúrate de que req.query sea un objeto con una propiedad "type"
      const activities =
        await this.activityRepository.recommendThreeActivitiesFromDBAndWithType(
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
