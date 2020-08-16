import "module-alias/register";
import express from "express";
import { config } from "@core/config";

export const createSuccessResponse = (
  response: express.Response,
  code = 200,
  data = {}
) =>
  response.status(code).json({
    status: "success",
    data,
  });

export const createFailResponse = (
  request: express.Request,
  response: express.Response,
  code = 400,
  message = "Bad Request",
  data = {},
  error = {}
) => {
  request.log.error({ err: error }, message);

  let responseBody: any;
  if (config.env === "development") {
    responseBody = {
      status: "fail",
      message,
      data,
      error,
    };
  } else {
    responseBody = {
      status: "fail",
      message,
      data,
    };
  }
  response.status(code).json(responseBody);
};

export const createErrorResponse = (
  request: express.Request,
  response: express.Response,
  code = 500,
  message = "Internal Server Error",
  error = {}
) => {
  request.log.error({ err: error }, message);

  let responseBody: any;
  if (config.env === "development") {
    responseBody = {
      status: "error",
      message,
      error,
    };
  } else {
    responseBody = {
      status: "error",
      message,
    };
  }
  response.status(code).json(responseBody);
};
