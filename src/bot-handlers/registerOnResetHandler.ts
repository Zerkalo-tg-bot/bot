import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { chatService } from "../api/chat/chat.service.js";
import { messageService } from "../api/message/message.service.js";

export function registerOnResetHandler(bot: Telegraf) {
  bot.command("reset", async (ctx) => {
    ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      await chatService.resetChatState(ctx.message.from.id);
    } catch (error) {
      console.error("Error resetting chat state:", error);
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
      return;
    }

    try {
      const response = await messageService.getGreeting(ctx.message.from.id);
      if (!response.data || !response.data.content) {
        throw new Error("No response data from API");
      }
      const greeting = response.data.content;
      clearInterval(sendActionIntervalId);
      ctx.reply(greeting);
    } catch (error) {
      console.error("Error getting greeting from API:", error);
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
  });
}
