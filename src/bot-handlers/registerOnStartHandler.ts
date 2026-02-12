import type { Telegraf } from "telegraf";
import { messageService } from "../api/message/index.js";
import { chatService } from "../api/chat/index.js";
import { sendLocalizedStaticMessage } from "../i18n/sendLocalizedStaticMessage.js";
import { botConfigService } from "../api/bot-config/bot-config.service.js";

export function registerOnStartHandler(bot: Telegraf) {
  bot.start(async (ctx) => {
    ctx.sendChatAction("typing");
    const sendActionIntervalId = setInterval(() => {
      ctx.sendChatAction("typing");
    }, 5000);

    try {
      try {
        await chatService.resetChatState(ctx.message.from.id);
      } catch (error) {
        console.error("Error resetting chat state:", error);
        throw error;
      }

      try {
        await chatService.startChatSession(ctx.message.from.id);
      } catch (error) {
        console.error("Error starting chat session:", error);
        throw error;
      }

      let disclaimer: string;

      try {
        const response = await botConfigService.getDisclaimer();
        if (!response.data || !response.data.content) {
          throw new Error("No disclaimer content from API");
        }
        disclaimer = response.data.content;
      } catch (error) {
        console.error("Error getting disclaimer from API:", error);
        throw error;
      }

      clearInterval(sendActionIntervalId);
      ctx.reply(disclaimer, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "Продолжить", callback_data: "accept_disclaimer" }]],
        },
      });
    } catch (error) {
      clearInterval(sendActionIntervalId);
      sendLocalizedStaticMessage(ctx, "error-section.error_sending_message_please_try_again_later");
    }
  });
}
