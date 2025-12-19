import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerHandlers } from "./bot-handlers/registerHandlers.js";
import { configureBot } from "./bot-config/configure.js";
import i18n from "./i18n/i18n.js";


dotenv.config();

const isProduction = process.env.IS_PRODUCTION === "true";

const bot = new Telegraf(process.env.BOT_TOKEN!);

configureBot(bot, isProduction);

registerHandlers(bot);

bot.launch().then(() => {
  console.log("Bot has been started");
}); 
