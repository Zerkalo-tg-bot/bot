import type { Telegraf } from "telegraf";
import { setAllLocalizedCommands } from "./commands.js";
import { setAllIdentities } from "./identity.js";

export const configureBot = (bot: Telegraf, isProduction: boolean) => {
    // Commented to prevent a large number of API requests during development bot restarts    
    // setAllLocalizedCommands(bot);
    // setAllIdentities(bot, isProduction);
}