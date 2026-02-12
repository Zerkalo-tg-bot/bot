import type { Telegraf } from "telegraf";
import { chatService } from "../api/chat/index.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { botConfigService } from "../api/bot-config/bot-config.service.js";
import { withTyping } from "../core/telegram/withTyping.js";

export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
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
