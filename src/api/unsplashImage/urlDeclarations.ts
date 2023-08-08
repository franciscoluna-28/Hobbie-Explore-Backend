import dotenv from "dotenv";
import { unsplashOrientationList } from "./orientationList";

dotenv.config();

interface UnsplashAvailableUrls {
  getImageWithQuery: string;
}

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

export const unsplashAPIAvailableUrls: UnsplashAvailableUrls = {
  getImageWithQuery:
    "https://api.unsplash.com/search/photos?client_id=" +
    unsplashAccessKey +
    "&per_page=1" +
    "&orientation=" + unsplashOrientationList.landscape +
    "&page=3" +
    "&query=",
};