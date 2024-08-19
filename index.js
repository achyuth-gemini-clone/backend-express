import serverless from "serverless-http";
// import express from "express";
import { app } from "./src/app.js";

const PORT = process.env.PORT || 3000;

if (process.env.ENVIRONMENT !== "PROD") {
  app.listen(PORT, () => {
    console.log("Server running on 3000");
  });
}

// module.exports.handler = serverless(app);

export const handler = serverless(app);
