import CustomError from "../exceptions/CustomError.js";

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.log(err.stack);

  res.status(500).send({
    message: err.message,
  });
};

export { errorHandler };
