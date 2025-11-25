import type { Telegraf } from "telegraf";
import { sendMessage } from "../api/apiService";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("text", async (ctx) => {
    ctx.sendChatAction("typing");
    const sendActionTimeoutId = setTimeout(() => {
      ctx.sendChatAction("typing");
    }, 5000);
    try {
      const clientMessage = { text: ctx.message.text };
      const response = await sendMessage(clientMessage);
      ctx.reply(response.data);
    } catch (error) {
      console.error("Error sending message to API:", error);
    }
    clearTimeout(sendActionTimeoutId);
  });
}
