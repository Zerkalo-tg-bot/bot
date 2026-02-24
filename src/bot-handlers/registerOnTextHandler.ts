import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { messageService } from "../api/message/index.js";
import { userService } from "../api/user/user.service.js";
import { withTyping } from "../core/telegram/withTyping.js";
import type { IMessage } from "../core/interfaces/index.js";
import i18n from "../i18n/i18n.js";
import { ELanguage } from "../core/enums/index.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) {
      await sendLocalizedStaticMessage(ctx, "error-section.this_command_does_not_exist", ELanguage.ENGLISH);
      return;
    }
    if (ctx.message)
      await withTyping(ctx, async () => {
        try {
          const user = await userService.getUser(ctx.message.from.id);

          if (!user.acceptedDisclaimer) {
            const disclaimerText = i18n.t("info-section.disclaimer", { lng: user.language });
            const continueLabel = i18n.t("info-section.continue_button", { lng: user.language });

            await ctx.reply(disclaimerText, {
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [[{ text: continueLabel, callback_data: "accept_disclaimer" }]],
              },
            });
            return;
          }

          const msg = ctx.message;

          if (msg.text.length > 1000) {
            await sendLocalizedStaticMessage(ctx, "error-section.message_too_long_max_length_is_1000_characters", user.language);
            return;
          }

          const clientMessage: IMessage = { content: msg.text };
          const response = await messageService.sendMessage(ctx.message.from.id, clientMessage);

          await ctx.reply(response.content);
        } catch (error) {
          console.error("Error in text message handler:", error);
          await sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later", ELanguage.ENGLISH);
        }
      });
  });
}
