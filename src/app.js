import express from "express";

const app = express();

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
