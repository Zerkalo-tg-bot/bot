import type { BotCommand } from "telegraf/types";
import { Language } from "./language.js";
import type { Telegraf } from "telegraf";

const BOT_COMMANDS = new Map<Language, BotCommand[]> ([
  [Language.EN, [{ command: "reset", description: "Reset the bot" }]],
  [Language.RU, [{ command: "reset", description: "Сбросить бота" }]],
  [Language.PL, [{ command: "reset", description: "Zresetuj bota" }]],
]);

export const setAllLocalizedCommands =  (bot: Telegraf) => {
    Object.values(Language).forEach((lang) => {
        setLocalizedCommand(bot, lang);
    });
    setDefaultCommands(bot);
}


const setLocalizedCommand = async (bot: Telegraf, lang: Language) => {
    const commands = BOT_COMMANDS.get(lang);
    if (!commands) {
        throw new Error(`Bot commands are not properly configured for ${lang} language.`);
    }
    await bot.telegram.setMyCommands(commands, { language_code: lang });
}

const setDefaultCommands = async (bot: Telegraf) => {
    const defaultCommands = BOT_COMMANDS.get(Language.EN);
    if (!defaultCommands) {
        throw new Error(`Default bot commands (EN) are not properly configured.`);
    }
    await bot.telegram.setMyCommands(defaultCommands);
}