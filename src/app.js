import express from "express";
import { imageKitRouter } from "./routes/imagekit_routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.REACT_CLIENT_URL,
  })
);

// const imagekit = new ImageKit({
//   urlEndpoint: process.env.IMAGE_KIT_ENDPOINT_URL,
//   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(imageKitRouter);

app.get("/test", (req, res) => {
  res.status(200).send({ Message: "Working perfectly" });
});

app.get("/test2", (req, res) => {
  res.status(200).send({ Message: "Working perfectly 2" });
});

app.get("/", (req, res) => {
  res.status(200).send({ Message: "Working perfectly in AWS Lambda" });
});

export { app };
