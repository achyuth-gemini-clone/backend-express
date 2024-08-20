import InternalServerError from "../exceptions/InternalServerError.js";
import UserChats from "../models/userChats.js";

class UserChatService {
  async fetchUserChatsById(userId) {
    try {
      const userChats = await UserChats.find({ userId: userId });

      return userChats;
    } catch (err) {
      console.log(err.stack);
      throw new InternalServerError(err.message);
    }
  }
}

export default UserChatService;
