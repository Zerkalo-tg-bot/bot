import type { Telegraf } from "telegraf";
import { chatService, messageService } from "../api/index.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
export function registerOnResetHandler(bot: Telegraf) {
  bot.command("reset", async (ctx) => {

    ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      await chatService.resetChatState(ctx.message.from.id);
      const greeting = (await messageService.getGreeting(ctx.message.from.id)).data;
      if (!greeting) {
        throw new Error("No greeting message from API");
      }
      clearInterval(sendActionIntervalId);
      ctx.reply(greeting);
    } catch (error) {
      console.error("Error getting greeting from API:", error);
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
  });
}
