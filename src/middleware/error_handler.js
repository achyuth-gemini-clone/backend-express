import CustomError from "../exceptions/CustomError.js";

const errorHandler = async (err, req, res, next) => {
  console.log("Inside Error Handler");

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(500).send({
    message: "Something went wrong internally",
  });
};

export { errorHandler };
