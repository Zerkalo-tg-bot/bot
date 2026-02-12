import type { Telegraf } from "telegraf";
import { userService } from "../api/user/user.service.js";

export function registerOnAcceptDisclaimerHandler(bot: Telegraf) {
  bot.action("accept_disclaimer", async (ctx) => {
    await ctx.answerCbQuery();
    const userId = ctx.callbackQuery.from.id;

    try {
      await userService.updateDisclaimer(userId, { acceptedDisclaimer: true });
    } catch (error) {
      console.error("Error updating disclaimer acceptance:", error);
      await ctx.reply("Произошла ошибка при принятии условий использования. Пожалуйста, попробуйте еще раз.");
      return;
    }

    await ctx.reply("Спасибо! Поехали.");
  });
}
