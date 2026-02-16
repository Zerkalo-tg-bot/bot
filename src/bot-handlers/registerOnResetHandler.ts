import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { chatService } from "../api/chat/chat.service.js";
import { withTyping } from "../core/telegram/withTyping.js";
import i18n from "../i18n/i18n.js";
import { ELanguage } from "../core/enums/index.js";

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

        const lng = ELanguage.ENGLISH; // Default language
        const chooseLanguageText = i18n.t("info-section.choose_language", { lng });

        await ctx.reply(chooseLanguageText, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Русский", callback_data: "set_lang:ru" },
                { text: "English", callback_data: "set_lang:en" },
                { text: "Polski", callback_data: "set_lang:pl" },
              ],
            ],
          },
        });
      } catch (error) {
        sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later", ELanguage.ENGLISH);
      }
    });
  });
}
