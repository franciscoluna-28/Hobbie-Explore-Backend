import { UnsplashImage } from "../../types/unsplashAPITypes";

// Function used to filter URLs
export function extractUrls(urls: UnsplashImage["urls"]) {
  return { full: urls!.full };
}

// Function used to filter info. from the photo's creator
export function extractUser(user: UnsplashImage["user"]) {
  const { name, username, links, profile_image } = user!;
  const { html } = links;
  const { medium } = profile_image!;
  return { name, username, links: { html }, profile_image: { medium } };
}
