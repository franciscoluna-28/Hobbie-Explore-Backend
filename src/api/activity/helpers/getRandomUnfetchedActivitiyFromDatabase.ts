import { Model, Document } from 'mongoose';

// Cache for distinct activity names with a TTL (time-to-live)
const distinctActivityNamesCache: Record<string, { names: string[], timestamp: number }> = {};

async function fetchDistinctActivityNames<T extends Document>(
  model: Model<T>,
  query: Record<string, any>
): Promise<string[]> {
  const queryKey = JSON.stringify(query);

  // Check if the distinct activity names are cached and not expired
  if (distinctActivityNamesCache[queryKey] && Date.now() - distinctActivityNamesCache[queryKey].timestamp < TTL) {
    return distinctActivityNamesCache[queryKey].names;
  }

  const pipeline = [
    { $match: query },
    { $group: { _id: "$name" } },
  ];
  const distinctActivityNames = await model.aggregate(pipeline);
  const activityNames = distinctActivityNames.map((doc) => doc._id);

  // Cache the distinct activity names with a timestamp
  distinctActivityNamesCache[queryKey] = { names: activityNames, timestamp: Date.now() };

  return activityNames;
}

async function getRandomActivity<T extends Document>(
  model: Model<T>,
  query: Record<string, any>,
  fetchedActivityIds: Set<string>,
  type?: string
): Promise<T> {
  const distinctActivityNames = await fetchDistinctActivityNames(model, query);

  const unfetchedActivityNames = distinctActivityNames.filter((name) => {
    const activityId = `${name}:${type}`;
    return !fetchedActivityIds.has(activityId);
  });

  if (unfetchedActivityNames.length === 0) {
    console.log(
      `No unfetched activities left in the database${type ? ` for type "${type}"` : ""}.`
    );
  } else {
    // Efficiently generate a random index using Fisher-Yates shuffle
    shuffleArray(unfetchedActivityNames);

    for (const randomActivityName of unfetchedActivityNames) {
      const activityId = `${randomActivityName}:${type}`;
      const randomActivity = await model.findOne({
        name: randomActivityName,
        type: type,
      });

      if (randomActivity) {
        fetchedActivityIds.add(activityId);
        return randomActivity;
      }
    }
  }

  // If no valid activity was found, throw an error or handle as needed.
  throw new Error("No valid unfetched activity found in the database.");
}

// Shuffle an array efficiently using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): void {
  let currentIndex = array.length, randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

const TTL = 3600 * 1000; // Cache TTL in milliseconds

export async function getRandomUnfetchedActivityFromDatabase<T extends Document>(
  model: Model<T>,
  fetchedActivityIds: Set<string>,
  type?: string
): Promise<T> {
  const query = type ? { type } : {};
  console.log("Query:", query);

  try {
    return await getRandomActivity(model, query, fetchedActivityIds, type);
  } catch (error) {
    console.error("Error:", error);
    // You can handle the error here or rethrow it if needed.
    throw error;
  }
}
