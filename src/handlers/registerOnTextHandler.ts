import type { Telegraf } from "telegraf";
import { messageService } from "../api/index.js";
import type { IClientMessage } from "../model/index.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("message", async (ctx) => {
    const msg = ctx.message;
    ctx.sendChatAction("typing");
    const sendActionTimeoutId = setTimeout(() => {
      ctx.sendChatAction("typing");
    }, 5000);
    try {
      if ("text" in msg && typeof msg.text === "string") {
        const text = msg.text;
        const clientMessage: IClientMessage = { content: text, telegramUserId: ctx.message.from.id };
        const response = await messageService.sendMessage(clientMessage);
        ctx.reply(response.data ?? "пустое сообщение");
      }
    } catch (error) {
      console.error("Error sending message to API:", error);
      ctx.reply("Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз позже.");
    }
    clearTimeout(sendActionTimeoutId);
  });
}
