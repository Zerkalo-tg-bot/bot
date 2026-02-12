import type { Telegraf } from "telegraf";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { messageService, type ISendMessage } from "../api/message/index.js";
import { userService } from "../api/user/user.service.js";
import type { IUser } from "../core/interfaces/user.interface.js";

export function registerOnTextHandler(bot: Telegraf) {
  bot.on("message", async (ctx) => {
    const msg = ctx.message;
    ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      let user: IUser | null = null;

      try {
        const response = await userService.getUser(ctx.message.from.id);
        if (!response || !response.data) {
          throw new Error("No user data from API");
        }
        user = response.data;
      } catch (error) {
        console.error("Error getting user:", error);
        throw error;
      }

      console.log("User data:", user);

      if (!user.acceptedDisclaimer) {
        clearInterval(sendActionIntervalId);
        ctx.reply("Пожалуйста, примите условия использования, прежде чем отправлять сообщения.");
        return;
      }

      let aiResponse: string = "";

      if ("text" in msg && typeof msg.text === "string") {
        const text = msg.text;
        const clientMessage: ISendMessage = { content: text };
        try {
          const response = await messageService.sendMessage(ctx.message.from.id, clientMessage);
          if (!response.data || !response.data.content) {
            throw new Error("No response data from API");
          }
          aiResponse = response.data.content;
        } catch (error) {
          console.error("Error sending message to API:", error);
          throw error;
        }
      }
      clearInterval(sendActionIntervalId);
      ctx.reply(aiResponse);
    } catch (error) {
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
  });
}
