import type { Context } from "telegraf";
import type { ELanguage } from "../core/enums/index.js";
import i18n from "./i18n.js";

export const sendLocalizedStaticMessage = (ctx: Context, messageKey: string, lng: ELanguage) => {
  return ctx.reply(i18n.t(messageKey, { lng }));
};
