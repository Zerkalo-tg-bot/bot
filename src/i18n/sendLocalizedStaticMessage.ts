import i18n from "./i18n.js";

export const sendLocalizedStaticMessage =  (ctx: any, messageKey: string) => {
    const lng = ctx.from?.language_code || "en";
    return ctx.reply(i18n.t(messageKey, { lng }) ) as Promise<any>;
}