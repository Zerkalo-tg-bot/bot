import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";
import type { IUpdateDisclaimerDto } from "./dto/update-disclaimer.dto.js";
import type { IUser } from "../../core/interfaces/index.js";

export const userService = {
  async getUser(telegramUserId: number): Promise<IUser> {
    const response = await getApiClient().get<IUser>(`/user/${telegramUserId}`);
    return requireData(response);
  },

  async updateDisclaimer(telegramUserId: number, updateDisclaimerDto: IUpdateDisclaimerDto): Promise<IUser> {
    const response = await getApiClient().patch<IUser>(`/user/${telegramUserId}/disclaimer`, updateDisclaimerDto);
    return requireData(response);
  },
};
