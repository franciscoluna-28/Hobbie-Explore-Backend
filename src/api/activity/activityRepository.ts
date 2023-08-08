import axios  from 'axios';
import { WithId, Document } from "mongodb";
import { IActivity } from "./activityModel";
import ActivityModel from "./activityModel";
import {
  getOneRandomActivity,
  getOneRandomActivityWithQuery,
} from "../boredAPI/getActivitiesFromApi"
import { getUnsplashImageWithQuery } from "../unsplashImage/getImageWithQuery";
import { BoredAPIActivityType } from "../../types/boredAPITypes";
import { getExistingActivities } from "../../utils/getExistingActivities";
import { getExistingActivityById } from "../../utils/getExistingActivities";


interface ActivityRepositoryProps {
  getThreeRandomActivitiesToUser(): Promise<IActivity[]>;
  getThreeRandomActivitiesToUserWithQuery(
    query: BoredAPIActivityType
  ): Promise<IActivity[]>;
  searchActivityByQuery(query: string, page: number): Promise<WithId<Document>[]>;
}

export class ActivityRepository implements ActivityRepositoryProps {
  private async getOneRandomActivityToUser(): Promise<IActivity> {
    const boredApiActivity = await getOneRandomActivity();
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activityName
    );

    const customActivity: IActivity = new ActivityModel({
      ...boredApiActivity,
      ...unsplashImage,
      ratingMean: 0,
      totalReviews: 0,
      links: [],
      description: "",
    });

    return customActivity;
  }
  private async getOneRandomActivityToUserUsingQuery(
    query: BoredAPIActivityType
  ): Promise<IActivity> {
    const boredApiActivity = await getOneRandomActivityWithQuery(query);
    const unsplashImage = await getUnsplashImageWithQuery(
      boredApiActivity.activityName
    );

    // Crea una nueva instancia del modelo IActivity con los datos combinados de boredApiActivity y unsplashImage
    const customActivity: IActivity = new ActivityModel({
      ...boredApiActivity,
      ...unsplashImage,
      ratingMean: 0,
      totalReviews: 0,
      links: [],
      description: "",
    });

    return customActivity;
  }

  async searchActivityByQuery(query: string, page: number): Promise<WithId<Document>[]> {
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

      console.log(matchedActivities)

      return matchedActivities.docs;
    } catch (error) {
      console.log(error);
      throw new Error("Error searching activities by query");
    }
  }

  public getThreeRandomActivitiesToUser = async (): Promise<IActivity[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUser()
    );
    const activities = await Promise.all(promises);
    return activities;
  };

  public getThreeRandomActivitiesToUserWithQuery = async (
    query: BoredAPIActivityType
  ): Promise<IActivity[]> => {
    const promises = Array.from({ length: 3 }, () =>
      this.getOneRandomActivityToUserUsingQuery(query)
    );
    const activities = await Promise.all(promises);
    return activities;
  };



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
  
}
