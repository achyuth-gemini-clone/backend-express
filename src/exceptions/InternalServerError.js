import CustomError from "./CustomError.js";

class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default InternalServerError;
