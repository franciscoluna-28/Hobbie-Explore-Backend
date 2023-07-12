import dotenv from "dotenv";

dotenv.config();

interface UnsplashAvailableUrls {
  getImageWithQuery: string;
}

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY!;

// Unsplash API endpoints
export const unsplashAPIAvailableUrls: UnsplashAvailableUrls = {
  getImageWithQuery:
    "https://api.unsplash.com/search/photos?client_id=" +
    unsplashAccessKey +
    "&per_page=1" +
    "&page=3" +
    "&query=",
};
