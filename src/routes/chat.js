import { Router } from "express";
import ChatService from "../services/ChatService.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import UserChatService from "../services/UserChatService.js";
import { setSameSiteNone } from "../middleware/same_site_none.js";

const chatRouter = Router();

chatRouter.post("/chat", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;

  const { text } = req.body;

  const chatService = new ChatService();

  const id = await chatService.setNewChat({ userId, text });

  res.status(200).send(id);
});

chatRouter.get("/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;

  const userChatService = new UserChatService();

  const userChats = await userChatService.fetchUserChatsById(userId);

  if (userChats.length === 0) {
    res.status(200).send([]);
  } else res.status(200).send(userChats[0].chats);
});

chatRouter.get("/chat/test", ClerkExpressRequireAuth(), async (req, res) => {
  res.send([{ Message: "Yoohoo!!" }]);
});

chatRouter.get("/chat/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const { id } = req.params;
  const { userId } = req.auth;

  const chatService = new ChatService();

  const chat = await chatService.fetchChatByChatIdAndUserId(id, userId);

  res.status(200).send(chat);
});

export { chatRouter };
