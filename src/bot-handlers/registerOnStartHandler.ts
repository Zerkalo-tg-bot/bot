import type { Telegraf } from "telegraf";
import { chatService } from "../api/chat/index.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { withTyping } from "../core/telegram/withTyping.js";
import i18n from "../i18n/i18n.js";
import { ELanguage } from "../core/enums/index.js";
import { userService } from "../api/user/user.service.js";

export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        const user = await userService.getUser(ctx.message.from.id).catch(() => null);

        if (user) {
          await sendLocalizedStaticMessage(
            ctx,
            "info-section.it_seems_like_our_conversation_is_already_in_progress",
            user.language,
          );
          return;
        }

        await chatService.startChatSession(ctx.message.from.id);

        const lng = ELanguage.ENGLISH; // Default language

        const chooseLanguageText = i18n.t("info-section.choose_language", { lng });

        await ctx.reply(chooseLanguageText, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Polski", callback_data: `set_lang:${ELanguage.POLISH}` },
                { text: "English", callback_data: `set_lang:${ELanguage.ENGLISH}` },
                { text: "Русский", callback_data: `set_lang:${ELanguage.RUSSIAN}` },
              ],
            ],
          },
        });
      } catch (error) {
        console.error("Error in start handler:", error);
        await sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later", ELanguage.ENGLISH);
      }
    });
  });
}
