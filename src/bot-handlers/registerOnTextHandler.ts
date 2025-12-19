import type { Telegraf } from "telegraf";
import { messageService } from "../api/index.js";
import type { IClientMessage } from "../model/index.js";
import i18n from "../i18n/i18n.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";

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
        const clientMessage: IClientMessage = { content: text };
        const response = await messageService.sendMessage(ctx.message.from.id, clientMessage);
        if (!response.data) {
          throw new Error("No response data from API");
        }
        clearInterval(sendActionIntervalId); 
        ctx.reply(response.data);
      }
    } catch (error) {
      console.error("Error sending message to API:", error);
      clearInterval(sendActionIntervalId); 
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
    
  });
}
