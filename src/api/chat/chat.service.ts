import axios from "axios";

export const chatService = {
  resetChatState(telegramUserId: number) {
    return axios.delete(`${process.env.API_URL}/chat/${telegramUserId}`);
  },
};
