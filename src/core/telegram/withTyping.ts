import type { Context } from "telegraf";
import { sendLocalizedStaticMessage } from "../../i18n/sendLocalizedStaticMessage.js";
import { ELanguage } from "../enums/language.enum.js";

type TypingCapableContext = {
  sendChatAction: Context["sendChatAction"];
};

export async function withTyping<T>(ctx: Context, work: () => Promise<T>, intervalMs = 5000): Promise<T> {
  await sendTypingAction(ctx);
  const sendActionIntervalId = setInterval(async () => {
    await sendTypingAction(ctx);
  }, intervalMs);
  try {
    return await work();
  } finally {
    clearInterval(sendActionIntervalId);
  }
}

async function sendTypingAction(ctx: Context) {
  try {
    await ctx.sendChatAction("typing");
  } catch (error) {
    console.error("Error sending typing action:", error);
  }
}
