// customError.ts
export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = "Invalid data") {
    super(message, 400);
  }
}

export class DuplicateError extends CustomError {
  constructor(message: string = "DuplicateEntryError") {
    super(message, 409);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

export class DbError extends CustomError {
  constructor(message: string = "Db error") {
    super(message, 500);
  }
}
