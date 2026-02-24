import type { Telegraf } from "telegraf";
import { canRequest } from "../api/http/canRequest.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { ELanguage } from "../core/enums/language.enum.js";

export function registerRequestMiddleware(bot: Telegraf) {
  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;
    if (!userId) {
      return;
    }

    if (!canRequest(userId)) {
      await sendLocalizedStaticMessage(ctx, "error-section.you_are_sending_messages_too_frequently", ELanguage.ENGLISH);
      return;
    }

    await next();
  });
}
