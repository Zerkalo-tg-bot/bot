import axios from "axios";
import type { IClientMessage } from "./model.js";

export function sendMessage(message: IClientMessage) {
  return axios.post(`${process.env.API_URL}/chat`, message);
}
