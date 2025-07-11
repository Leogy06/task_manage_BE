import { HttpError } from "../classes/httpError.js";

// not found
export class NotFound extends HttpError {
  constructor(message = "Resource not found.") {
    super(message, 404);
  }
}

export class Unauthorized extends HttpError {
  constructor(message = "Restricted access.") {
    super(message, 401);
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Validation Error.") {
    super(message, 400);
  }
}

export class Forbidden extends HttpError {
  constructor(message = "Forbidden access.") {
    super(message, 400);
  }
}
