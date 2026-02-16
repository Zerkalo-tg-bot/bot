import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { chatService } from "../api/chat/chat.service.js";
import { userService } from "../api/user/user.service.js";
import { withTyping } from "../core/telegram/withTyping.js";
import i18n from "../i18n/i18n.js";
import { ELanguage } from "../core/enums/index.js";

export function registerOnResetHandler(bot: Telegraf) {
  bot.command("reset", async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        const userId = ctx.message.from.id;

        await chatService.resetChatState(userId).catch((error) => {
          console.error("Error resetting chat state:", error);
          throw error;
        });

        let lng = ELanguage.ENGLISH;
        try {
          const user = await userService.getUser(userId);
          lng = user.language ?? ELanguage.ENGLISH;
        } catch {
          // If user isn't available, fall back to English
        }

        await ctx.reply(i18n.t("info-section.reset_farewell", { lng }));
      } catch (error) {
        await sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later", ELanguage.ENGLISH);
      }
    });
  });
}
