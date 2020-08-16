import { NextFunction } from "express";
import * as expressValidation from "express-validation";

import { createFailResponse } from "../response";

export function validationError(
  err: any,
  req: any,
  res: any,
  next: NextFunction
) {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    // @ts-ignore
    const errorMessage = err.errors
      .map((error: any) =>
        error.messages.reduce(
          (acc: string, message: string) =>
            `${message} in ${error.location}. ${acc}`,
          ""
        )
      )
      .join("");
    return createFailResponse(
      req,
      res,
      400,
      "Bad Request",
      { errorMessage },
      err
    );
  } else {
    next(err);
  }
}
