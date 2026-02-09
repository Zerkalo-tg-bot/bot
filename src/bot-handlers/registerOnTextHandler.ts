import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { messageService, type ISendMessage } from "../api/message/index.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("message", async (ctx) => {
    const msg = ctx.message;
    ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      if ("text" in msg && typeof msg.text === "string") {
        const text = msg.text;
        const clientMessage: ISendMessage = { content: text };
        const response = await messageService.sendMessage(ctx.message.from.id, clientMessage);
        if (!response.data || !response.data.content) {
          throw new Error("No response data from API");
        }
        clearInterval(sendActionIntervalId);
        ctx.reply(response.data.content);
      }
    } catch (error) {
      console.error("Error sending message to API:", error);
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
  });
}
