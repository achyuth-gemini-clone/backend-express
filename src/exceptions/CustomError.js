class CustomError extends Error {
  statusCode;

  constructor(message) {
    super(message);
  }

  serializeError() {}
}

export default CustomError;
