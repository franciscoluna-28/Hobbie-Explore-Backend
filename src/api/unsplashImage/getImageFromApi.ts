import { UnsplashImage } from "../../types/unsplashAPITypes";
import axios from "axios";
import { unsplashAPIAvailableUrls } from "./urlDeclarations";

// TODO refactor this logic
// Getting an image from unsplash according to a keyword argument
export async function getUnsplashImageWithQuery(query: string): Promise<UnsplashImage> {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<{ results: UnsplashImage[] }>(
      unsplashAPIAvailableUrls.getImageWithQuery + query
    );
    const results = response.data.results;
    console.log(results);
    if (!results) {
      throw new Error("No images found on Unsplash for the specified keyword!");
    }

    // As we get different
    const myUnsplashImage: UnsplashImage = {
      id: results[0].id,
      urls: results[0].urls,
      user: results[0].user,
    };
    return myUnsplashImage;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
