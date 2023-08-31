import {
  BoredAPIActivityType,
  ProcessedBoredAPIModifiedActivity,
} from "./../../types/boredAPITypes";
import axios from "axios";
import { boredAPIAvailableUrls } from "./urlDeclarations";
import {
  BoredAPIModifiedActivity,
  DefaultBoredAPIActivity,
} from "../../types/boredAPITypes";
import { AxiosResponse } from "axios";
import { extractLinkFromBored } from "./extractAndFilterValues";

// Helper function to transform "key" to "id" to avoid React conflicts
function transformBoredAPIKeyToId(
  response: AxiosResponse<DefaultBoredAPIActivity>
): BoredAPIModifiedActivity {
  const { activity, ...modifiedActivity } = response.data;
  return { ...modifiedActivity, name: activity };
}

async function getRandomActivity(
  query?: string
): Promise<ProcessedBoredAPIModifiedActivity> {
  const url = query
    ? boredAPIAvailableUrls.randomActivityWithTypeUrl + query
    : boredAPIAvailableUrls.randomActivityUrl;

  const response = await axios.get(url);
  const modifiedActivity = transformBoredAPIKeyToId(response);
  return extractLinkFromBored(modifiedActivity)
}

export async function getOneRandomActivity() {
  return getRandomActivity();
}

export async function getOneRandomActivityWithQuery(
  query: BoredAPIActivityType
) {
  return getRandomActivity(query);
}
