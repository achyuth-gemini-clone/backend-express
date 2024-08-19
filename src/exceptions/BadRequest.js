import CustomError from "./CustomError.js";

class BadRequest extends CustomError {
  statusCode = 400;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default BadRequest;
