import { Router } from "express";

const chatRouter = Router();

chatRouter.post("/chat", (req, res) => {
  const { text } = req.body;

  res.status(200).send(req.body);
});

export { chatRouter };
