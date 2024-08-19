import ChatSchema from "../models/chat";
import { v4 as uuidv4 } from "uuid";

class ChatService {
  localChatSchema = new ChatSchema();

  constructor() {}

  CreateNewChat(inputBody) {
    someLocal = new ChatSchema({
      userId: "1",
    });
  }
}

export default ChatService;
