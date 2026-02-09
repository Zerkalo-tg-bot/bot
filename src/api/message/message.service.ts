import axios from "axios";
import type { ISendMessage } from "./model/send-message.interface.js";
import type { IMessageResponse } from "./model/index.js";

export const messageService = {
  sendMessage(telegramUserId: number, message: ISendMessage) {
    return axios.post<IMessageResponse>(`${process.env.API_URL}/${telegramUserId}/message`, message);
  },

  getGreeting(telegramUserId: number) {
    return axios.get<IMessageResponse>(`${process.env.API_URL}/${telegramUserId}/message/greeting`);
  },
};
