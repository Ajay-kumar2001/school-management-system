import { NextFunction, Request, Response } from "express";
import response from "../utils/errorHandler";

// Abstract class for error responses
export abstract class ErrorResponse extends Error {
  abstract statusCode: number;
  abstract status: string;
  abstract error: string;
}

// Error handling middleware function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): Response => {
  // Using default fallback for statusCode and message
  const statusCode: number = err?.statusCode || 500;  
  const message: string = err?.message || 'An unexpected error occurred';

  return res.status(statusCode).json({
    code: statusCode,
    status: response.getStatusType(statusCode),
    message: message,
  });
};
