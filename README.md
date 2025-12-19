# SCMD Online Registration System

A modern web application for managing church event registrations within the SCMD (Southern California Metropolitan District) network. Built with Next.js 16, Better Auth, and Prisma 7.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Run the Application](#run-the-application)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Database Schema](#database-schema)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About

The SCMD Online Registration System streamlines the process of managing church event registrations. It provides a centralized platform for:

- **Administrators** to manage divisions, churches, coordinators, pastors, and events
- **Church Presidents** to register delegates and cooks for upcoming events
- **Users** to view event information and registration status

The system handles the complete registration lifecycle from event creation to delegate management, with built-in approval workflows and status tracking.

---

## Features

### Organization Management
- **Multi-Division Support** - Organize churches across multiple divisions with dedicated coordinators
- **Church Profiles** - Manage church information including pastor details and division assignments
- **Coordinator Management** - Assign coordinators to oversee divisions
- **Pastor Directory** - Maintain pastor records linked to their churches

### Event & Registration
- **Event Scheduling** - Create events with customizable dates, locations, and registration periods
- **Flexible Pricing** - Set pre-registration, on-site registration, and cook registration fees
- **Delegate Management** - Register delegates with details (name, nickname, age, gender)
- **Cook Registration** - Separate registration track for event cooks
- **Registration Deadlines** - Automated deadline enforcement

### Workflow & Access
- **Approval Workflow** - Review, approve, or reject registrations with remarks
- **Role-Based Access Control** - Separate dashboards for Admin, President, and User roles
- **Status Tracking** - Real-time registration status updates (Pending, Approved, Rejected)
- **Event Status Management** - Track events from Upcoming to Completed

### Technical Features
- **Modern Authentication** - Email/password and Google OAuth via Better Auth
- **Route Protection** - Optimistic proxy-based route protection
- **Rate Limiting** - Built-in protection for auth endpoints
- **Cross-Tab Sync** - Session synchronization across browser tabs
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Runtime** | [React 19](https://react.dev/) |
| **Authentication** | [Better Auth](https://better-auth.com/) |
| **Database ORM** | [Prisma 7](https://prisma.io/) |
| **Database** | PostgreSQL |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) |
| **Validation** | [Zod 4](https://zod.dev/) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Language** | TypeScript |

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database (local or cloud-hosted)
- **Git** for version control

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/scmd-online-registration.git

# Navigate to the project directory
cd scmd-online-registration
```

### Install Dependencies

```bash
# Install dependencies using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Environment Setup

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Configure the following environment variables in your `.env` file:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@host:5432/database_name?sslmode=require"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. Generate a secure secret for `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Database Setup

1. Generate the Prisma client:

```bash
npx prisma generate
```

2. Push the schema to your database:

```bash
# Push schema (creates tables)
npx prisma db push

# Or create a migration for version control
npx prisma migrate dev --name init
```

3. (Optional) Seed an admin user:

```bash
pnpm seed:admin
```

### Run the Application

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Structure

```
scmd-online-registration/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── actions/               # Server actions
│   │   └── auth/              # Authentication actions
│   ├── app/
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (landing)/         # Public landing page
│   │   ├── (user)/            # User dashboard
│   │   ├── admin/             # Admin dashboard & management
│   │   ├── president/         # President dashboard
│   │   ├── provider/          # Provider dashboard
│   │   └── api/auth/          # Better Auth API routes
│   ├── components/
│   │   ├── admin/             # Admin-specific components
│   │   ├── auth/              # Auth components (forms, guards)
│   │   ├── dashboard/         # Dashboard components
│   │   ├── landing/           # Landing page components
│   │   ├── president/         # President components
│   │   ├── shared/            # Shared/reusable components
│   │   └── ui/                # shadcn/ui components
│   ├── config/                # App configuration
│   ├── context/               # React context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── generated/prisma/  # Generated Prisma client
│   │   ├── auth.ts            # Better Auth server config
│   │   ├── auth-client.ts     # Better Auth client
│   │   ├── auth-server.ts     # Server-side auth helpers
│   │   └── db.ts              # Prisma singleton
│   ├── schema/                # Zod validation schemas
│   ├── types/                 # TypeScript types
│   └── proxy.ts               # Route protection middleware
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## User Roles

The system supports three user roles with distinct access levels:

| Role | Dashboard | Permissions |
|------|-----------|-------------|
| **ADMIN** | `/admin/dashboard` | Full access: manage divisions, churches, coordinators, pastors, events, and registrations |
| **PRESIDENT** | `/president/dashboard` | Church-specific access: register delegates and cooks for events |
| **USER** | `/dashboard` | View-only access: view events and registration information |

---

## Database Schema

### Core Models

```
Division ─────┬───── Coordinator (1:1)
              │
              └───── Church ─────┬───── Pastor (1:1)
                                 │
                                 └───── President (User)
                                 │
                                 └───── Registration ─────┬───── Delegate
                                                          └───── Cook

Event ───── Registration
```

### Key Entities

- **Division** - Organizational unit grouping multiple churches
- **Church** - Individual church with pastor and president
- **Coordinator** - Division overseer (one per division)
- **Pastor** - Church pastor (one per church)
- **Event** - Church event with registration periods and fees
- **Registration** - Church registration for an event
- **Delegate** - Event attendee
- **Cook** - Event cook/helper

---

## Available Scripts

```bash
# Development
pnpm dev              # Start development server (localhost:3000)

# Build & Production
pnpm build            # Create production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint

# Database
npx prisma generate           # Regenerate Prisma client
npx prisma migrate dev        # Create and apply migration
npx prisma db push            # Push schema without migration
npx prisma studio             # Open Prisma Studio GUI

# Seeding
pnpm seed:admin               # Seed admin user
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository

2. Import the repository in [Vercel](https://vercel.com)

3. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `GOOGLE_CLIENT_ID` (optional)
   - `GOOGLE_CLIENT_SECRET` (optional)

4. Deploy

The `postinstall` script automatically runs `prisma generate` during deployment.

### Database Providers

The application supports various PostgreSQL providers:

**Neon (Recommended for Vercel)**
```env
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

**Supabase**
```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
```

**Railway**
```env
DATABASE_URL="postgresql://postgres:[password]@[host].railway.app:5432/railway"
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Better Auth](https://better-auth.com/) - Authentication library
- [Prisma](https://prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Tailwind CSS](https://tailwindcss.com/) - Styling
