import { Router } from "express";
import ChatService from "../services/ChatService.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import UserChatService from "../services/UserChatService.js";

const chatRouter = Router();

chatRouter.post("/chat", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;

  const { text } = req.body;

  console.log(req.body);

  const chatService = new ChatService();

  const id = await chatService.setNewChat({ userId, text });

  console.log(id);

  res.status(200).send(id);
});

chatRouter.get("/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;

  const userChatService = new UserChatService();

  const userChats = await userChatService.fetchUserChatsById(userId);

  console.log(userChats);

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

// chatRouter.get("/chat/test", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   res.send(userId);
// });

export { chatRouter };
