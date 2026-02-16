import type { Telegraf } from "telegraf";
import { userService } from "../api/user/user.service.js";
import { messageService } from "../api/message/message.service.js";
import { withTyping } from "../core/telegram/withTyping.js";
import i18n from "../i18n/i18n.js";
import { ELanguage } from "../core/enums/index.js";

export function registerOnAcceptDisclaimerHandler(bot: Telegraf) {
  bot.action("accept_disclaimer", async (ctx) => {
    await withTyping(ctx, async () => {
      let lng = ELanguage.ENGLISH;
      try {
        await ctx.answerCbQuery();
        const userId = ctx.callbackQuery.from.id;

        const user = await userService.getUser(userId).catch((error) => {
          console.error("Error getting user:", error);
          throw error;
        });

        lng = user.language;

        if (user.acceptedDisclaimer) {
          try {
            await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
          } catch {
            // Ignore if message can't be edited (e.g., too old, already edited)
          }
          return;
        }

        await userService.updateDisclaimer(userId, { acceptedDisclaimer: true }).catch((error) => {
          console.error("Error updating disclaimer acceptance:", error);
          throw error;
        });

        try {
          await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
        } catch {
          // Ignore if message can't be edited
        }

        const greeting = await messageService.getGreeting(userId).catch((error) => {
          console.error("Error getting greeting from API:", error);
          throw error;
        });
        await ctx.reply(greeting.content);
      } catch (error) {
        console.error("Error in accept disclaimer handler:", error);
        await ctx.reply(i18n.t("info-section.accept_disclaimer_failed", { lng }));
      } finally {
      }
    });
  });
}
