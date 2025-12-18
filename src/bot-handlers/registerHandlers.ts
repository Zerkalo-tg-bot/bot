import type { Telegraf } from "telegraf";
import { registerOnTextHandler } from "./registerOnTextHandler.js";
import { registerOnStartHandler } from "./registerOnStartHandler.js";
import { registerOnResetHandler } from "./registerOnResetHandler.js";

export function registerHandlers(bot: Telegraf) {
  registerOnStartHandler(bot);
  registerOnResetHandler(bot);
  registerOnTextHandler(bot);
}
