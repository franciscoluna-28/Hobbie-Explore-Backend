// Without changing the key parameter to id
export interface DefaultBoredAPIActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

// After processing the key and using it as the ID
export interface BoredAPIModifiedActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  id: string;
  accessibility: number;
}

// Available categories for Bored API
export enum BoredAPIActivityType {
  Education = "education",
  Recreational = "recreational",
  Social = "social",
  DIY = "diy",
  Charity = "charity",
  Cooking = "cooking",
  Relaxation = "relaxation",
  Music = "music",
  Busywork = "busywork",
}
