# ArchMetrics

ArchMetrics is a premium SaaS platform for architecture calculations, built with Next.js App Router, TypeScript, TailwindCSS, Prisma, NextAuth, Zustand, React Hook Form, Zod, Framer Motion, Lucide icons, and Recharts.

## Features

- Flagship professional stair calculator with live SVG diagram, Blondel validation, NBR 9050 guidance, PDF export, and PNG download.
- Ramp, scale converter, built-area, and parking capacity calculators.
- Premium dark interface inspired by modern startup products.
- PostgreSQL-ready Prisma schema for users, projects, calculations, favorites, and NextAuth models.
- Authenticated dashboard foundation for history, favorites, exports, and project organization.
- SEO metadata, OpenGraph, robots, sitemap, and JSON-LD schema markup.

## Getting started

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

## Deployment

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Set `NEXTAUTH_URL` to the production URL.
3. Generate and set a secure `NEXTAUTH_SECRET`.
4. Run `npx prisma migrate deploy` during release.
5. Build with `npm run build` and deploy to Vercel or a Node-compatible host.
