import type { Context } from "telegraf";

type TypingCapableContext = {
  sendChatAction: Context["sendChatAction"];
};

export async function withTyping<T>(ctx: TypingCapableContext, work: () => Promise<T>, intervalMs = 5000): Promise<T> {
  ctx.sendChatAction("typing");
  const sendActionIntervalId = setInterval(() => {
    ctx.sendChatAction("typing");
  }, intervalMs);

  try {
    return await work();
  } finally {
    clearInterval(sendActionIntervalId);
  }
}
