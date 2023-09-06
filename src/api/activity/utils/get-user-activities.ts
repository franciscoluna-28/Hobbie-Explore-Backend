import { Document, PaginateModel } from "mongoose";
import { PaginateOptions, PaginateResult } from "mongoose";

// Define a generic function for pagination
async function paginateModel<T extends Document>(
  model: PaginateModel<T>,
  conditions: Record<string, any>,
  options: PaginateOptions
): Promise<PaginateResult<T>> {
  try {
    const result = await model.paginate(conditions, options);
    return result;
  } catch (error) {
    console.error("Error paginating model:", error);
    throw new Error("An error occurred while paginating the model");
  }
}

export default paginateModel;
