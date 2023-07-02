import axios from "axios";
import { boredAPIAvailableUrls } from "./urlDeclarations";
import {
  BoredAPIModifiedActivity,
  DefaultBoredAPIActivity,
} from "../../types/boredAPITypes";
import { generateArray } from "../../helpers/generateArray";
import { AxiosResponse } from "axios";

// Helper function to transform "key" to "id" to avoid React conflicts
function transformBoredAPIKeyToId(
  response: AxiosResponse<DefaultBoredAPIActivity>
): BoredAPIModifiedActivity {
  const { key, ...modifiedActivity } = response.data;
  return { ...modifiedActivity, id: key };
}

// Getting some random activities
export async function getRandomActivities(count: number) {
  const activities = await Promise.all(
    generateArray(count, {}).map(() =>
      axios
        .get(boredAPIAvailableUrls.randomActivityUrl)
        .then((response) => transformBoredAPIKeyToId(response))
    )
  );

  return activities;
}

// Getting different activities according to a type
export async function getRandomActivitiesByType(count: number, type: string) {
  const activities = await Promise.all(
    generateArray(count, {}).map(() =>
      axios
        .get(boredAPIAvailableUrls.randomActivityWithTypeUrl + type)
        .then((response) => transformBoredAPIKeyToId(response))
    )
  );

  return activities;
}
