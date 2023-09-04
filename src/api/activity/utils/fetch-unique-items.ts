import { Model, Document } from 'mongoose';

export function createFetchUniqueActivities<T extends Document, M extends Model<T>>(
  model: M,
  numberOfActivitiesToCreate: number
): (type?: string) => Promise<T[]> {
  return async (type?: string): Promise<T[]> => {
    const aggregationQuery = type ? { type } : {};

    try {
      const items: T[] = await model.aggregate([
        { $match: aggregationQuery },
        { $sample: { size: numberOfActivitiesToCreate } },
      ]);

      return items;
    } catch (error) {
      console.error("Error fetching unique items:", error);
      return [];
    }
  };
}
