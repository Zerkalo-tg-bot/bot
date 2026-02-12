import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";
import type { ISendMessage } from "./model/send-message.interface.js";
import type { IMessageResponse } from "./model/index.js";

export const messageService = {
  async sendMessage(telegramUserId: number, message: ISendMessage): Promise<IMessageResponse> {
    const response = await getApiClient().post<IMessageResponse>(`/${telegramUserId}/message`, message);
    return requireData(response);
  },

  async getGreeting(telegramUserId: number): Promise<IMessageResponse> {
    const response = await getApiClient().get<IMessageResponse>(`/${telegramUserId}/message/greeting`);
    return requireData(response);
  },
};
