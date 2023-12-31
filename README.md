This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## Things to Update When Using Template

- Project `name` and dependencies in `package.json`
- Emoji used for favicon in `app/icon.tsx`
- Metadata in `layout.tsx` and `page.tsx`
- Style all error pages - `error.tsx`, `global-error.tsx`, and `not-found.tsx`
  - Possibly create an `ErrorBoundary` component for reuse
- Enable or delete `tailwindColorVars.ts` in `lib/utils` and `tailwind.config.ts`
- Colors used in `tailwind.config.ts`
- Default stylings in `app/globals.css`
- `next.config.js`
