import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { chatService } from "../api/chat/chat.service.js";
import { withTyping } from "../core/telegram/withTyping.js";
import { botConfigService } from "../api/bot-config/index.js";

export function registerOnResetHandler(bot: Telegraf) {
  bot.command("reset", async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        await chatService.resetChatState(ctx.message.from.id).catch((error) => {
          console.error("Error resetting chat state:", error);
          throw error;
        });

        await chatService.startChatSession(ctx.message.from.id).catch((error) => {
          console.error("Error starting chat session:", error);
          throw error;
        });

        const disclaimer = await botConfigService.getDisclaimer().catch((error) => {
          console.error("Error getting disclaimer from API:", error);
          throw error;
        });

        await ctx.reply(disclaimer.content, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "Продолжить", callback_data: "accept_disclaimer" }]],
          },
        });
      } catch (error) {
        sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
      }
    });
  });
}
