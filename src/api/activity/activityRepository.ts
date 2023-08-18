import { RatingRepository } from "./../rating/ratingRepository";
import axios from "axios";
import { WithId, Document } from "mongodb";
import { IActivityCard } from "../../types/activityTypes";
import ActivityModel from "./activityModel";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../boredAPI/getActivitiesFromApi";
import { getUnsplashImageWithQuery } from "../unsplashImage/getImageWithQuery";
import { BoredAPIActivityType } from "../../types/boredAPITypes";
import { getExistingActivities } from "../../utils/getExistingActivities";
import { getExistingActivityById } from "../../utils/getExistingActivities";

interface PredefinedActivityProps {
  getThreeRandomActivitiesToUser(): Promise<IActivityCard[]>;
  getThreeRandomActivitiesToUserWithQuery(
    query: BoredAPIActivityType
  ): Promise<IActivityCard[]>;
  searchActivityByQuery(
    query: string,
    page: number
  ): Promise<WithId<Document>[]>;
}

export class ActivityRepository implements PredefinedActivityProps {
  private ratingRepository: RatingRepository;

  constructor(ratingRepository: RatingRepository) {
    this.ratingRepository = ratingRepository;
  }

  private async getOneRandomActivityToUser(): Promise<IActivityCard> {
    const boredApiActivity = await getOneRandomActivity();
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.name
    );

    const { ratingsLength, averageRatingToFixed: averageRating } =
      await this.ratingRepository.getNumberOfReviewsAndAverageRating(
        boredApiActivity.id
      );

    const customActivity: IActivityCard = {
      ...boredApiActivity,
      ...unsplashImage,
      averageRating: averageRating,
      reviews: ratingsLength,
    };

    return customActivity;
  }
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IActivityCard> {
    const boredApiActivity = await getOneRandomActivityWithQuery(query);
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.name
    );

    // Crea una nueva instancia del modelo IActivityCard con los datos combinados de boredApiActivity y unsplashImage
    const { ratingsLength, averageRatingToFixed: averageRating } =
      await this.ratingRepository.getNumberOfReviewsAndAverageRating(
        boredApiActivity.id
      );

    const customActivity: IActivityCard = {
      ...boredApiActivity,
      ...unsplashImage,
      averageRating: averageRating,
      reviews: ratingsLength,
    };

    return customActivity;
  }

  // Function search one activity with query using pagination to avoid
  // Bad perfomance
  async searchActivityByQuery(
    query: string,
    page: number
  ): Promise<WithId<Document>[]> {
    try {
      const regexQuery = new RegExp(query);
      const options = {
        page: page,
        limit: 10,
      };
      const matchedActivities = await ActivityModel.paginate(
        { activityName: regexQuery },
        options
      );

      console.log(matchedActivities);

      return matchedActivities.docs;
    } catch (error) {
      console.log(error);
      throw new Error("Error searching activities by query");
    }
  }

  public getThreeRandomActivitiesToUser = async (): Promise<
    IActivityCard[]
  > => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUser()
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<IActivityCard[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUserUsingQuery(query)
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  // Function to get all the existing activities from the db
  public async retrieveExistingActivitiesFromDb() {
    getExistingActivities();
  }

  public async retrieveExistingActivityFromDb(id: string) {
    try {
      const existingActivity = await getExistingActivityById(id);
      return existingActivity;
    } catch (error) {
      console.error("Error al obtener la actividad:", error);
      return null;
    }
  }

  async downloadActivityImage(url: string) {
    try {
      // Realizar la solicitud HTTP para obtener la imagen en formato de array de bytes
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });

      // Convertir los datos de la imagen en un objeto Blob
      const imageBlob = new Blob([response.data], { type: "image/jpeg" });

      // Crear un enlace de descarga para la imagen
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(imageBlob);
      downloadLink.download = "activity_image.jpg";

      // Simular un clic en el enlace de descarga para iniciar la descarga
      downloadLink.click();

      // Liberar el objeto URL utilizado para crear el enlace de descarga
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("There was an error while downloading the image: ", error);
    }
  }

  // Function used to get random activities from the DB using their specified type
  // Meaning that if the target activity is Sports, we get only activities
  // With the sports type
  // This save resources because we're not using any external API
  async recommendThreeActivitiesFromDBAndWithType(type: string) {
    try {
      const activitiesWithSpecifiedCategory = await ActivityModel.aggregate([
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
}
