import type { Telegraf } from "telegraf";
import { canRequest } from "../api/http/canRequest.js";

export function registerRequestMiddleware(bot: Telegraf) {
  bot.use(async (ctx, next) => {
    console.log(`Received update of type ${ctx.updateType} from user ${ctx.from?.id}`);
    const userId = ctx.from?.id;
    if (!userId) {
      return;
    }

    if (!canRequest(userId)) {
      await ctx.reply("You are sending requests too quickly. Please wait a moment.");
      return;
    }

    await next();
  });
}
