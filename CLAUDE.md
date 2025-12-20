# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm start        # Start production server

# Database seeding
pnpm seed:admin      # Seed admin user
pnpm seed:president  # Seed president users for churches
pnpm seed:divisions  # Seed division data
pnpm seed:churches   # Seed church data

# Database management
npx prisma generate                    # Regenerate Prisma client (output: src/lib/generated/prisma)
npx prisma migrate dev --name <name>   # Create and apply migration
npx prisma db push                     # Push schema changes without migration
npx prisma studio                      # Open database GUI
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (src/app directory)
- **Better Auth** for authentication (email/password + Google OAuth)
- **Prisma 7** with PostgreSQL (using @prisma/adapter-pg driver adapter)
- **TanStack Query** for client-side data fetching
- **Zod 4** for validation
- **Tailwind CSS 4** with shadcn/ui components
- **Supabase Storage** for file uploads (banners, receipts)
- **Gemini AI** for AI features (gemini-2.5-flash model)

### Domain Model

This is a church event registration system with hierarchical organization:

```
Division (1) ──── Coordinator (1:1)
    │
    └── Church (many) ──── Pastor (1:1)
            │
            └── President (User with PRESIDENT role)
                    │
                    └── Registration (per event)
                            ├── Delegates (many)
                            └── Cooks (many)
```

**User Roles**: `USER`, `ADMIN`, `PRESIDENT` (defined in Prisma schema)
- ADMIN → `/admin/dashboard` - manages divisions, churches, coordinators, pastors, events
- PRESIDENT → `/president/dashboard` - registers delegates/cooks for their church
- USER → `/dashboard` - basic user access

### Authentication Flow

| File | Purpose |
|------|---------|
| `src/lib/auth.ts` | Better Auth server instance with Prisma adapter and rate limiting |
| `src/lib/auth-client.ts` | Better Auth React client with typed exports |
| `src/lib/auth-server.ts` | Server-side helpers: `requireAuth()`, `requireRole()`, `getServerSession()` |
| `src/proxy.ts` | Optimistic route protection middleware (UX only, not security) |
| `src/config/auth.ts` | Role redirect paths configuration |

### Server Actions Pattern

All server actions use `ActionResponse<T>` from `src/types/api.ts`:

```typescript
type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
```

For paginated responses, use `PaginatedActionResponse<T>` which wraps `PaginatedResponse<T>`.

Server actions are organized by entity in `src/actions/`:
- Each entity has CRUD operations with role protection via `requireRole()`
- Zod schemas from `src/schemas/` are shared between client and server validation
- Use `revalidatePath()` after mutations

Example pattern:
```typescript
export async function createDivision(input: DivisionInput): Promise<ActionResponse<{ id: string }>> {
  await requireRole("ADMIN");
  const validated = divisionSchema.safeParse(input);
  // ... validation, creation, revalidatePath
}
```

### TanStack Query Keys

Query keys are centralized in `src/lib/query-keys.ts` using a factory pattern:

```typescript
import { queryKeys } from "@/lib/query-keys";

// Usage examples
queryKeys.divisions.all        // ["divisions"]
queryKeys.divisions.list()     // ["divisions", "list"]
queryKeys.churches.byDivision(id) // ["churches", "byDivision", id]
```

### File Uploads (Supabase Storage)

File uploads use Supabase Storage via `src/lib/supabase-storage.ts`:

```typescript
import { uploadFile, deleteFile } from "@/lib/supabase-storage";

// Upload to specific folder (banners | receipts)
const result = await uploadFile(file, "banners");
if (result.success) {
  console.log(result.url); // Public URL
}
```

Bucket name: `ScmdStorage`, max file size: 5MB, allowed types: JPEG, PNG, WebP.

### Key Directories

| Path | Purpose |
|------|---------|
| `src/actions/` | Server actions organized by entity (divisions, churches, events, registrations, etc.) |
| `src/schemas/` | Zod validation schemas (barrel exported from index.ts) |
| `src/components/admin/` | Admin CRUD components (tables, forms, columns) |
| `src/components/president/` | President dashboard components |
| `src/components/dashboard/` | Shared dashboard components (sidebar, header, stats) |
| `src/hooks/` | `useAuth()` hook with role helpers (isAdmin, isPresident) |
| `src/lib/` | Core utilities (auth, db, supabase, gemini, query-keys) |

### Patterns

- **Path Alias**: `@/*` maps to `./src/*`
- **Prisma Client**: Generated to `src/lib/generated/prisma`, imported via singleton in `src/lib/db.ts`
- **Form Validation**: Zod schemas exported with inferred types (e.g., `DivisionInput = z.infer<typeof divisionSchema>`)
- **Tables**: Use column definitions in `*-columns.tsx`, table component in `*-table.tsx`, form in `*-form.tsx`

### Environment Variables

```
# Database
DATABASE_URL              # PostgreSQL connection string

# Better Auth
BETTER_AUTH_SECRET        # Auth secret (min 32 chars)
BETTER_AUTH_URL           # App URL for auth

# Google OAuth (optional)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Gemini AI
GEMINI_API_KEY

# Application
NEXT_PUBLIC_APP_URL       # Public app URL
```
