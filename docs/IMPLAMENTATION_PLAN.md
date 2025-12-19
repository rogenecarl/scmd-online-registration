# SCMD Online Registration - Implementation Plan

## Project Overview

Transform the existing Next.js application into a complete Event Online Registration System for SCMD (church organization). The system will have two main user roles: **Admin** and **President**.

---

## Phase Summary

| Phase | Name | Focus Area | Key Deliverables |
|-------|------|------------|------------------|
| 1 | Foundation & UI | Landing page, Auth updates, Schema | New landing page, Login-only auth, Updated Prisma schema |
| 2 | Admin - Organization | Division, Church, Coordinator, Pastor | CRUD pages and actions for organizational entities |
| 3 | Admin - User Management | President accounts | Seed/manage president accounts |
| 4 | Admin - Event Management | Events | Create, edit, manage events |
| 5 | President - Registration | Event registration | Browse events, register delegates/cooks |
| 6 | Admin - Approval Workflow | Registrations | Approve/reject registrations |
| 7 | Dashboard & Reports | Statistics & exports | Dashboard stats, data exports |

---

## Architecture: Server Actions + TanStack Query

### Overview

The application follows a **Server Actions + TanStack Query** architecture pattern for optimal performance, type safety, and maintainability.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Page /     │───▶│  TanStack    │───▶│  Server Action   │  │
│  │  Component   │◀───│  Query Hook  │◀───│  (async fn)      │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
│                             │                                   │
│                      ┌──────┴──────┐                           │
│                      │ Query Cache │                           │
│                      │ (automatic) │                           │
│                      └─────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────│──────────────────────────────────┐
│                         SERVER                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Server Action                          │  │
│  │                                                           │  │
│  │  1. Auth Check (session validation)                       │  │
│  │  2. Zod Validation (input sanitization)                   │  │
│  │  3. Prisma Query (database operation)                     │  │
│  │  4. Return ActionResponse<T>                              │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### File Structure Pattern

For each entity (e.g., Division), create:

```
src/
├── actions/
│   └── division/
│       └── index.ts           # Server Actions (queries + mutations)
│
├── hooks/
│   └── use-divisions.ts       # TanStack Query hooks
│
├── schemas/
│   └── division.schema.ts     # Zod validation schema
│
└── app/admin/divisions/
    ├── page.tsx               # List page (uses useDivisions hook)
    ├── create/page.tsx        # Create page (uses useCreateDivision hook)
    └── [divisionId]/
        ├── page.tsx           # Detail page (uses useDivision hook)
        └── edit/page.tsx      # Edit page (uses useUpdateDivision hook)
```

### Key Patterns

**1. Query Keys Factory (`src/lib/query-keys.ts`)**
```typescript
export const queryKeys = {
  divisions: {
    all: ["divisions"] as const,
    list: (filters?: { search?: string }) =>
      [...queryKeys.divisions.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.divisions.all, "detail", id] as const,
  },
  // ... other entities
};
```

**2. Server Action Pattern (`src/actions/[entity]/index.ts`)**
```typescript
"use server";

export async function getEntities(filters?): Promise<ActionResponse<Entity[]>> {
  // 1. Auth check
  // 2. Prisma query
  // 3. Return { success: true, data } or { success: false, error }
}

export async function createEntity(input): Promise<ActionResponse<Entity>> {
  // 1. Auth check
  // 2. Zod validation
  // 3. Business logic validation
  // 4. Prisma create
  // 5. revalidatePath
  // 6. Return response
}
```

**3. TanStack Hook Pattern (`src/hooks/use-[entities].ts`)**
```typescript
// Query hook
export function useEntities(filters?) {
  return useQuery({
    queryKey: queryKeys.entities.list(filters),
    queryFn: async () => {
      const result = await getEntities(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// Mutation hook
export function useCreateEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const result = await createEntity(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.entities.all });
      toast.success("Entity created");
    },
    onError: (error) => toast.error(error.message),
  });
}
```

**4. Component Usage Pattern**
```typescript
"use client";

export default function EntitiesPage() {
  const { data, isLoading, error } = useEntities();
  const deleteMutation = useDeleteEntity();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  return <DataTable data={data} onDelete={(id) => deleteMutation.mutate(id)} />;
}
```

### Benefits

| Feature | Benefit |
|---------|---------|
| **Caching** | TanStack Query caches results, reducing server calls |
| **Background Refetch** | Stale data auto-refreshes without blocking UI |
| **Optimistic Updates** | UI updates instantly, rolls back on error |
| **Loading States** | Built-in `isLoading`, `isPending` states |
| **Error Handling** | Consistent error handling with toast notifications |
| **Type Safety** | End-to-end TypeScript from schema to component |
| **Cache Invalidation** | Automatic refetch when mutations succeed |

---

## UI/UX Design Guidelines

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Consistency** | Use the same components, spacing, and patterns throughout |
| **Clarity** | Clear visual hierarchy, readable typography, obvious actions |
| **Efficiency** | Minimize clicks, show relevant information upfront |
| **Feedback** | Immediate visual feedback for all user actions |
| **Accessibility** | WCAG 2.1 AA compliant, keyboard navigable |

### Color System (oklch)

Use the existing color system defined in `globals.css`:

```css
/* Primary colors - Brand identity */
--primary: oklch(48.42% 0.1686 264.53);
--primary-foreground: oklch(98.24% 0.0039 264.53);

/* Semantic colors */
--destructive: oklch(63.31% 0.235 25.89);    /* Errors, delete actions */
--success: oklch(69% 0.17 145);               /* Success states */
--warning: oklch(79% 0.15 80);                /* Warnings */

/* Status badges */
.status-pending     { background: oklch(79% 0.15 80); }     /* Yellow */
.status-approved    { background: oklch(69% 0.17 145); }    /* Green */
.status-rejected    { background: oklch(63.31% 0.235 26); } /* Red */
.status-upcoming    { background: oklch(62% 0.21 250); }    /* Blue */
.status-ongoing     { background: oklch(69% 0.17 145); }    /* Green */
.status-completed   { background: oklch(55% 0.05 250); }    /* Gray */
.status-cancelled   { background: oklch(63.31% 0.235 26); } /* Red */
```

### Typography

| Element | Class | Usage |
|---------|-------|-------|
| Page Title | `text-2xl font-bold` | Main page headers |
| Section Header | `text-xl font-semibold` | Card titles, section dividers |
| Subsection | `text-lg font-medium` | Form section labels |
| Body Text | `text-base` | Regular content |
| Caption/Help | `text-sm text-muted-foreground` | Descriptions, hints |

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `gap-2` | 8px | Inline elements, button icons |
| `gap-4` | 16px | Form fields, list items |
| `gap-6` | 24px | Card sections |
| `gap-8` | 32px | Page sections |
| `px-4 py-2` | - | Button padding |
| `p-6` | 24px | Card content padding |

### Component Patterns

**Page Header**
```tsx
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold">Page Title</h1>
    <p className="text-muted-foreground">Page description</p>
  </div>
  <Button>Primary Action</Button>
</div>
```

**Form Layout**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
    <CardDescription>Help text</CardDescription>
  </CardHeader>
  <CardContent>
    <Form>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Form fields */}
      </div>
    </Form>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

**Data Table**
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>Items</CardTitle>
    <div className="flex gap-2">
      <Input placeholder="Search..." className="w-64" />
      <Button>Add New</Button>
    </div>
  </CardHeader>
  <CardContent>
    <DataTable columns={columns} data={data} />
  </CardContent>
</Card>
```

**Status Badge**
```tsx
<Badge variant={status === "APPROVED" ? "success" :
               status === "PENDING" ? "warning" : "destructive"}>
  {status}
</Badge>
```

### Loading States

```tsx
// Skeleton for list items
<div className="space-y-4">
  {[...Array(5)].map((_, i) => (
    <Skeleton key={i} className="h-16 w-full" />
  ))}
</div>

// Button loading
<Button disabled={isPending}>
  {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save"}
</Button>
```

### Toast Notifications

```tsx
// Success
toast.success("Registration approved successfully");

// Error
toast.error("Failed to save changes");

// With action
toast("Registration submitted", {
  action: { label: "View", onClick: () => router.push(`/registrations/${id}`) },
});
```

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large screens |

**Grid patterns:**
```tsx
// Form fields
<div className="grid gap-4 md:grid-cols-2">

// Cards
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

// Stats
<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
```

### Accessibility

- All form inputs must have associated labels
- Focus states visible on all interactive elements
- Color alone should not convey meaning (use icons + text)
- Minimum touch target: 44x44px on mobile
- Skip to main content link for keyboard users

---

## Phase 1: Foundation & UI Setup

### 1.1 Landing Page
**Goal:** Create an attractive landing page for SCMD Online Registration

**Tasks:**
- [ ] Design and implement new landing page (`src/app/page.tsx`)
  - Hero section with SCMD branding
  - "About the System" section explaining the registration process
  - Features overview (Event Registration, Delegate Management, etc.)
  - Call-to-action buttons (Login for Presidents, Admin Login)
  - Footer with organization info

**Components to create:**
```
src/components/landing/
├── hero-section.tsx
├── features-section.tsx
├── about-section.tsx
├── footer.tsx
└── navbar.tsx
```

### 1.2 Authentication Updates
**Goal:** Update auth to login-only (keep registration code for future)

**Tasks:**
- [ ] Update sign-in page UI for SCMD branding
- [ ] Remove registration links from sign-in page (keep files)
- [ ] Update UserRole enum: `USER` → `PRESIDENT` (keep ADMIN)
- [ ] Update auth redirects:
  - ADMIN → `/admin/dashboard`
  - PRESIDENT → `/president/dashboard`
- [ ] Update RoleGuard component for new roles
- [ ] Update proxy.ts middleware for new routes

**Files to modify:**
```
src/app/auth/sign-in/page.tsx
src/components/auth/sign-in-form.tsx
src/components/auth/role-guard.tsx
src/proxy.ts
src/lib/auth.ts
```

### 1.3 Database Schema Update
**Goal:** Add all new models to Prisma schema

**Tasks:**
- [ ] Update UserRole enum (USER → PRESIDENT)
- [ ] Add Gender enum
- [ ] Add EventStatus enum
- [ ] Add RegistrationStatus enum
- [ ] Add Division model
- [ ] Add Church model
- [ ] Add Coordinator model
- [ ] Add Pastor model
- [ ] Add Event model (with all fee fields)
- [ ] Add Registration model
- [ ] Add Delegate model
- [ ] Add Cook model
- [ ] Update User model (add churchId for presidents)
- [ ] Create and run migration
- [ ] Create seed script for initial admin user

**Schema file:**
```
prisma/schema.prisma
prisma/seed.ts
```

### 1.4 Validation Schemas
**Goal:** Create all Zod validation schemas

**Tasks:**
- [ ] Create enums schema (`src/schemas/enums.ts`)
- [ ] Create division schema (`src/schemas/division.schema.ts`)
- [ ] Create church schema (`src/schemas/church.schema.ts`)
- [ ] Create coordinator schema (`src/schemas/coordinator.schema.ts`)
- [ ] Create pastor schema (`src/schemas/pastor.schema.ts`)
- [ ] Create event schema (`src/schemas/event.schema.ts`)
- [ ] Create delegate schema (`src/schemas/delegate.schema.ts`)
- [ ] Create cook schema (`src/schemas/cook.schema.ts`)
- [ ] Create registration schema (`src/schemas/registration.schema.ts`)
- [ ] Create president schema (`src/schemas/president.schema.ts`)
- [ ] Create approval schema (`src/schemas/approval.schema.ts`)
- [ ] Create index export file (`src/schemas/index.ts`)

### 1.5 Shared Components
**Goal:** Create reusable components for the application

**Tasks:**
- [ ] Create data table component (`src/components/shared/data-table.tsx`)
- [ ] Create page header component (`src/components/shared/page-header.tsx`)
- [ ] Create confirm dialog (`src/components/shared/confirm-dialog.tsx`)
- [ ] Create status badge (`src/components/shared/status-badge.tsx`)
- [ ] Create empty state (`src/components/shared/empty-state.tsx`)
- [ ] Create loading skeleton (`src/components/shared/loading-skeleton.tsx`)

### 1.6 Query Keys & Types Setup
**Goal:** Set up TanStack Query infrastructure

**Tasks:**
- [ ] Create query keys factory (`src/lib/query-keys.ts`)
- [ ] Create API response types (`src/types/api.ts`)
- [ ] Verify QueryProvider is set up in root layout

**Files to create:**
```typescript
// src/lib/query-keys.ts
export const queryKeys = {
  divisions: {
    all: ["divisions"] as const,
    list: (filters?) => [...queryKeys.divisions.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.divisions.all, "detail", id] as const,
  },
  churches: { /* ... */ },
  coordinators: { /* ... */ },
  pastors: { /* ... */ },
  presidents: { /* ... */ },
  events: { /* ... */ },
  registrations: { /* ... */ },
  dashboard: { /* ... */ },
};

// src/types/api.ts
export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
```

### 1.7 Layout Setup
**Goal:** Create admin and president layouts with sidebars

**Tasks:**
- [ ] Create admin sidebar (`src/components/admin/admin-sidebar.tsx`)
- [ ] Create admin layout (`src/app/admin/layout.tsx`)
- [ ] Create president sidebar (`src/components/president/president-sidebar.tsx`)
- [ ] Create president layout (`src/app/president/layout.tsx`)
- [ ] Remove/update old provider layout

**Deliverables:**
- New SCMD-branded landing page
- Login-only authentication flow
- Complete Prisma schema with all models
- All Zod validation schemas
- Reusable UI components
- Admin and President layouts with navigation

---

## Phase 2: Admin - Organization Management

### 2.1 Division Management
**Goal:** Full CRUD for divisions with Server Actions + TanStack Query

**File Structure:**
```
src/
├── actions/division/
│   └── index.ts                # All server actions (queries + mutations)
├── hooks/
│   └── use-divisions.ts        # TanStack Query hooks
├── components/admin/divisions/
│   ├── division-form.tsx       # Create/Edit form
│   ├── division-table.tsx      # Data table
│   └── division-columns.tsx    # Table column definitions
└── app/admin/divisions/
    ├── page.tsx                # List (uses useDivisions)
    ├── create/page.tsx         # Create (uses useCreateDivision)
    └── [divisionId]/
        ├── page.tsx            # Detail (uses useDivision)
        └── edit/page.tsx       # Edit (uses useUpdateDivision)
```

**Server Actions (`src/actions/division/index.ts`):**
```typescript
getDivisions(filters?)     // Query - list with search
getDivisionById(id)        // Query - single division
createDivision(input)      // Mutation
updateDivision(id, input)  // Mutation
deleteDivision(id)         // Mutation
```

**TanStack Hooks (`src/hooks/use-divisions.ts`):**
```typescript
useDivisions(filters?)     // Query hook
useDivision(id)            // Query hook
useCreateDivision()        // Mutation hook
useUpdateDivision()        // Mutation hook
useDeleteDivision()        // Mutation hook
```

**Tasks:**
- [ ] Create server actions (`src/actions/division/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-divisions.ts`)
- [ ] Create division columns (`division-columns.tsx`)
- [ ] Create division table (`division-table.tsx`)
- [ ] Create division form (`division-form.tsx`)
- [ ] Create division list page (uses `useDivisions`)
- [ ] Create division create page (uses `useCreateDivision`)
- [ ] Create division detail page (uses `useDivision`)
- [ ] Create division edit page (uses `useUpdateDivision`)
- [ ] Add validation (unique name check in server action)

### 2.2 Church Management
**Goal:** Full CRUD for churches with division assignment

**File Structure:**
```
src/
├── actions/church/
│   └── index.ts                # All server actions
├── hooks/
│   └── use-churches.ts         # TanStack Query hooks
├── components/admin/churches/
│   ├── church-form.tsx         # Create/Edit form
│   ├── church-table.tsx        # Data table
│   └── church-columns.tsx      # Table column definitions
└── app/admin/churches/
    ├── page.tsx                # List
    ├── create/page.tsx         # Create
    └── [churchId]/
        ├── page.tsx            # Detail
        └── edit/page.tsx       # Edit
```

**Server Actions (`src/actions/church/index.ts`):**
```typescript
getChurches(filters?)           // Query - with divisionId filter
getChurchById(id)               // Query
getChurchesByDivision(divisionId) // Query
createChurch(input)             // Mutation
updateChurch(id, input)         // Mutation
deleteChurch(id)                // Mutation
```

**TanStack Hooks (`src/hooks/use-churches.ts`):**
```typescript
useChurches(filters?)           // Query hook
useChurch(id)                   // Query hook
useChurchesByDivision(divisionId) // Query hook
useCreateChurch()               // Mutation hook
useUpdateChurch()               // Mutation hook
useDeleteChurch()               // Mutation hook
```

**Tasks:**
- [ ] Create server actions (`src/actions/church/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-churches.ts`)
- [ ] Create church list page with division filter
- [ ] Create church form with division select (uses `useDivisions`)
- [ ] Create church detail page (show pastor, president)
- [ ] Create church edit page
- [ ] Add validation (unique name, valid division)

### 2.3 Coordinator Management
**Goal:** Full CRUD for coordinators (1 per division)

**File Structure:**
```
src/
├── actions/coordinator/
│   └── index.ts                # All server actions
├── hooks/
│   └── use-coordinators.ts     # TanStack Query hooks
├── components/admin/coordinators/
│   ├── coordinator-form.tsx    # Create/Edit form
│   ├── coordinator-table.tsx   # Data table
│   └── coordinator-columns.tsx # Table column definitions
└── app/admin/coordinators/
    ├── page.tsx                # List
    ├── create/page.tsx         # Create
    └── [coordinatorId]/
        └── edit/page.tsx       # Edit
```

**Server Actions (`src/actions/coordinator/index.ts`):**
```typescript
getCoordinators(filters?)       // Query
getCoordinatorById(id)          // Query
getAvailableDivisionsForCoordinator() // Query - divisions without coordinator
createCoordinator(input)        // Mutation
updateCoordinator(id, input)    // Mutation
deleteCoordinator(id)           // Mutation
```

**TanStack Hooks (`src/hooks/use-coordinators.ts`):**
```typescript
useCoordinators(filters?)       // Query hook
useCoordinator(id)              // Query hook
useAvailableDivisionsForCoordinator() // Query hook
useCreateCoordinator()          // Mutation hook
useUpdateCoordinator()          // Mutation hook
useDeleteCoordinator()          // Mutation hook
```

**Tasks:**
- [ ] Create server actions (`src/actions/coordinator/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-coordinators.ts`)
- [ ] Create coordinator list page (show division)
- [ ] Create coordinator form (only show divisions without coordinator)
- [ ] Create coordinator create/edit pages
- [ ] Add validation (1 coordinator per division)

### 2.4 Pastor Management
**Goal:** Full CRUD for pastors (1 per church)

**File Structure:**
```
src/
├── actions/pastor/
│   └── index.ts                # All server actions
├── hooks/
│   └── use-pastors.ts          # TanStack Query hooks
├── components/admin/pastors/
│   ├── pastor-form.tsx         # Create/Edit form
│   ├── pastor-table.tsx        # Data table
│   └── pastor-columns.tsx      # Table column definitions
└── app/admin/pastors/
    ├── page.tsx                # List
    ├── create/page.tsx         # Create
    └── [pastorId]/
        └── edit/page.tsx       # Edit
```

**Server Actions (`src/actions/pastor/index.ts`):**
```typescript
getPastors(filters?)            // Query
getPastorById(id)               // Query
getAvailableChurchesForPastor() // Query - churches without pastor
createPastor(input)             // Mutation
updatePastor(id, input)         // Mutation
deletePastor(id)                // Mutation
```

**TanStack Hooks (`src/hooks/use-pastors.ts`):**
```typescript
usePastors(filters?)            // Query hook
usePastor(id)                   // Query hook
useAvailableChurchesForPastor() // Query hook
useCreatePastor()               // Mutation hook
useUpdatePastor()               // Mutation hook
useDeletePastor()               // Mutation hook
```

**Tasks:**
- [ ] Create pastor list page (show church, division)
- [ ] Create pastor form (church select - only show churches without pastor)
- [ ] Create pastor create page
- [ ] Create pastor edit page
- [ ] Implement all server actions
- [ ] Add validation (1 pastor per church)

**Deliverables:**
- Complete Division CRUD
- Complete Church CRUD
- Complete Coordinator CRUD
- Complete Pastor CRUD
- All with proper validation and relationships

---

## Phase 3: Admin - President Management

### 3.1 President Account Management
**Goal:** Seed and manage president accounts (no self-registration)

**File Structure:**
```
src/
├── actions/president/
│   └── index.ts                # All server actions
├── hooks/
│   └── use-presidents.ts       # TanStack Query hooks
├── components/admin/presidents/
│   ├── president-form.tsx      # Create/Edit form
│   ├── president-table.tsx     # Data table
│   ├── president-columns.tsx   # Table column definitions
│   └── reset-password-dialog.tsx
└── app/admin/presidents/
    ├── page.tsx                # List (uses usePresidents)
    ├── create/page.tsx         # Create (uses useSeedPresident)
    └── [presidentId]/
        ├── page.tsx            # Detail (uses usePresident)
        └── edit/page.tsx       # Edit (uses useUpdatePresident)
```

**Server Actions (`src/actions/president/index.ts`):**
```typescript
getPresidents(filters?)          // Query - with church/status filter
getPresidentById(id)             // Query
getAvailableChurchesForPresident() // Query - churches without president
seedPresident(input)             // Mutation
updatePresident(id, input)       // Mutation
resetPresidentPassword(id, input) // Mutation
deactivatePresident(id)          // Mutation
```

**TanStack Hooks (`src/hooks/use-presidents.ts`):**
```typescript
usePresidents(filters?)          // Query hook
usePresident(id)                 // Query hook
useAvailableChurchesForPresident() // Query hook
useSeedPresident()               // Mutation hook
useUpdatePresident()             // Mutation hook
useResetPresidentPassword()      // Mutation hook
useDeactivatePresident()         // Mutation hook
```

**Tasks:**
- [ ] Create server actions (`src/actions/president/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-presidents.ts`)
- [ ] Create president list page (show church, division, status)
- [ ] Create president seed form (name, email, password, church select)
- [ ] Create president detail page
- [ ] Create president edit page
- [ ] Create reset password dialog
- [ ] Add validation (unique email, password requirements)

**Deliverables:**
- President list with status
- Seed new president accounts
- Edit president details
- Reset president passwords
- Deactivate president accounts

---

## Phase 4: Admin - Event Management

### 4.1 Event CRUD
**Goal:** Full event management with all registration settings

**File Structure:**
```
src/
├── actions/event/
│   └── index.ts                # All server actions
├── hooks/
│   └── use-events.ts           # TanStack Query hooks
├── components/admin/events/
│   ├── event-form.tsx          # Create/Edit form (sections)
│   ├── event-table.tsx         # Data table
│   ├── event-columns.tsx       # Table column definitions
│   ├── event-card.tsx          # Event summary card
│   └── event-status-badge.tsx  # Status indicator
└── app/admin/events/
    ├── page.tsx                # List (uses useEvents)
    ├── create/page.tsx         # Create (uses useCreateEvent)
    └── [eventId]/
        ├── page.tsx            # Detail (uses useEvent)
        ├── edit/page.tsx       # Edit (uses useUpdateEvent)
        └── registrations/page.tsx # Registrations (uses useRegistrations)
```

**Server Actions (`src/actions/event/index.ts`):**
```typescript
getEvents(filters?)              // Query - with status filter
getEventById(id)                 // Query
getEventWithRegistrations(id)    // Query - with registration stats
createEvent(input)               // Mutation
updateEvent(id, input)           // Mutation
updateEventStatus(id, status)    // Mutation
deleteEvent(id)                  // Mutation
```

**TanStack Hooks (`src/hooks/use-events.ts`):**
```typescript
useEvents(filters?)              // Query hook
useEvent(id)                     // Query hook
useEventWithRegistrations(id)    // Query hook
useCreateEvent()                 // Mutation hook
useUpdateEvent()                 // Mutation hook
useUpdateEventStatus()           // Mutation hook
useDeleteEvent()                 // Mutation hook
```

**Tasks:**
- [ ] Create server actions (`src/actions/event/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-events.ts`)
- [ ] Create event list page with status filtering
- [ ] Create event form with sections:
  - Basic info (name, description, location, logo)
  - Event dates (start, end)
  - Registration settings (deadline, pre-reg period)
  - Fees (pre-reg, onsite, cook)
- [ ] Create event detail page (show stats, registrations summary)
- [ ] Create event registrations page (uses `useRegistrations({ eventId })`)
- [ ] Add date validation (cross-field in Zod schema)
- [ ] Add status management (UPCOMING → ONGOING → COMPLETED)

**Deliverables:**
- Event list with status filtering
- Create/Edit events with all fields
- Event detail with registration stats
- Event-specific registration list
- Status management

---

## Phase 5: President - Event Registration

### 5.1 President Dashboard & Registration
**Goal:** Dashboard and full registration flow for presidents

**File Structure:**
```
src/
├── actions/registration/
│   └── index.ts                # All registration server actions
├── hooks/
│   ├── use-registrations.ts    # Registration hooks
│   └── use-dashboard.ts        # Dashboard hooks
├── components/president/
│   ├── dashboard/
│   │   ├── church-info-card.tsx
│   │   ├── upcoming-events-card.tsx
│   │   └── registration-summary.tsx
│   ├── events/
│   │   ├── event-card.tsx
│   │   ├── event-list.tsx
│   │   └── registration-status.tsx
│   └── registration/
│       ├── registration-form.tsx
│       ├── delegate-form.tsx
│       ├── delegate-list.tsx
│       ├── cook-form.tsx
│       ├── cook-list.tsx
│       └── fee-summary.tsx
└── app/president/
    ├── dashboard/page.tsx      # Uses usePresidentDashboard
    ├── events/
    │   ├── page.tsx            # Uses useAvailableEvents
    │   └── [eventId]/
    │       ├── page.tsx        # Uses useEvent
    │       └── register/page.tsx # Uses useCreateRegistration
    └── registrations/
        ├── page.tsx            # Uses useMyRegistrations
        └── [registrationId]/
            ├── page.tsx        # Uses useRegistration
            └── edit/page.tsx   # Uses useUpdateRegistration
```

**Server Actions (`src/actions/registration/index.ts`):**
```typescript
// President queries
getAvailableEvents()             // Query - UPCOMING/ONGOING events
getEventForRegistration(id)      // Query - event with registration check
getMyRegistrations()             // Query - president's registrations
getMyRegistrationById(id)        // Query

// President mutations
createRegistration(input)        // Mutation - with delegates & cooks
updateRegistration(id, input)    // Mutation - only if PENDING
cancelRegistration(id)           // Mutation - only if PENDING

// Dashboard
getPresidentDashboard()          // Query - church info, stats
```

**TanStack Hooks (`src/hooks/use-registrations.ts`):**
```typescript
// President hooks
useAvailableEvents()             // Query hook
useEventForRegistration(id)      // Query hook
useMyRegistrations()             // Query hook
useMyRegistration(id)            // Query hook
useCreateRegistration()          // Mutation hook
useUpdateRegistration()          // Mutation hook
useCancelRegistration()          // Mutation hook
```

**TanStack Hooks (`src/hooks/use-dashboard.ts`):**
```typescript
usePresidentDashboard()          // Query hook - church info, stats
useAdminDashboard()              // Query hook - admin stats
```

**Tasks:**
- [ ] Create server actions (`src/actions/registration/index.ts`)
- [ ] Create TanStack hooks (`src/hooks/use-registrations.ts`)
- [ ] Create dashboard hooks (`src/hooks/use-dashboard.ts`)
- [ ] Create president dashboard (uses `usePresidentDashboard`)
- [ ] Create events list page (uses `useAvailableEvents`)
- [ ] Create event detail page with registration status
- [ ] Create registration form with `useFieldArray` for delegates/cooks
- [ ] Create registrations list (uses `useMyRegistrations`)
- [ ] Create registration detail/edit pages
- [ ] Add fee calculation based on registration period

**Deliverables:**
- President dashboard with church info
- Event browsing with fee display
- Full registration form for delegates and cooks
- Registration history and management

---

## Phase 6: Admin - Approval Workflow

### 6.1 Registration Queue
**Goal:** Admin can view and process registrations

**File Structure:**
```
src/
├── actions/approval/
│   └── index.ts                # Approval server actions
├── hooks/
│   └── use-registrations.ts    # Add approval hooks here
├── components/admin/registrations/
│   ├── registration-table.tsx  # Registrations data table
│   ├── registration-columns.tsx
│   ├── registration-detail.tsx
│   ├── delegates-table.tsx     # Delegates list
│   ├── cooks-table.tsx         # Cooks list
│   ├── approval-dialog.tsx     # Approve confirmation
│   └── rejection-dialog.tsx    # Reject with remarks
└── app/admin/registrations/
    ├── page.tsx                # List (uses useRegistrations)
    └── [registrationId]/
        └── page.tsx            # Detail (uses useRegistration)
```

**Server Actions (`src/actions/approval/index.ts`):**
```typescript
// Admin queries
getRegistrations(filters?)       // Query - with status/event/church filters
getRegistrationById(id)          // Query - with delegates & cooks

// Admin mutations
approveRegistration(id)          // Mutation
rejectRegistration(id, remarks)  // Mutation
```

**TanStack Hooks (add to `src/hooks/use-registrations.ts`):**
```typescript
// Admin hooks
useRegistrations(filters?)       // Query hook - all registrations
useRegistration(id)              // Query hook - single with details
useApproveRegistration()         // Mutation hook
useRejectRegistration()          // Mutation hook
```

**Tasks:**
- [ ] Add approval server actions (`src/actions/approval/index.ts`)
- [ ] Add admin hooks to `use-registrations.ts`
- [ ] Create registrations list with filters (status, event, church)
- [ ] Create registration detail page
- [ ] Create delegates/cooks tables
- [ ] Create approval dialog (uses `useApproveRegistration`)
- [ ] Create rejection dialog with remarks (uses `useRejectRegistration`)
- [ ] Record reviewer and timestamp on approval/rejection

**Deliverables:**
- Registration approval queue
- Filtering by status, event, church
- Approve/Reject with remarks
- Full registration details view

---

## Phase 7: Dashboard & Reports

### 7.1 Admin Dashboard
**Goal:** Overview statistics and quick actions

**File Structure:**
```
src/
├── actions/dashboard/
│   └── index.ts                # Dashboard server actions
├── hooks/
│   └── use-dashboard.ts        # Dashboard hooks
├── components/admin/dashboard/
│   ├── stats-cards.tsx         # Overview statistics
│   ├── pending-registrations.tsx
│   ├── events-summary.tsx
│   └── quick-actions.tsx
└── app/admin/dashboard/
    └── page.tsx                # Uses useAdminDashboard
```

**Server Actions (`src/actions/dashboard/index.ts`):**
```typescript
getAdminDashboardStats()         // Query - counts, pending, recent
exportRegistrations(filters?)    // Mutation - generate export
```

**TanStack Hooks (`src/hooks/use-dashboard.ts`):**
```typescript
useAdminDashboard()              // Query hook - all dashboard data
useExportRegistrations()         // Mutation hook - trigger export
```

**Tasks:**
- [ ] Create dashboard server actions
- [ ] Create dashboard hooks
- [ ] Create stats cards (events, churches, registrations)
- [ ] Create pending registrations list
- [ ] Create events summary
- [ ] Create quick action buttons

### 7.2 Reports & Export
**Goal:** Export registration data

**Components:**
```
src/components/admin/reports/
├── export-button.tsx           # Export functionality
└── report-filters.tsx          # Date/event filters
```

**Tasks:**
- [ ] Create export server action
- [ ] Create export button with `useExportRegistrations`
- [ ] Export to CSV format
- [ ] Filter by event and date range
- [ ] Include delegate and cook details

**Deliverables:**
- Admin dashboard with statistics
- Export functionality
- Report generation

---

## File Structure Summary

```
src/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── auth/
│   │   └── sign-in/page.tsx              # Login only
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── divisions/...
│   │   ├── churches/...
│   │   ├── coordinators/...
│   │   ├── pastors/...
│   │   ├── presidents/...
│   │   ├── events/...
│   │   └── registrations/...
│   └── president/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── events/...
│       └── registrations/...
│
├── actions/                              # Server Actions
│   ├── auth/index.ts
│   ├── division/index.ts
│   ├── church/index.ts
│   ├── coordinator/index.ts
│   ├── pastor/index.ts
│   ├── president/index.ts
│   ├── event/index.ts
│   ├── registration/index.ts
│   ├── approval/index.ts
│   └── dashboard/index.ts
│
├── hooks/                                # TanStack Query Hooks
│   ├── use-divisions.ts
│   ├── use-churches.ts
│   ├── use-coordinators.ts
│   ├── use-pastors.ts
│   ├── use-presidents.ts
│   ├── use-events.ts
│   ├── use-registrations.ts
│   └── use-dashboard.ts
│
├── lib/
│   ├── auth.ts                           # Better Auth config
│   ├── auth-client.ts
│   ├── prisma.ts
│   ├── query-keys.ts                     # TanStack Query keys factory
│   ├── rate-limit.ts
│   └── utils.ts
│
├── components/
│   ├── landing/
│   ├── auth/
│   ├── admin/
│   ├── president/
│   ├── shared/
│   └── ui/
│
├── schemas/                              # Zod Validation Schemas
│   ├── index.ts
│   ├── enums.ts
│   ├── division.schema.ts
│   ├── church.schema.ts
│   ├── coordinator.schema.ts
│   ├── pastor.schema.ts
│   ├── event.schema.ts
│   ├── delegate.schema.ts
│   ├── cook.schema.ts
│   ├── registration.schema.ts
│   ├── president.schema.ts
│   └── approval.schema.ts
│
└── types/
    └── api.ts                            # ActionResponse type
```

---

## Database Migration Order

1. **Migration 1:** Add enums (Gender, EventStatus, RegistrationStatus), update UserRole
2. **Migration 2:** Add Division, Coordinator models
3. **Migration 3:** Add Church, Pastor models
4. **Migration 4:** Update User model (add churchId)
5. **Migration 5:** Add Event model
6. **Migration 6:** Add Registration, Delegate, Cook models

---

## Seed Data

```typescript
// prisma/seed.ts
1. Create Admin user (admin@scmd.org)
2. Create sample Divisions (4)
3. Create sample Churches (2 per division = 8)
4. Create Coordinators (1 per division = 4)
5. Create Pastors (1 per church = 8)
6. Create President accounts (1 per church = 8)
7. Create sample Event
```

---

## Testing Checklist

### Phase 1
- [ ] Landing page renders correctly
- [ ] Login works for admin
- [ ] Login works for president
- [ ] Role-based redirects work
- [ ] Database migrations successful

### Phase 2
- [ ] Division CRUD works
- [ ] Church CRUD with division assignment
- [ ] Coordinator CRUD (1 per division)
- [ ] Pastor CRUD (1 per church)
- [ ] Validation errors display correctly

### Phase 3
- [ ] Can seed new president
- [ ] Can update president
- [ ] Can reset password
- [ ] Can deactivate president

### Phase 4
- [ ] Event CRUD works
- [ ] Date validations work
- [ ] Fee fields save correctly
- [ ] Status management works

### Phase 5
- [ ] President can view events
- [ ] President can register delegates
- [ ] President can add cooks
- [ ] Registration saves correctly
- [ ] Can edit pending registration

### Phase 6
- [ ] Admin can view all registrations
- [ ] Filtering works
- [ ] Approve action works
- [ ] Reject with remarks works

### Phase 7
- [ ] Dashboard shows correct stats
- [ ] Export generates correct data

---

## Notes

- Keep existing sign-up pages but remove links (for future use)
- All forms use React Hook Form + Zod
- All server actions validate with same Zod schemas
- Use TanStack Query for data fetching where appropriate
- Toast notifications for all actions (success/error)
- Mobile-responsive design throughout

---

*Plan Version: 1.0*
*Created: December 2025*
