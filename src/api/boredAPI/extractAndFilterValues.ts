import { BoredAPIModifiedActivity } from "../../types/boredAPITypes";

// Function to remove the field of "link" because is empty 99% of the times
export function extractLinkFromBored(activity: BoredAPIModifiedActivity) {
  const {
    name,
    type,
    participants,
    price,
    accessibility,
  } = activity;

  return { name, type, participants, price, accessibility };
}
