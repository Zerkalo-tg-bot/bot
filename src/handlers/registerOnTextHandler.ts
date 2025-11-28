import type { Telegraf } from "telegraf";
import { sendMessage } from "../api/apiService.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx) => {
    ctx.sendChatAction("typing");
    const sendActionTimeoutId = setTimeout(() => {
      ctx.sendChatAction("typing");
    }, 5000);
    try {
      const clientMessage = { content: ctx.message.text, telegramUserId: ctx.message.from.id };
      console.log("Received message from user:", clientMessage);
      const response = await sendMessage(clientMessage);
      console.log("Received message from API", response.data);
      ctx.reply(response.data ?? "пустое сообщение");
    } catch (error) {
      console.error("Error sending message to API:", error);
      ctx.reply("Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз позже.");
    }
    clearTimeout(sendActionTimeoutId);
  });
}
