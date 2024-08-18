import serverless from "serverless-http";
// import express from "express";
import { app } from "./src/app.js";

const PORT = process.env.PORT || 3000;

// const app = express();

// app.get("/test", (req, res) => {
//   res.status(200).send({ Message: "Working perfectly" });
// });

// app.get("/", (req, res) => {
//   res.status(200).send({ Message: "Working perfectly in AWS Lambda" });
// });

app.listen(PORT, () => {
  console.log("Server running on 3000");
});

// module.exports.handler = serverless(app);

export const handler = serverless(app);
