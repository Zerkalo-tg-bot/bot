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

        const response = await messageService.getGreeting(ctx.message.from.id).catch((error) => {
          console.error("Error getting greeting from API:", error);
          throw error;
        });

        if (!response.data || !response.data.content) {
          throw new Error("No response data from API");
        }

        await ctx.reply(response.data.content);
      } catch {
        sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
      }
    });
  });
}
