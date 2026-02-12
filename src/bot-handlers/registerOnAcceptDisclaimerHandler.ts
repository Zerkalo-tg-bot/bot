import type { Telegraf } from "telegraf";
import { userService } from "../api/user/user.service.js";
import { messageService } from "../api/message/message.service.js";
import { withTyping } from "../core/telegram/withTyping.js";

export function registerOnAcceptDisclaimerHandler(bot: Telegraf) {
  bot.action("accept_disclaimer", async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        const userId = ctx.callbackQuery.from.id;
        await userService.updateDisclaimer(userId, { acceptedDisclaimer: true }).catch((error) => {
          console.error("Error updating disclaimer acceptance:", error);
          throw error;
        });
        const greeting = await messageService.getGreeting(userId).catch((error) => {
          console.error("Error getting greeting from API:", error);
          throw error;
        });
        await ctx.reply(greeting.content);
      } catch (error) {
        console.error("Error in accept disclaimer handler:", error);
        await ctx.reply("Произошла ошибка при принятии условий использования. Пожалуйста, попробуйте еще раз позже.");
      } finally {
        await ctx.answerCbQuery();
      }
    });
  });
}
