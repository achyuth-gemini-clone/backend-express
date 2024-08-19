import { connect } from "mongoose";
import InternalServerError from "../exceptions/InternalServerError.js";

const connectToDB = async (req, res, next) => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to Database Successfully");
    next();
  } catch (err) {
    throw new InternalServerError(err + "");
    next(err);
  }
};

export default connectToDB;
