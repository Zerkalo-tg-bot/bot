import axios from "axios";
import type { BotDisclaimerDto } from "./dto/bot-disclaimer.dto.js";

export const botConfigService = {
  getDisclaimer() {
    return axios.get<BotDisclaimerDto>(`${process.env.API_URL}/bot-config/disclaimer`);
  },
};
