import { BoredAPIActivityType } from "./../../types/boredAPITypes";
import axios from "axios";
import { boredAPIAvailableUrls } from "./urlDeclarations";
import {
  BoredAPIModifiedActivity,
  DefaultBoredAPIActivity,
} from "../../types/boredAPITypes";
import { AxiosResponse } from "axios";

// Helper function to transform "key" to "id" to avoid React conflicts
function transformBoredAPIKeyToId(
  response: AxiosResponse<DefaultBoredAPIActivity>
): BoredAPIModifiedActivity {
  const { key, ...modifiedActivity } = response.data;
  return { ...modifiedActivity, activityId: key };
}

export async function getOneRandomActivity() {
  const response = await axios.get(boredAPIAvailableUrls.randomActivityUrl);
  return transformBoredAPIKeyToId(response);
}

export async function getOneRandomActivityWithQuery (
  query: BoredAPIActivityType
) {
  const response = await axios.get(
    boredAPIAvailableUrls.randomActivityWithTypeUrl + query
  );
  return transformBoredAPIKeyToId(response);
}
