import type { ELanguage } from "../enums/language.enum.js";

export interface IUser {
  telegramId: number;
  acceptedDisclaimer: boolean;
  language: ELanguage;
  createdAt: Date;
}
