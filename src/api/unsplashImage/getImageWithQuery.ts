import { unsplashAPIAvailableUrls } from "./urlDeclarations";
import {
  ProcessedUnsplashImage,
  UnsplashImage,
} from "../../types/unsplashAPITypes";
import axios from "axios";
import { extractUrls } from "./extractAndFilterValues";
import { extractUser } from "./extractAndFilterValues";

export async function getUnsplashImageWithQuery(
  query: string
): Promise<ProcessedUnsplashImage> {
  try {
    const response = await axios.get<{ results: UnsplashImage[] }>(
      unsplashAPIAvailableUrls.getImageWithQuery + query
    );
    const results = response.data.results;

    if (!results || results.length === 0) {
      throw new Error("No images found on Unsplash for the specified keyword!");
    }

    //TODO remove the imageId (id in the final type)
    // Picking the first element
    const { id: imageId, urls, user, blur_hash } = results[0];

    const myUnsplashImage: ProcessedUnsplashImage = {
      imageId,
      blur_hash,
      urls: extractUrls(urls),
      user: extractUser(user),
    };

    return myUnsplashImage;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
