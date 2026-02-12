import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { chatService } from "../api/chat/chat.service.js";
import { messageService } from "../api/message/message.service.js";
import { withTyping } from "../core/telegram/withTyping.js";

export function registerOnResetHandler(bot: Telegraf) {
  bot.command("reset", async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        await chatService.resetChatState(ctx.message.from.id).catch((error) => {
          console.error("Error resetting chat state:", error);
          throw error;
        });

        const greeting = await messageService.getGreeting(ctx.message.from.id).catch((error) => {
          console.error("Error getting greeting from API:", error);
          throw error;
        });

        await ctx.reply(greeting.content);
      } catch {
        sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
      }
    });
  });
}
