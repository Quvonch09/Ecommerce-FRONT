# Store Management Frontends

This repository now contains two separate React applications:

- `apps/client`: Telegram Mini Web App for customers
- `apps/admin`: Admin dashboard for store operators

## Run

```bash
npm install
npm run dev:client
npm run dev:admin
```

## Build

```bash
npm run build
```

## Environment

Both apps use:

```env
VITE_API_BASE_URL=http://5.189.158.5:8085
```

If backend DTOs or admin REST paths differ from the defaults, update only the
service files under:

- `apps/client/src/services`
- `apps/admin/src/services`
