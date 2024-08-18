import { Router } from "express";
import ImageKit from "imagekit";

const imageKitRouter = Router();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT_URL,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

imageKitRouter.get("/auth", (req, res) => {
  console.log("Inside auth route");
  let result = imagekit.getAuthenticationParameters();
  res.send(result);
});

export { imageKitRouter };
