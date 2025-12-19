import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";

i18next.use(I18NexFsBackend)
    .init({
        fallbackLng: "en",
        preload: ["en", "ru", "pl"],
        backend: {
            loadPath: process.cwd() + "/locales/{{lng}}/translation.json"
        },
    });

export default i18next;