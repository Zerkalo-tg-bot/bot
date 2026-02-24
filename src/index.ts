import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerHandlers } from "./bot-handlers/registerHandlers.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

registerHandlers(bot);

bot.launch().then(() => {
  console.log("Bot has been started");
});
