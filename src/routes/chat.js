import { Router } from "express";
import ChatService from "../services/ChatService.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import UserChatService from "../services/UserChatService.js";
// import { setSameSiteNone } from "../middleware/same_site_none.js";

const chatRouter = Router();

chatRouter.post("/chat", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;

  const { text } = req.body;

  console.log("Inside New Chat");
  console.log(req.body);

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

chatRouter.put("/chat/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const { id } = req.params;
  const { userId } = req.auth;
  const { question, answer, img } = req.body;

  console.log("Inside Chat put router");
  console.log(req.body);

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  const chatService = new ChatService();

  const updatedChat = await chatService.updateChat(id, userId, newItems);

  console.log(updatedChat);

  res.status(200).send(updatedChat);
});

export { chatRouter };
