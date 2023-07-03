// Unsplash Image type
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
    links: {
      self: string;
      phothos: string;
    };
  };
}
