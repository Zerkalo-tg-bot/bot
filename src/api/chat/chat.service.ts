import axios from "axios";
import type { IUser } from "../../core/interfaces/user.interface.js";

export const chatService = {
  resetChatState(telegramUserId: number) {
    return axios.delete(`${process.env.API_URL}/${telegramUserId}/chat`);
  },

  startChatSession(telegramUserId: number) {
    return axios.post<IUser>(`${process.env.API_URL}/${telegramUserId}/chat`);
  },
};
