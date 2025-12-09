import axios from "axios";
import type { IClientMessage } from "../../model/index.js";

export const messageService = {
  sendMessage(telegramUserId: number, message: IClientMessage) {
    return axios.post(`${process.env.API_URL}/${telegramUserId}/message`, message);
  },

  getGreeting(telegramUserId: number) {
    return axios.get(`${process.env.API_URL}/${telegramUserId}/message/greeting`);
  },
};
