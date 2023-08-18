/* // paginationMiddleware.ts

import { Request, Response, NextFunction } from 'express';

const defaultPage = 1;
const defaultPerPage = 10;

const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let page: number = parseInt(req.query.page as string) || defaultPage;
  let perPage: number = parseInt(req.query.perPage as string) || defaultPerPage;

  // Asegurarnos de que el número de página y el número por página sean enteros positivos
  page = Math.max(1, page);
  perPage = Math.max(1, perPage);


  // Idk how to make this tbh
  // Asignar los valores actualizados a req.query
  req.query.page = page;
  req.query.perPage = perPage;

  next();
};

export default paginationMiddleware;
 */