import { NextFunction, Request, Response } from "express";
import response from "../utils/errorHandler";
export abstract class ErrorResponse extends Error {
  abstract statusCode: number;
  abstract status: string;
  abstract error: string;

}

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  console.log(next,req)
  const { statusCode, message } = err;
  return res.status(statusCode).json({
    code: statusCode,
    status: response.getStatusType(statusCode),
    message: message,

  });

};
 