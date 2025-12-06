import type { Telegraf } from "telegraf";
import { chatService, messageService } from "../api/index.js";
export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
    ctx.sendChatAction("typing");
    const sendActionTimeoutId = setTimeout(() => {
      ctx.sendChatAction("typing");
    }, 5000);
    await chatService.resetChatState(ctx.message.from.id);
    const greeting = (await messageService.getGreeting(ctx.message.from.id)).data;
    ctx.reply(greeting || "Привет! Я готов к общению. Как я могу помочь вам сегодня?");
    clearTimeout(sendActionTimeoutId);
  });
}
