import { getApiClient } from "../http/apiClient.js";
import { requireData } from "../http/unwrap.js";
import type { BotDisclaimerDto } from "./dto/bot-disclaimer.dto.js";

export const botConfigService = {
  async getDisclaimer(): Promise<BotDisclaimerDto> {
    const response = await getApiClient().get<BotDisclaimerDto>(`/bot-config/disclaimer`);
    return requireData(response);
  },
};
