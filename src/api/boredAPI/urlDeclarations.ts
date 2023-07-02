interface BoredAPIAvailableUrls {
  randomActivityUrl: string;
  randomActivityWithTypeUrl: string;
}

// Object with the available URLS from Bored
export const boredAPIAvailableUrls: BoredAPIAvailableUrls = {
  randomActivityUrl: "https://www.boredapi.com/api/activity/",
  randomActivityWithTypeUrl: `https://www.boredapi.com/api/activity/?type=`,
};
