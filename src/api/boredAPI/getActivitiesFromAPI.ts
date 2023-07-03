import axios from "axios";
import { boredAPIAvailableUrls } from "./urlDeclarations";
import {
  BoredAPIActivityType,
  BoredAPIModifiedActivity,
  DefaultBoredAPIActivity,
} from "../../types/boredAPITypes";
import { generateArray } from "../../helpers/generateArray";
import { AxiosResponse } from "axios";

//TODO Remove unused logic
// TODO Figure out a better way of retrieving activities in group
// TODO To be honest I don't want to use for loops this time...

// Helper function to transform "key" to "id" to avoid React conflicts
function transformBoredAPIKeyToId(
  response: AxiosResponse<DefaultBoredAPIActivity>
): BoredAPIModifiedActivity {
  const { key, ...modifiedActivity } = response.data;
  return { ...modifiedActivity, id: key };
}

/* // Getting some random activities
export async function getRandomActivities(count: number) {
  if (count === 1) {
    const response = await axios.get(boredAPIAvailableUrls.randomActivityUrl);
    return transformBoredAPIKeyToId(response);
  }

  const activities = await Promise.all(
    generateArray(count, {}).map(() =>
      axios
        .get(boredAPIAvailableUrls.randomActivityUrl)
        .then((response) => transformBoredAPIKeyToId(response))
    )
  );

  return activities;
} */

// TODO add Axios types here
export async function getOneRandomActivity(){
  const response = await axios.get(boredAPIAvailableUrls.randomActivityUrl);
  return transformBoredAPIKeyToId(response);
}

/* // Getting different activities according to a type
export async function getRandomActivitiesByType(
  count: number,
  type: BoredAPIActivityType
) {
  if (count === 1) {
    const response = await axios.get(
      boredAPIAvailableUrls.randomActivityWithTypeUrl + type
    );
    return transformBoredAPIKeyToId(response);
  }

  const activities = await Promise.all(
    generateArray(count, {}).map(() =>
      axios
        .get(boredAPIAvailableUrls.randomActivityWithTypeUrl + type)
        .then((response) => transformBoredAPIKeyToId(response))
    )
  );

  return activities;
}
 */