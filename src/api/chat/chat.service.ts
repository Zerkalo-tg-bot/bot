import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";
import type { IUser } from "../../core/interfaces/index.js";

export const chatService = {
  async resetChatState(telegramUserId: number): Promise<void> {
    await getApiClient().delete(`/${telegramUserId}/chat`);
  },

  async startChatSession(telegramUserId: number): Promise<IUser> {
    const response = await getApiClient().post<IUser>(`/${telegramUserId}/chat`);
    return requireData(response);
  },
};
