# Telegram Mini App

Single Next.js Telegram WebApp with clean server boundaries:

- `app/api/*`: API entrypoints exposed to the Mini App
- `features/*/controllers`: request orchestration
- `features/*/services`: backend integration
- `lib/security/*`: JWT cookie handling

## Flow

1. Bot sends only a `web_app` button that opens the Mini App.
2. Mini App reads `window.Telegram.WebApp.initData`.
3. `POST /api/auth/telegram` forwards `initData` to the backend and stores JWT in an HTTP-only cookie.
4. `GET /api/user/me` resolves the current user.
5. UI renders `ADMIN` or `USER` panel from the returned role.

## Run

```bash
npm install
npm run dev
```

## Environment

```env
BACKEND_API_BASE_URL=https://qdtu.uz
BACKEND_TELEGRAM_AUTH_PATH=/auth/telegram
BACKEND_ME_PATH=/user/me
```

If your backend exposes a different `me` route, change only `BACKEND_ME_PATH`.

## Bot

The bot should stay minimal and only launch the Mini App:

```json
{
  "text": "Open App",
  "web_app": {
    "url": "https://your-mini-app.com"
  }
}
```
