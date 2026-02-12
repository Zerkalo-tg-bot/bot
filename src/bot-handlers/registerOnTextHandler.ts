import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { messageService, type ISendMessage } from "../api/message/index.js";
import { userService } from "../api/user/user.service.js";
import { withTyping } from "../core/telegram/withTyping.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("message", async (ctx) => {
    await withTyping(ctx, async () => {
      try {
        const user = await userService.getUser(ctx.message.from.id).catch((error) => {
          console.error("Error getting user:", error);
          throw error;
        });

        if (!user.acceptedDisclaimer) {
          await ctx.reply("Пожалуйста, примите условия использования, прежде чем отправлять сообщения.");
          return;
        }

        const msg = ctx.message;
        if (!("text" in msg) || typeof msg.text !== "string") {
          return;
        }

        const clientMessage: ISendMessage = { content: msg.text };
        const response = await messageService.sendMessage(ctx.message.from.id, clientMessage).catch((error) => {
          console.error("Error sending message to API:", error);
          throw error;
        });

        await ctx.reply(response.content);
      } catch {
        sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
      }
    });
  });
}
