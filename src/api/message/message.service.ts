import type { IMessage } from "../../core/interfaces/index.js";
import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";

export const messageService = {
  async sendMessage(telegramUserId: number, message: IMessage): Promise<IMessage> {
    const response = await getApiClient().post<IMessage>(`/${telegramUserId}/message`, message);
    return requireData(response);
  },

  async getGreeting(telegramUserId: number): Promise<IMessage> {
    const response = await getApiClient().get<IMessage>(`/${telegramUserId}/message/greeting`);
    return requireData(response);
  },
};
