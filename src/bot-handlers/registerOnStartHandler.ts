import type { Telegraf } from "telegraf";
import { chatService, messageService } from "../api/index.js";
export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
     ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      await chatService.resetChatState(ctx.message.from.id);
      const greeting = (await messageService.getGreeting(ctx.message.from.id)).data;
      clearInterval(sendActionIntervalId);
      if (!greeting) {
        ctx.reply("Ошибка при получении приветственного сообщения. Пожалуйста, попробуйте еще раз позже.");
        return;
      }
      ctx.reply(greeting);
    } catch (error) {
      console.error("Error getting greeting from API:", error);
      ctx.reply("Ошибка при получении приветственного сообщения. Пожалуйста, попробуйте еще раз позже.");
      clearInterval(sendActionIntervalId);
    }
  });
}
