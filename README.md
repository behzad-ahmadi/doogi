# Doogi 🎈

Share and discover kids’ funny word mix-ups. A bilingual, PWA‑ready Next.js app with Prisma, NextAuth, Tailwind CSS, and DaisyUI.

## Overview

Doogi lets parents record and share the funny words and phrases their children say during language learning. It preserves sweet childhood moments and builds a friendly community of parents.

### Goals
- Record and preserve kids’ funny words.
- Share moments with other parents.
- Build a personal archive of language development.

## Features

- Bilingual routing (`fa` and `en`) via dynamic `/[lang]` segment and middleware.
- Word sharing with explanations and child profiles.
- Theming with DaisyUI and Tailwind CSS 4; RTL support.
- PWA with optional Service Worker registration.
- Authentication via credentials and Google OAuth using NextAuth.
- PostgreSQL database via Prisma ORM.

## Tech Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4, DaisyUI 5
- Zustand, React Hook Form, Zod
- Prisma, SWR, NextAuth
- React Toastify

## Project Structure

```
.
├── public/                # Static assets, PWA files (manifest, service worker)
├── prisma/                # Prisma schema and migrations
├── src/
│   ├── app/
│   │   ├── [lang]/        # Bilingual routes and pages
│   │   │   ├── page.tsx
│   │   │   ├── share/page.tsx
│   │   │   └── ...
│   │   └── layout.tsx     # Root layout
│   ├── components/        # UI components and providers
│   ├── contexts/          # Theme & language contexts
│   ├── lib/               # Config, auth, prisma, dictionaries
│   ├── icons/             # Icon components
│   ├── images/            # Project images
│   ├── middleware.ts      # Locale redirect middleware
│   └── types/             # Shared types
└── next.config.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- `pnpm` installed (`npm i -g pnpm`)
- PostgreSQL database (local or hosted)

### Installation
```bash
git clone <your-repo-url>
cd doogi
pnpm install
cp .env.example .env.local
```

### Environment Variables
Create `.env.local` and set the following. Values below mirror `.env.example` and project usage.

```env
# Base URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_PWA=false

# App Settings
NEXT_PUBLIC_APP_VERSION=1.0.0

# Localization
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SUPPORTED_LANGUAGES=en,fa

# Database (Prisma / PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/doogi?schema=public

# NextAuth core
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-random-string

# Google OAuth (NextAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Notes:
- `DATABASE_URL` is required for Prisma and is set in `prisma/schema.prisma`.
- PWA registers only in production when `NEXT_PUBLIC_ENABLE_PWA=true`.
- Analytics flag is available; GA integration is optional.

### Database Setup (Prisma)
- `pnpm db:generate` – generate Prisma client
- `pnpm db:push` – push schema to database (quick dev)
- `pnpm db:migrate` – create/run migrations (recommended)
- `pnpm db:studio` – open Prisma Studio
- `pnpm db:reset` – reset database (dev only)

Ensure `DATABASE_URL` is set before running these commands.

### Development
```bash
pnpm dev
```
Runs the app at `http://localhost:3000`.

### Build & Start
```bash
pnpm build   # runs prisma generate then next build
pnpm start   # start production server
```

### Lint & Types
- `pnpm lint` – run ESLint
- `pnpm type-check` – run TypeScript checks

## Internationalization (i18n)

- Routing uses dynamic segment `src/app/[lang]` and middleware to enforce default locale.
- Supported locales: `fa`, `en` (configured in `middleware.ts`).
- Dictionaries live in `src/lib/dictionaries/*.json` and load via `getDictionary`.
- Use `LanguageProvider` from `src/contexts/language-context.tsx` to supply `dict`, `lang`, and `locale`.

To add a new language:
- Add `<lang>.json` in `src/lib/dictionaries/`.
- Update `locales` list in `src/middleware.ts`.
- Optionally update `NEXT_PUBLIC_SUPPORTED_LANGUAGES`.

## Theming

- DaisyUI themes and Tailwind CSS 4 are used.
- Adjust global styles in `src/app/globals.css` and component styles.
- Switch themes via the provided Theme Controller component.

## PWA

- Service worker file: `public/sw.js`.
- Manifest: `public/manifest.json`.
- Registration is handled in `src/components/PWAProvider.tsx` and only occurs when:
  - `NODE_ENV === 'production'` and `NEXT_PUBLIC_ENABLE_PWA === 'true'`.
- In development or when disabled, any registered SW is unregistered and caches cleared.

## Authentication

NextAuth is configured with:
- Credentials provider (email + password, hashed via `bcryptjs`).
- Google provider (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`).
- Prisma adapter storing accounts, sessions, etc.

Key files:
- `src/lib/auth.ts` – NextAuth options.
- `src/lib/prisma.ts` – Prisma client singleton.
- Ensure `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set.

## Deployment

- Set production env vars including `DATABASE_URL`, `NEXTAUTH_*`, and any OAuth secrets.
- Enable PWA by setting `NEXT_PUBLIC_ENABLE_PWA=true` if desired.
- Build with `pnpm build` and run with `pnpm start`.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/awesome`.
3. Commit: `git commit -m "Describe change"`.
4. Push: `git push origin feature/awesome`.
5. Open a Pull Request.

## License

MIT

## Acknowledgments

- Next.js, React
- Tailwind CSS, DaisyUI
- Prisma, NextAuth
- React Toastify
