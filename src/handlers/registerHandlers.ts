import type { Telegraf } from "telegraf";
import { registerOnTextHandler } from "./registerOnTextHandler";
import { registerOnStartHandler } from "./registerOnStartHandler";

export function registerHandlers(bot: Telegraf) {
  registerOnStartHandler(bot);
  registerOnTextHandler(bot);
}
