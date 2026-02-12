import axios from "axios";
import type { IUpdateDisclaimerDto } from "./dto/update-disclaimer.dto.js";
import type { IUser } from "../../core/interfaces/user.interface.js";

export const userService = {
  async getUser(telegramUserId: number) {
    return axios.get<IUser>(`${process.env.API_URL}/user/${telegramUserId}`);
  },

  async updateDisclaimer(telegramUserId: number, updateDisclaimerDto: IUpdateDisclaimerDto) {
    return axios.patch<IUser>(`${process.env.API_URL}/user/${telegramUserId}/disclaimer`, updateDisclaimerDto);
  },
};
