import axios from "axios";
import type { IClientMessage } from "./model.js";

export const messageService = {
  sendMessage(message: IClientMessage) {
    return axios.post(`${process.env.API_URL}/message`, message);
  },
};
