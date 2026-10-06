# Sustain Energy

Sustain Energy is a full-stack web application that helps organisations assess their sustainability practices, track their progress, and receive an indicative certificate level. It combines a guided **Green Calculator**, account-based dashboards, and a prototype subscription/voucher journey in a responsive interface.

> This is a student project created to demonstrate full-stack web development, user-centred product design, and data-driven sustainability scoring. It is not an accredited sustainability certification service and the checkout flow is a prototype.

## Key features

- **Green Calculator** — assesses companies across ten sustainability criteria, including renewable-energy usage, water conservation, waste reduction, sustainable procurement, and reporting.
- **Clear scoring model** — each criterion is rated Red (0), Amber (5), or Green (10), creating a score out of 100 and an indicative Bronze, Silver, or Gold certificate level.
- **Authenticated user journeys** — registration, sign-in, profile management, and company information are supported through Supabase authentication.
- **Persistent results** — calculation and measurement results are stored in Supabase, allowing users to return to their latest assessment from a dashboard.
- **Progress dashboard** — summarises the saved score, certificate status, purchased vouchers, and recent activity.
- **Subscription and voucher prototype** — supports annual subscription and point-voucher user flows, including client-side checkout validation.
- **Responsive, accessible UI** — built with reusable Vue components, Tailwind CSS, shadcn-vue, and motion-based interaction details.

## Tech stack

| Area | Technologies |
| --- | --- |
| Front end | Nuxt 4, Vue 3, TypeScript |
| Styling & UI | Tailwind CSS 4, shadcn-vue, Reka UI, Iconify |
| State management | Pinia |
| Forms & validation | VeeValidate, Zod |
| Back end | Nuxt server routes / Nitro |
| Data & auth | Supabase |
| Tooling | pnpm, Prettier |

## How it works

1. A user creates an account and supplies company details.
2. The Green Calculator presents ten sustainability measurements.
3. The user selects a Red, Amber, or Green rating for each measurement.
4. The application calculates the score, assigns an indicative certificate level, and saves the result to Supabase.
5. The dashboard retrieves the latest result and presents the company’s progress.

## Getting started

### Prerequisites

- Node.js 20 or later
- pnpm 10 or later
- A Supabase project

### Installation

```bash
git clone https://github.com/stm-0/sustain-energy.git
cd sustain-energy
pnpm install
```

### Environment configuration

Create a `.env` file and add the Supabase values for your project:

```env
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

> Use the Nuxt Supabase module’s expected environment-variable names if your local configuration differs.

### Run locally

```bash
pnpm dev
```

The development server will be available at `http://localhost:3000`.

### Production build

```bash
pnpm build
pnpm preview
```

## Project structure

```text
app/
├── components/       # Reusable application, calculator, and dashboard UI
├── pages/            # Public, authentication, calculator, dashboard, and checkout views
├── stores/           # Pinia stores for users and sustainability measurements
├── types/            # Application and generated database types
└── utils/            # Scoring and presentation helpers
server/api/           # Nuxt API routes for measurements, subscriptions, payments, and vouchers
public/               # Optimised static images
```

## Data model and scoring

The calculator records a company assessment and its individual measurement results. Each of the ten criteria receives one of three levels:

| Level | Points |
| --- | ---: |
| Red | 0 |
| Amber | 5 |
| Green | 10 |

The application totals these values to produce a score out of 100. Certificate levels are used as an in-app progress indicator rather than a regulated or independently verified certification.

## Development notes

- Authentication and data access are handled through `@nuxtjs/supabase`.
- The app uses Nuxt server routes to keep database operations on the server side.
- Checkout screens validate form input in the client; no third-party payment provider is integrated in this repository.
- Public informational pages are configured for prerendering, while authentication routes use a dedicated layout.
