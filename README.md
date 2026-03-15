# Zerkalo Bot

Telegram bot (Telegraf + TypeScript) for the Zerkalo project.

## Environment variables

Copy `bot/.env.example` to `bot/.env` and fill in:

- `BOT_TOKEN` — token from BotFather
- `API_URL` — API base URL
  - local dev: `http://localhost:3000`
  - docker compose (inside the docker network): `http://api:3000`

## Local development

From `bot/`:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Localization

Localization files are located in:

- `bot/locales/ru/translation.json`
- `bot/locales/en/translation.json`
- `bot/locales/pl/translation.json`

The disclaimer text is stored in localizations; the disclaimer acceptance state is stored on the server.
