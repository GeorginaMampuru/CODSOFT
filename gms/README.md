# Gadou Management System (GMS)

A full‑stack ERP web application built with Next.js 14 + TypeScript + Tailwind + Supabase.

## Setup
1. Copy `.env.local.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server actions only)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

## Deploy
- Vercel recommended. Add the same env variables in the Vercel project settings.

## Database
- Apply `supabase/schema.sql` to your Supabase project.
- Create a public storage bucket named `payslips` (public).

## Roles
- admin, employee, hr, accounts, stock_manager, manufacturing, sales
- RBAC enforced via RLS + server actions.