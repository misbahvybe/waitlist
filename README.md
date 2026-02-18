# VYBE Waitlist Website

Production-ready waitlist landing for VYBE – Lahore's fair delivery platform. Collects structured supply + demand data from stores, riders, and customers.

## Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS
- **Database**: Neon Postgres
- **ORM**: Drizzle

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure database**
   - Create a [Neon](https://neon.tech) project
   - Copy `.env.example` to `.env.local`
   - Set `DATABASE_URL` with your Neon connection string

3. **Run migrations**
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

4. **Start dev server**
   ```bash
   npm run dev
   ```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/join-store` | Store waitlist (2-step form) |
| `/join-rider` | Rider waitlist (2-step form) |
| `/join-customer` | Customer waitlist (single form) |
| `/success` | Post-submit success with dynamic count |
| `/admin/waitlist` | Admin dashboard (list, update status, export CSV) |

## API

- `POST /api/waitlist/store` – Store signup
- `POST /api/waitlist/rider` – Rider signup
- `POST /api/waitlist/customer` – Customer signup
- `GET /api/waitlist/count?type=STORE|RIDER|CUSTOMER` – Count by type
- `GET /api/waitlist/metrics` – Aggregated metrics for pitch
- `GET /api/admin/waitlist?type=...` – List entries
- `PATCH /api/admin/waitlist/[id]` – Update status
- `DELETE /api/admin/waitlist/[id]` – Delete entry

## Metrics (for pitch)

- Total store / rider / customer signups
- Area distribution
- Avg current commission (stores)
- Avg rider earnings (self-reported)

## Deployment

- **Frontend**: Vercel
- **Database**: Neon
- Set `DATABASE_URL` in Vercel env vars
- Build works without `DATABASE_URL` (uses placeholder); runtime requires real connection
