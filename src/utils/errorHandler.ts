import { NextFunction } from "express";

enum STATUS_TYPE {
  SUCCESS = "Success",
  PARTIAL_SUCCESS = "Partial Success",
  WARNING = "Warning",
  INFO = "Info",
  ERROR = "Error",
  SERVER_ERROR = "Internal server error"
}
export class ErrorHandler extends Error {
  // Fields
  statusCode: number;
  message: string;
  statusType: string
  // Constructor
  constructor(error) {
    super();
    this.statusCode = error.statusCode || 500;
    this.message = error.message || "An error occurred";
    this.statusType = this.getStatusType(error.statusCode)
  }

  // Method for sending a success response
  successResponse(res) {
    return res.response.status(res.statusCode).json({
      Code: res.statusCode,
      status: this.getStatusType(res.statusCode),
      message: res.message,
      data: [res.data]
    });
  }


  // Method for sending a failure response
  failureResponse(res) {

    return res.response.status(res.statusCode).json({
      Code: res.statusCode,
      status: this.getStatusType(res.statusCode),
      message: res.message,
    });

  }

  errorReResponse(res: { next: NextFunction; error: { statusCode?: number; message?: string } }) {
    const { next, error } = res
    const err = new ErrorHandler(error);
    next(err);

  }

  // Method to determine status type
  getStatusType(code: number): string {
    const status = { type: "" };
    switch (code) {
      case 206:
        status.type = STATUS_TYPE.PARTIAL_SUCCESS;
        break;
      case 299:
        status.type = STATUS_TYPE.WARNING;
        break;
      case 200:
      case 201:
      case 202:
      case 203:
      case 204:
      case 205:
        status.type = STATUS_TYPE.SUCCESS;
        break;
      case 301:
      case 302:
      case 303:
      case 304:
        status.type = STATUS_TYPE.INFO;
        break;
      case 400:
      case 401:
      case 403:
      case 404:
      case 405:
      case 409:
      case 428:
      case 412:
        status.type = STATUS_TYPE.ERROR;
        break;
      case 500:
      case 501:
      case 503:
        status.type = STATUS_TYPE.SERVER_ERROR;
        break;
      default:
        status.type = STATUS_TYPE.SERVER_ERROR; // Default to error
    }
    return status.type;
  }


}

// Example instantiation
const response = new ErrorHandler({ statusCode: 400, message: "Bad Request" });
export default response;
