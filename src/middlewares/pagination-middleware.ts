import { Request, Response, NextFunction } from "express";

// Constants to avoid magic values
const defaultPageValue: number = 1;
const defaultLimitValue: number = 10;

// Extend the Request type from express to use the pagination service
export interface PaginationRequest extends Request {
  pagination: {
    page: number;
    limit: number;
  };
}

// Declare the pagination types
interface PaginationOptions {
  defaultPage?: number;
  defaultLimit?: number;
}

// Make the pagination Middleware function. Which is a function that can use a default page value and a default limit value
export const paginationMiddleware = (options?: PaginationOptions) => {
  const defaultPage = options?.defaultPage || defaultPageValue;
  const defaultLimit = options?.defaultLimit || defaultLimitValue;

  return (req: PaginationRequest, _res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || defaultPage;
    const limit = parseInt(req.query.limit as string) || defaultLimit;

    req.pagination = {
      page,
      limit,
    };

    // Proceed to the next request
    next();
  };
};
