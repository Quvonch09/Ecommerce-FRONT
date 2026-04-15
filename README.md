# Telegram Store Mini App

Production-ready React frontend for a Telegram Mini App store management flow.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Telegram WebApp SDK

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

Set `VITE_API_BASE_URL` to your Spring Boot backend URL.

3. Start development server:

```bash
npm run dev
```

## Telegram Auth Flow

- On app boot the frontend reads `window.Telegram.WebApp.initData`.
- It sends `POST /auth/telegram` with `{ initData }`.
- The backend JWT is stored locally and attached to every API request.
- If Telegram is not available, the app falls back to a mock session for browser development.
