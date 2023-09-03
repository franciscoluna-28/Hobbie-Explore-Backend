import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import { IPredefinedActivity } from "../types/activityTypes";

// Create a new instance of the cache
export const myCache = new NodeCache({ stdTTL: 3600 });

// Cache middleware function
function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  // Generate a unique cache key based on the request URL
  const cacheKey = req.originalUrl as string;

  // Check if the data is in the cache
  const cachedData = myCache.get<IPredefinedActivity>(cacheKey); // Specify the type of cached data here

  if (cachedData) {
    // If data is found in cache, send it as the response
    res.json(cachedData);
  } else {
    // If data is not found in cache, proceed to the next middleware/route
    next();
  }
}

export default cacheMiddleware;
