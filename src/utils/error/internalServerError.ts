import { NextFunction } from "express";
import { createErrorResponse } from "../response";

export function internalServerError(
  err: any,
  req: any,
  res: any,
  next: NextFunction
) {
  return createErrorResponse(req, res, 500, "Internal Server Error", err);
}
