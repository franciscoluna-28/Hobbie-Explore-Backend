import { BoredAPIModifiedActivity } from "../../types/boredAPITypes";

// Function to remove the field of "link" because is empty 99% of the times
export function extractLinkFromBored(activity: BoredAPIModifiedActivity) {
  const {
    activity: activityName,
    type,
    participants,
    price,
    activityId,
    accessibility,
  } = activity;

  return { activityName, type, participants, price, activityId, accessibility };
}
