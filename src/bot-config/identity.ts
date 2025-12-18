import type { Telegraf } from "telegraf";
import { Language } from "./language.js";

 interface IBotIdentity {
    name: string;
    shortDescription: string;
    description: string;
}

 const BOT_IDENTITES = {
    DEV: new Map<Language, IBotIdentity>([
        [Language.RU, {
            name: "Зеркало Dev",
            shortDescription: "Ваш личный психо-бот: анализ эмоций, советы по самопознанию и легкая психологическая поддержка. (DEV)",
         description: "Этот бот поможет вам лучше понять себя и свои эмоции. Он анализирует ваши ответы, предоставляет советы по самопознанию, предлагает упражнения на осознанность и мягко поддерживает вас в трудные моменты. Идеально подходит для тех, кто хочет лучше понять себя, улучшить эмоциональный интеллект и получать психологические инсайты прямо в чате. (DEV)" },],
        [Language.EN, {
            name: "Zerkalo Dev",
            shortDescription: "Your personal psycho-bot: emotion analysis, self-discovery advice, and light psychological support. (DEV)",
            description: "This bot helps you better understand yourself and your emotions. It analyzes your responses, provides self-discovery advice, offers mindfulness exercises, and gently supports you during difficult moments. Perfect for those who want to understand themselves better, improve emotional intelligence, and receive psychological insights directly in chat. (DEV)" },],
        [Language.PL, {
            name: "Zerkalo Dev",
            shortDescription: "Twój osobisty psycho-bot: analiza emocji, porady dotyczące samopoznania i lekka wsparcie psychologiczne. (DEV)",
            description: "Ten bot pomoże Ci lepiej zrozumieć siebie i swoje emocje. Analizuje Twoje odpowiedzi, dostarcza porady dotyczące samopoznania, oferuje ćwiczenia uważności i delikatnie wspiera Cię w trudnych momentach. Idealny dla tych, którzy chcą lepiej zrozumieć siebie, poprawić inteligencję emocjonalną i otrzymywać psychologiczne spostrzeżenia bezpośrednio na czacie. (DEV)" },],
    ]),
    PROD: new Map<Language, IBotIdentity>([
        [Language.RU, {
            name: "Зеркало",
            shortDescription: "Ваш личный психо-бот: анализ эмоций, советы по самопознанию и легкая психологическая поддержка.",
            description: "Этот бот поможет вам лучше понять себя и свои эмоции. Он анализирует ваши ответы, предоставляет советы по самопознанию, предлагает упражнения на осознанность и мягко поддерживает вас в трудные моменты. Идеально подходит для тех, кто хочет лучше понять себя, улучшить эмоциональный интеллект и получать психологические инсайты прямо в чате." },],
        [Language.EN, {
            name: "Zerkalo",
            shortDescription: "Your personal psycho-bot: emotion analysis, self-discovery advice, and light psychological support.",
            description: "This bot helps you better understand yourself and your emotions. It analyzes your responses, provides self-discovery advice, offers mindfulness exercises, and gently supports you during difficult moments. Perfect for those who want to understand themselves better, improve emotional intelligence, and receive psychological insights directly in chat." },],
        [Language.PL, {
            name: "Zerkalo",
            shortDescription: "Twój osobisty psycho-bot: analiza emocji, porady dotyczące samopoznania i lekka wsparcie psychologiczne.",
            description: "Ten bot pomoże Ci lepiej zrozumieć siebie i swoje emocje. Analizuje Twoje odpowiedzi, dostarcza porady dotyczące samopoznania, oferuje ćwiczenia uważności i delikatnie wspiera Cię w trudnych momentach. Idealny dla tych, którzy chcą lepiej zrozumieć siebie, poprawić inteligencję emocjonalną i otrzymywać psychologiczne spostrzeżenia bezpośrednio na czacie." },],
        ])
}

export function setAllIdentities(bot: Telegraf, isProduction: boolean) {
    Object.values(Language).forEach((lang) => {
        setIdentity(bot, lang, isProduction);
    });
}

async function setIdentity(bot: Telegraf, lang: Language, isProduction: boolean){
    let botName = isProduction ? BOT_IDENTITES.PROD.get(lang)?.name : BOT_IDENTITES.DEV.get(lang)?.name;
    let botDescription = isProduction ? BOT_IDENTITES.PROD.get(lang)?.description : BOT_IDENTITES.DEV.get(lang)?.description;
    let botShortDescription = isProduction ? BOT_IDENTITES.PROD.get(lang)?.shortDescription : BOT_IDENTITES.DEV.get(lang)?.shortDescription;

    if (!botName || !botDescription || !botShortDescription) {
        throw new Error(`Bot identity is not properly configured for ${lang} language.`);
    }

    await Promise.all([
        bot.telegram.setMyName(botName, lang),
        bot.telegram.setMyDescription(botDescription, lang),
        bot.telegram.setMyShortDescription(botShortDescription, lang)
    ]);

    console.log(`Set bot identity for ${lang} language: ${botName}`);
    console.log(`Description: ${botDescription}`);
    console.log(`Short Description: ${botShortDescription}`);
}