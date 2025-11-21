import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => ctx.reply("Привет! Я бот на TypeScript. Отправь мне любое сообщение, и я его повторю."));

bot.on("text", (ctx) => {
  ctx.reply(`Ты написал: ${ctx.message.text}`);
});

bot.launch().then(() => {
  console.log("Бот запущен");
});
