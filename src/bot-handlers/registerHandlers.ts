import type { Telegraf } from "telegraf";
import { registerOnTextHandler } from "./registerOnTextHandler.js";
import { registerOnStartHandler } from "./registerOnStartHandler.js";
import { registerOnResetHandler } from "./registerOnResetHandler.js";
import { registerOnAcceptDisclaimerHandler } from "./registerOnAcceptDisclaimerHandler.js";
import { registerOnSelectLanguageHandler } from "./registerOnSelectLanguageHandler.js";

export function registerHandlers(bot: Telegraf) {
  registerOnStartHandler(bot);
  registerOnResetHandler(bot);
  registerOnTextHandler(bot);
  registerOnAcceptDisclaimerHandler(bot);
  registerOnSelectLanguageHandler(bot);
}
