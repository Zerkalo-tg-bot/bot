import type { Telegraf } from "telegraf";

export function registerOnStartHandler(bot: Telegraf) {
  bot.start((ctx) => ctx.reply("Привет! Я бот на TypeScript. Отправь мне любое сообщение, и я его повторю."));
}
