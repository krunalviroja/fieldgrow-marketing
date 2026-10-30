# FieldGrow Marketing Website

Professional marketing site + downloadable pitch documents for **FieldGrow** — the Business Operating System for Field Service Businesses.

## Stack

- Next.js (App Router) + TypeScript
- SCSS modules
- PrimeReact
- TanStack React Query
- React Context
- `docx` + `pdfkit` for pitch downloads

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Generate static PDF / DOCX

```bash
npm run docs
```

Files are written to:

- `public/docs/`
- `../FieldGrow-Pitch-Docs/` (workspace folder for sharing)

Website visitors can also download from the **Resources** section (`/api/download/pdf` and `/api/download/docx`).

## Experience Lab

Interactive demos (not feature lists):

1. 1-click social post generator
2. Website template + domain deploy
3. WhatsApp booking journey
4. Missed Revenue actions
5. Customer 360 next-best-action
6. Job profitability calculator
