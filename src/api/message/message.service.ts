import axios from "axios";
import type { IClientMessage } from "../../model/index.js";

export const messageService = {
  sendMessage(message: IClientMessage) {
    return axios.post(`${process.env.API_URL}/message`, message);
  },

  getGreeting(telegramUserId: number) {
    return axios.post(`${process.env.API_URL}/message/greet/${telegramUserId}`);
  },
};
