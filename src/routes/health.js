import { Router } from "express";

const testRouter = Router();

testRouter.get("/", () => {
  res.status(200).send({ Message: "Lambda Running fine" });
});

testRouter.get("/health", (req, res) => {
  res.status(200).send({ Message: "Server is running fine" });
});

export { testRouter };
