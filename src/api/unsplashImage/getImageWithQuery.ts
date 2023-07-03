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

    // Picking the first element
    const { id, urls, user } = results[0];

    const myUnsplashImage: ProcessedUnsplashImage = {
      id,
      urls: extractUrls(urls),
      user: extractUser(user),
    };

    return myUnsplashImage;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
