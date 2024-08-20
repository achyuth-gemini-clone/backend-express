import Chat from "../models/chat.js";
import UserChat from "../models/userChats.js";
import { v4 as uuidv4 } from "uuid";
import InternalServerError from "../exceptions/InternalServerError.js";

class ChatService {
  async setNewChat(requestBody) {
    const { userId, text } = requestBody;

    try {
      const newChat = new Chat({
        userId: userId,
        history: [{ role: "user", parts: [{ text }] }],
      });

      const savedChat = await newChat.save();

      const userChats = await this.checkUserChats(userId);

      if (!userChats.length) {
        const newUserChat = new UserChat({
          userId: userId,
          chats: [
            {
              _id: savedChat.id,
              title: text.substring(0, 40),
            },
          ],
        });

        await newUserChat.save();
      } else {
        await UserChat.updateOne(
          { userId: userId },
          {
            $push: {
              chats: {
                _id: savedChat._id,
                title: text.substring(0, 40),
              },
            },
          }
        );
      }
      return newChat.id;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  async updateChat(id, userId, newItems) {
    const updateTheChat = await Chat.updateOne(
      { _id: id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );

    return updateTheChat;
  }

  async checkUserChats(userId) {
    const userChats = await UserChat.find({ userId: userId });
    return userChats;
  }

  async fetchChatByChatIdAndUserId(id, userId) {
    const chats = await Chat.findOne({ _id: id, userId });
    return chats;
  }
}

export default ChatService;
