import type { Telegraf } from "telegraf";
import { registerOnTextHandler } from "./registerOnTextHandler.js";
import { registerOnStartHandler } from "./registerOnStartHandler.js";

export function registerHandlers(bot: Telegraf) {
  registerOnStartHandler(bot);
  registerOnTextHandler(bot);
}
