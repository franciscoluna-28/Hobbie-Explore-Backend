// Default Unsplash Image response
export interface UnsplashImage {
  id: string;
  urls?: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  user?: {
    name: string;
    username: string;
    links: {
      self: string;
      html: string;
      photos: string;
    };
    profile_image?: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username?: string;
    total_collections?: number;
    total_likes?: number;
    total_photos?: number;
    accepted_tos?: boolean;
    for_hire?: boolean;
    social?: {
      instagram_username?: string;
      portfolio_url?: string;
      twitter_username?: string;
      paypal_email?: string;
    };
  };
}

// Processed Unsplash Image after filtering information
export interface ProcessedUnsplashImage {
  id: string;
  urls: {
    full: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      medium: string;
    };
  };
}