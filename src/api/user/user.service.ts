import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";
import type { IUpdateDisclaimerDto } from "./dto/update-disclaimer.dto.js";
import type { IUpdateLanguageDto } from "./dto/update-language.dto.js";
import type { IUser } from "../../core/interfaces/index.js";

export const userService = {
  async getUser(telegramUserId: number): Promise<IUser> {
    const response = await getApiClient()
      .get<IUser>(`/user/${telegramUserId}`)
      .catch((error) => {
        console.error("Error getting user:", error);
        throw error;
      });
    return requireData(response);
  },

  async updateDisclaimer(telegramUserId: number, updateDisclaimerDto: IUpdateDisclaimerDto): Promise<IUser> {
    const response = await getApiClient()
      .patch<IUser>(`/user/${telegramUserId}/disclaimer`, updateDisclaimerDto)
      .catch((error) => {
        console.error("Error updating disclaimer acceptance:", error);
        throw error;
      });
    return requireData(response);
  },

  async updateLanguage(telegramUserId: number, updateLanguageDto: IUpdateLanguageDto): Promise<IUser> {
    const response = await getApiClient()
      .patch<IUser>(`/user/${telegramUserId}/language`, updateLanguageDto)
      .catch((error) => {
        console.error("Error updating language:", error);
        throw error;
      });
    return requireData(response);
  },
};
