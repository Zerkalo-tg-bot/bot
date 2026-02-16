import type { Telegraf } from "telegraf";
import i18n from "../i18n/i18n.js";
import { userService } from "../api/user/user.service.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { ELanguage } from "../core/enums/language.enum.js";

export function registerOnSelectLanguageHandler(bot: Telegraf) {
  bot.action(/set_lang:(en|ru|pl)/, async (ctx) => {
    try {
      await ctx.answerCbQuery();

      const userId = ctx.callbackQuery.from.id;
      const selected = String(ctx.match?.[1] ?? "");
      if (selected !== ELanguage.ENGLISH && selected !== ELanguage.RUSSIAN && selected !== ELanguage.POLISH) {
        return;
      }

      const lng = selected;

      await userService.updateLanguage(userId, { language: lng }).catch((error) => {
        console.error("Error updating user language:", error);
        throw error;
      });

      const disclaimerText = i18n.t("info-section.disclaimer", { lng });
      const continueLabel = i18n.t("info-section.continue_button", { lng });

      try {
        await ctx.editMessageText(disclaimerText, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: continueLabel, callback_data: "accept_disclaimer" }]],
          },
        });
      } catch {
        await ctx.reply(disclaimerText, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: continueLabel, callback_data: "accept_disclaimer" }]],
          },
        });
      }
    } catch {
      await sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later", ELanguage.ENGLISH);
    }
  });
}
