import type { Telegraf } from "telegraf";
import { chatService } from "../api/index.js";
export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
    await chatService.resetChatState(ctx.message.from.id);
    ctx.reply("Привет! Я готов к общению. Как я могу помочь вам сегодня?");
  });
}
