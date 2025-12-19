# Product Requirements Document (PRD)
# SCMD Event Online Registration System

## 1. Overview

### 1.1 Product Summary
The SCMD Event Online Registration System is a web application that enables administrators to create and manage events, while presidents can register delegates and cooks for their respective churches. The system features approval workflows where admin reviews and approves/rejects registrations submitted by presidents.

### 1.2 Key Objectives
- Streamline event registration for church delegates and cooks
- Provide hierarchical organization management (Division > Church > Pastor)
- Implement approval-based registration workflow
- Ensure secure access with seeded president accounts (no public registration)

### 1.3 User Roles

| Role | Description |
|------|-------------|
| **ADMIN** | System administrator who creates events, manages organizational hierarchy (divisions, churches, coordinators, pastors), and approves/rejects registrations |
| **PRESIDENT** | Church president who registers delegates and cooks for events. Accounts are seeded by admin for security |

---

## 2. UI/UX Design System

### 2.1 Design Principles

The application follows these core UI/UX principles to ensure a consistent, accessible, and user-friendly experience:

| Principle | Description |
|-----------|-------------|
| **Consistency** | Use the same visual patterns, components, and interactions throughout |
| **Clarity** | Clear visual hierarchy, readable typography, descriptive labels |
| **Feedback** | Immediate visual feedback for all user actions (loading, success, error) |
| **Accessibility** | WCAG 2.1 AA compliant, keyboard navigation, screen reader support |
| **Responsiveness** | Mobile-first design, works on all screen sizes |
| **Efficiency** | Minimize clicks, smart defaults, keyboard shortcuts |

### 2.2 Color System

The application uses the **oklch** color space with CSS variables for consistent theming:

```css
/* Primary Colors */
--primary: oklch(0.208 0.042 265.755);        /* Dark blue - primary actions */
--primary-foreground: oklch(0.984 0.003 247.858);

/* Secondary Colors */
--secondary: oklch(0.968 0.007 247.896);      /* Light gray - secondary actions */
--secondary-foreground: oklch(0.208 0.042 265.755);

/* Semantic Colors */
--destructive: oklch(0.577 0.245 27.325);     /* Red - delete, errors */
--muted: oklch(0.968 0.007 247.896);          /* Subtle backgrounds */
--accent: oklch(0.968 0.007 247.896);         /* Highlights */

/* Status Colors (for badges/indicators) */
--status-pending: oklch(0.828 0.189 84.429);  /* Yellow/Amber */
--status-approved: oklch(0.6 0.118 184.704);  /* Green */
--status-rejected: oklch(0.577 0.245 27.325); /* Red */
--status-upcoming: oklch(0.488 0.243 264.376);/* Blue */
--status-ongoing: oklch(0.6 0.118 184.704);   /* Green */
--status-completed: oklch(0.554 0.046 257.417);/* Gray */
--status-cancelled: oklch(0.577 0.245 27.325);/* Red */
```

### 2.3 Typography

```css
/* Font Family */
--font-sans: var(--font-geist-sans);   /* Primary font */
--font-mono: var(--font-geist-mono);   /* Code/numbers */

/* Font Sizes */
text-xs:   0.75rem  (12px)  /* Labels, badges */
text-sm:   0.875rem (14px)  /* Body text, form labels */
text-base: 1rem    (16px)  /* Default body */
text-lg:   1.125rem (18px)  /* Subheadings */
text-xl:   1.25rem  (20px)  /* Card titles */
text-2xl:  1.5rem   (24px)  /* Page headings */
text-3xl:  1.875rem (30px)  /* Hero headings */

/* Font Weights */
font-normal:   400  /* Body text */
font-medium:   500  /* Labels, buttons */
font-semibold: 600  /* Headings, emphasis */
font-bold:     700  /* Strong emphasis */
```

### 2.4 Spacing System

Use consistent spacing based on 4px increments:

```
space-1:  0.25rem (4px)
space-2:  0.5rem  (8px)
space-3:  0.75rem (12px)
space-4:  1rem    (16px)
space-5:  1.25rem (20px)
space-6:  1.5rem  (24px)
space-8:  2rem    (32px)
space-10: 2.5rem  (40px)
space-12: 3rem    (48px)
```

**Standard spacing patterns:**
- Card padding: `px-6 py-6`
- Form field gap: `space-y-4`
- Section gap: `space-y-6` or `space-y-8`
- Page padding: `px-10 py-4`

### 2.5 Component Patterns

#### Buttons
```tsx
// Primary action (Create, Save, Submit)
<Button>Create Event</Button>

// Secondary action (Cancel, Back)
<Button variant="outline">Cancel</Button>

// Destructive action (Delete)
<Button variant="destructive">Delete</Button>

// Ghost action (in tables, toolbars)
<Button variant="ghost" size="icon"><Edit /></Button>

// Link style
<Button variant="link">Learn more</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Creating...
</Button>
```

#### Cards
```tsx
// Standard card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>

// Card with action button
<Card>
  <CardHeader>
    <CardTitle>Divisions</CardTitle>
    <CardAction>
      <Button size="sm">Add New</Button>
    </CardAction>
  </CardHeader>
</Card>
```

#### Forms
```tsx
// Standard form field
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input placeholder="Placeholder..." {...field} />
      </FormControl>
      <FormDescription>Helper text</FormDescription>
      <FormMessage /> {/* Error message */}
    </FormItem>
  )}
/>

// Form layout
<form className="space-y-6">
  <div className="space-y-4">
    {/* Form fields */}
  </div>
  <div className="flex gap-2">
    <Button type="submit">Save</Button>
    <Button type="button" variant="outline">Cancel</Button>
  </div>
</form>
```

#### Data Tables
```tsx
// Table with actions
<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Search..."
/>

// Table row actions
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>View</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Status Badges
```tsx
// Registration status
<Badge variant="warning">Pending</Badge>
<Badge variant="success">Approved</Badge>
<Badge variant="destructive">Rejected</Badge>

// Event status
<Badge variant="info">Upcoming</Badge>
<Badge variant="success">Ongoing</Badge>
<Badge variant="secondary">Completed</Badge>
<Badge variant="destructive">Cancelled</Badge>
```

### 2.6 Page Layout Patterns

#### Admin/President Layout (Sidebar)
```tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header className="flex h-16 items-center gap-4 border-b px-6">
      <SidebarTrigger />
      <Breadcrumb />
    </header>
    <main className="flex-1 px-10 py-6">
      {children}
    </main>
  </SidebarInset>
</SidebarProvider>
```

#### List Page Pattern
```tsx
<div className="space-y-6">
  {/* Page Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-semibold">Divisions</h1>
      <p className="text-muted-foreground">Manage church divisions</p>
    </div>
    <Button asChild>
      <Link href="/admin/divisions/create">
        <Plus className="mr-2 h-4 w-4" />
        Add Division
      </Link>
    </Button>
  </div>

  {/* Search/Filters */}
  <div className="flex gap-4">
    <Input placeholder="Search..." className="max-w-sm" />
    <Select>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
    </Select>
  </div>

  {/* Data Table */}
  <DataTable columns={columns} data={data} />
</div>
```

#### Form Page Pattern
```tsx
<div className="space-y-6">
  {/* Page Header */}
  <div>
    <h1 className="text-2xl font-semibold">Create Division</h1>
    <p className="text-muted-foreground">Add a new division to the system</p>
  </div>

  {/* Form Card */}
  <Card className="max-w-2xl">
    <CardHeader>
      <CardTitle>Division Details</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        {/* Form fields */}
      </Form>
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button type="submit">Create Division</Button>
      <Button variant="outline" asChild>
        <Link href="/admin/divisions">Cancel</Link>
      </Button>
    </CardFooter>
  </Card>
</div>
```

#### Detail Page Pattern
```tsx
<div className="space-y-6">
  {/* Page Header with Actions */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-semibold">{division.name}</h1>
      <p className="text-muted-foreground">Division details</p>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" asChild>
        <Link href={`/admin/divisions/${id}/edit`}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Link>
      </Button>
      <Button variant="destructive">
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  </div>

  {/* Info Cards */}
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Churches</CardTitle>
      </CardHeader>
      <CardContent>
        {/* List of churches */}
      </CardContent>
    </Card>
  </div>
</div>
```

### 2.7 Landing Page Design

The landing page follows modern design principles for conversion and clarity:

#### Hero Section
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]                           [Login] [Admin Login]         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              SCMD Event Online Registration                     │
│                                                                 │
│    Streamline your church event registration process            │
│    with our easy-to-use digital platform                        │
│                                                                 │
│              [Get Started]  [Learn More]                        │
│                                                                 │
│                    [Hero Image/Illustration]                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Features Section
```
┌─────────────────────────────────────────────────────────────────┐
│                     How It Works                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │  Icon   │    │  Icon   │    │  Icon   │    │  Icon   │      │
│  │         │    │         │    │         │    │         │      │
│  │ Event   │    │Register │    │ Submit  │    │Approved │      │
│  │ Created │    │Delegates│    │   for   │    │  Ready  │      │
│  │         │    │ & Cooks │    │Approval │    │         │      │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Features Grid
```
┌─────────────────────────────────────────────────────────────────┐
│                       Features                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐                   │
│  │ Easy Registration │  │ Real-time Status  │                   │
│  │ Register multiple │  │ Track approval    │                   │
│  │ delegates easily  │  │ status instantly  │                   │
│  └───────────────────┘  └───────────────────┘                   │
│                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐                   │
│  │ Secure Access     │  │ Fee Management    │                   │
│  │ Role-based login  │  │ Pre-reg & on-site │                   │
│  │ for presidents    │  │ fee tracking      │                   │
│  └───────────────────┘  └───────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.8 Interaction Patterns

#### Loading States
```tsx
// Button loading
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>

// Page loading
<div className="flex items-center justify-center h-64">
  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
</div>

// Skeleton loading
<div className="space-y-4">
  <Skeleton className="h-8 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

#### Toast Notifications
```tsx
// Success
toast.success("Division created successfully");

// Error
toast.error("Failed to create division");

// Loading → Success/Error
const toastId = toast.loading("Creating division...");
toast.success("Division created", { id: toastId });
// or
toast.error("Failed to create", { id: toastId });
```

#### Confirmation Dialogs
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the division.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 2.9 Responsive Breakpoints

```css
/* Mobile first approach */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

**Responsive patterns:**
- Mobile: Single column, stacked layouts
- Tablet: Two columns where appropriate
- Desktop: Full sidebar, multi-column grids

### 2.10 Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | All interactive elements focusable, logical tab order |
| **Focus Indicators** | Visible focus rings on all interactive elements |
| **Color Contrast** | Minimum 4.5:1 for text, 3:1 for large text |
| **Screen Readers** | Proper ARIA labels, semantic HTML |
| **Error Messages** | Associated with form fields, announced to screen readers |
| **Skip Links** | Skip to main content for keyboard users |

---

## 3. Entity Relationship & Data Model

### 3.1 Entity Hierarchy

```
Division (1)
├── Coordinator (1) - One coordinator per division
└── Church (many)
    └── Pastor (1) - One pastor per church

Event (1)
└── Registration (many)
    ├── Delegates (many)
    └── Cooks (many)
```

### 3.2 Database Schema (Prisma)

```prisma
// ==========================================
// ENUMS
// ==========================================

enum UserRole {
  USER
  ADMIN
  PRESIDENT
}

enum Gender {
  MALE
  FEMALE
}

enum RegistrationStatus {
  PENDING
  APPROVED
  REJECTED
}

enum EventStatus {
  UPCOMING
  ONGOING
  COMPLETED
  CANCELLED
}

// ==========================================
// ORGANIZATIONAL ENTITIES
// ==========================================

model Division {
  id          String       @id @default(cuid())
  name        String       @unique
  createdAt   DateTime     @default(now()) @map("created_at")
  updatedAt   DateTime     @updatedAt @map("updated_at")

  // Relations
  churches    Church[]
  coordinator Coordinator?

  @@map("division")
}

model Church {
  id          String   @id @default(cuid())
  name        String   @unique
  divisionId  String   @map("division_id")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  division    Division       @relation(fields: [divisionId], references: [id], onDelete: Cascade)
  pastor      Pastor?
  presidents  User[]         @relation("ChurchPresidents")
  registrations Registration[]

  @@map("church")
}

model Coordinator {
  id          String   @id @default(cuid())
  name        String   @unique
  divisionId  String   @unique @map("division_id")
  phone       String?
  email       String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations (1 coordinator per division)
  division    Division @relation(fields: [divisionId], references: [id], onDelete: Cascade)

  @@map("coordinator")
}

model Pastor {
  id          String   @id @default(cuid())
  name        String   @unique
  churchId    String   @unique @map("church_id")
  phone       String?
  email       String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations (1 pastor per church)
  church      Church   @relation(fields: [churchId], references: [id], onDelete: Cascade)

  @@map("pastor")
}

// ==========================================
// EVENT & REGISTRATION ENTITIES
// ==========================================

model Event {
  id                      String      @id @default(cuid())
  name                    String
  description             String?     @db.Text
  location                String
  logo                    String?
  startDate               DateTime    @map("start_date")
  endDate                 DateTime    @map("end_date")
  registrationDeadline    DateTime    @map("registration_deadline")

  // Pre-registration period
  preRegistrationFee      Decimal     @map("pre_registration_fee") @db.Decimal(10, 2)
  preRegistrationStart    DateTime    @map("pre_registration_start")
  preRegistrationEnd      DateTime    @map("pre_registration_end")

  // On-site & Cook registration fees
  onsiteRegistrationFee   Decimal     @map("onsite_registration_fee") @db.Decimal(10, 2)
  cookRegistrationFee     Decimal     @map("cook_registration_fee") @db.Decimal(10, 2)

  status                  EventStatus @default(UPCOMING)
  createdAt               DateTime    @default(now()) @map("created_at")
  updatedAt               DateTime    @updatedAt @map("updated_at")

  // Relations
  registrations           Registration[]

  @@map("event")
}

model Registration {
  id          String             @id @default(cuid())
  eventId     String             @map("event_id")
  churchId    String             @map("church_id")
  presidentId String             @map("president_id")
  status      RegistrationStatus @default(PENDING)
  remarks     String?            @db.Text
  reviewedAt  DateTime?          @map("reviewed_at")
  reviewedBy  String?            @map("reviewed_by")
  createdAt   DateTime           @default(now()) @map("created_at")
  updatedAt   DateTime           @updatedAt @map("updated_at")

  // Relations
  event       Event              @relation(fields: [eventId], references: [id], onDelete: Cascade)
  church      Church             @relation(fields: [churchId], references: [id], onDelete: Cascade)
  president   User               @relation(fields: [presidentId], references: [id], onDelete: Cascade)
  delegates   Delegate[]
  cooks       Cook[]

  // Unique constraint: One registration per church per event
  @@unique([eventId, churchId])
  @@map("registration")
}

model Delegate {
  id             String   @id @default(cuid())
  fullName       String   @map("full_name")
  nickname       String?
  age            Int
  gender         Gender
  registrationId String   @map("registration_id")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  // Relations
  registration   Registration @relation(fields: [registrationId], references: [id], onDelete: Cascade)

  @@map("delegate")
}

model Cook {
  id             String   @id @default(cuid())
  fullName       String   @map("full_name")
  nickname       String?
  age            Int
  gender         Gender
  registrationId String   @map("registration_id")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  // Relations
  registration   Registration @relation(fields: [registrationId], references: [id], onDelete: Cascade)

  @@map("cook")
}

// ==========================================
// USER MODEL (Updated)
// ==========================================

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  role          UserRole  @default(USER)
  emailVerified Boolean   @default(false) @map("email_verified")
  image         String?
  churchId      String?   @map("church_id")  // For PRESIDENT role
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  sessions      Session[]
  accounts      Account[]
  church        Church?   @relation("ChurchPresidents", fields: [churchId], references: [id])
  registrations Registration[]

  @@map("user")
}
```

### 3.3 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│    Division     │───────│   Coordinator   │
│                 │  1:1  │                 │
│  - id (cuid)    │       │  - id (cuid)    │
│  - name (unique)│       │  - name (unique)│
└────────┬────────┘       └─────────────────┘
         │ 1:n
         ▼
┌─────────────────┐       ┌─────────────────┐
│     Church      │───────│     Pastor      │
│                 │  1:1  │                 │
│  - id (cuid)    │       │  - id (cuid)    │
│  - name (unique)│       │  - name (unique)│
│  - divisionId   │       │  - churchId     │
└────────┬────────┘       └─────────────────┘
         │ 1:n
         ▼
┌─────────────────┐       ┌─────────────────┐
│      User       │───────│   Registration  │
│   (PRESIDENT)   │  1:n  │                 │
│                 │       │  - id (cuid)    │
│  - churchId     │       │  - status       │
└─────────────────┘       │  - eventId      │
                          │  - churchId     │
┌─────────────────┐       │  - presidentId  │
│      Event      │───────┤                 │
│                 │  1:n  └────────┬────────┘
│  - id (cuid)    │                │
│  - name         │         ┌──────┴──────┐
│  - status       │         │             │
└─────────────────┘         ▼             ▼
                    ┌───────────┐  ┌───────────┐
                    │  Delegate │  │   Cook    │
                    │           │  │           │
                    │- fullName │  │- fullName │
                    │- nickname │  │- nickname │
                    │- age      │  │- age      │
                    │- gender   │  │- gender   │
                    └───────────┘  └───────────┘
```

---

## 4. Application Structure

### 4.1 Route Structure

```
src/app/
├── (public)/
│   └── page.tsx                    # Landing/Home page
│
├── auth/
│   └── sign-in/
│       └── page.tsx                # Login page (no registration)
│
├── admin/
│   ├── layout.tsx                  # Admin layout with sidebar
│   ├── dashboard/
│   │   └── page.tsx                # Admin dashboard overview
│   │
│   ├── events/
│   │   ├── page.tsx                # Events list
│   │   ├── create/
│   │   │   └── page.tsx            # Create new event
│   │   └── [eventId]/
│   │       ├── page.tsx            # Event details
│   │       ├── edit/
│   │       │   └── page.tsx        # Edit event
│   │       └── registrations/
│   │           └── page.tsx        # View all registrations for event
│   │
│   ├── divisions/
│   │   ├── page.tsx                # Divisions list
│   │   ├── create/
│   │   │   └── page.tsx            # Create division
│   │   └── [divisionId]/
│   │       ├── page.tsx            # Division details
│   │       └── edit/
│   │           └── page.tsx        # Edit division
│   │
│   ├── churches/
│   │   ├── page.tsx                # Churches list
│   │   ├── create/
│   │   │   └── page.tsx            # Create church
│   │   └── [churchId]/
│   │       ├── page.tsx            # Church details
│   │       └── edit/
│   │           └── page.tsx        # Edit church
│   │
│   ├── coordinators/
│   │   ├── page.tsx                # Coordinators list
│   │   ├── create/
│   │   │   └── page.tsx            # Create coordinator
│   │   └── [coordinatorId]/
│   │       └── edit/
│   │           └── page.tsx        # Edit coordinator
│   │
│   ├── pastors/
│   │   ├── page.tsx                # Pastors list
│   │   ├── create/
│   │   │   └── page.tsx            # Create pastor
│   │   └── [pastorId]/
│   │       └── edit/
│   │           └── page.tsx        # Edit pastor
│   │
│   ├── presidents/
│   │   ├── page.tsx                # Presidents list (seed management)
│   │   ├── create/
│   │   │   └── page.tsx            # Create/seed president account
│   │   └── [presidentId]/
│   │       └── edit/
│   │           └── page.tsx        # Edit president
│   │
│   └── registrations/
│       ├── page.tsx                # All registrations (approval queue)
│       └── [registrationId]/
│           └── page.tsx            # Registration details (approve/reject)
│
├── president/
│   ├── layout.tsx                  # President layout with sidebar
│   ├── dashboard/
│   │   └── page.tsx                # President dashboard
│   │
│   ├── events/
│   │   ├── page.tsx                # Available events list
│   │   └── [eventId]/
│   │       ├── page.tsx            # Event details
│   │       └── register/
│   │           └── page.tsx        # Registration form (delegates & cooks)
│   │
│   └── registrations/
│       ├── page.tsx                # My registrations history
│       └── [registrationId]/
│           ├── page.tsx            # Registration details
│           └── edit/
│               └── page.tsx        # Edit registration (if pending)
│
└── api/
    └── auth/
        └── [...all]/
            └── route.ts            # Better Auth API routes
```

### 4.2 Component Structure

```
src/components/
├── auth/
│   ├── sign-in-form.tsx            # Login form
│   └── role-guard.tsx              # Role-based protection
│
├── admin/
│   ├── admin-sidebar.tsx           # Admin navigation sidebar
│   ├── events/
│   │   ├── event-form.tsx          # Create/Edit event form
│   │   ├── event-card.tsx          # Event display card
│   │   └── event-table.tsx         # Events data table
│   ├── divisions/
│   │   ├── division-form.tsx       # Create/Edit division form
│   │   └── division-table.tsx      # Divisions data table
│   ├── churches/
│   │   ├── church-form.tsx         # Create/Edit church form
│   │   └── church-table.tsx        # Churches data table
│   ├── coordinators/
│   │   ├── coordinator-form.tsx    # Create/Edit coordinator form
│   │   └── coordinator-table.tsx   # Coordinators data table
│   ├── pastors/
│   │   ├── pastor-form.tsx         # Create/Edit pastor form
│   │   └── pastor-table.tsx        # Pastors data table
│   ├── presidents/
│   │   ├── president-form.tsx      # Create/Edit president form
│   │   └── president-table.tsx     # Presidents data table
│   └── registrations/
│       ├── registration-table.tsx  # Registrations data table
│       ├── registration-card.tsx   # Registration summary card
│       └── approval-dialog.tsx     # Approve/Reject dialog
│
├── president/
│   ├── president-sidebar.tsx       # President navigation sidebar
│   ├── events/
│   │   ├── event-card.tsx          # Available event card
│   │   └── event-list.tsx          # Events list
│   └── registration/
│       ├── registration-form.tsx   # Main registration form
│       ├── delegate-form.tsx       # Add/Edit delegate sub-form
│       ├── cook-form.tsx           # Add/Edit cook sub-form
│       ├── delegate-list.tsx       # List of added delegates
│       └── cook-list.tsx           # List of added cooks
│
├── shared/
│   ├── data-table.tsx              # Reusable data table component
│   ├── page-header.tsx             # Page header with breadcrumbs
│   ├── confirm-dialog.tsx          # Confirmation dialog
│   ├── status-badge.tsx            # Status indicator badge
│   ├── empty-state.tsx             # Empty state placeholder
│   └── loading-skeleton.tsx        # Loading state skeleton
│
└── ui/
    └── ... (existing shadcn/ui components)
```

---

## 5. Feature Specifications

### 5.1 Admin Features

#### 5.1.1 Dashboard
- Overview statistics (total events, divisions, churches, pending registrations)
- Quick actions (create event, view pending registrations)
- Recent activity feed

#### 4.1.2 Event Management
- **Create Event**:
  - Name, description, location, logo (optional)
  - Start/End dates
  - Registration deadline
  - Pre-registration: fee, start date, end date
  - On-site registration fee
  - Cook registration fee
- **Edit Event**: Modify event details
- **Event Status**: UPCOMING → ONGOING → COMPLETED (or CANCELLED)
- **View Registrations**: See all registrations for an event with filtering

#### 4.1.3 Division Management
- **Create Division**: Name (unique)
- **Edit Division**: Modify name
- **Delete Division**: Cascade delete churches, coordinator
- **View**: List all divisions with church count

#### 4.1.4 Church Management
- **Create Church**: Name (unique), select division
- **Edit Church**: Modify name, change division
- **Delete Church**: Cascade delete pastor
- **View**: List all churches with division info

#### 4.1.5 Coordinator Management
- **Create Coordinator**: Name (unique), select division (1 per division)
- **Edit Coordinator**: Modify details
- **Delete Coordinator**: Remove from division
- **View**: List all coordinators with division info

#### 4.1.6 Pastor Management
- **Create Pastor**: Name (unique), select church (1 per church)
- **Edit Pastor**: Modify details
- **Delete Pastor**: Remove from church
- **View**: List all pastors with church info

#### 4.1.7 President Management (Seeding)
- **Create/Seed President**: Name, email, password, assign to church
- **Edit President**: Modify details, reset password
- **Deactivate President**: Disable account
- **View**: List all president accounts

#### 4.1.8 Registration Approval
- **View Queue**: List all pending registrations
- **Review Details**: View delegates and cooks
- **Approve**: Mark registration as approved
- **Reject**: Mark as rejected with remarks
- **Filter**: By event, church, status

### 5.2 President Features

#### 5.2.1 Dashboard
- Church info display
- Active/upcoming events
- Registration status summary
- Quick action to register

#### 4.2.2 Event Browsing
- View all upcoming/ongoing events
- See event details:
  - Dates (start, end, registration deadline)
  - Location
  - Pre-registration period and fee
  - On-site registration fee
  - Cook registration fee
- Check registration status for their church
- See if within pre-registration or on-site registration period

#### 4.2.3 Registration
- **Create Registration**:
  - Select event
  - Add multiple delegates (fullName, nickname, age, gender)
  - Add multiple cooks (fullName, nickname, age, gender)
  - Submit for approval
- **Edit Registration**: Modify while status is PENDING
- **View Status**: Track approval status
- **View History**: Past registrations

---

## 6. User Flows

### 6.1 Admin Flow: Create Event

```
1. Admin logs in
2. Navigate to Events → Create
3. Fill event form:
   - Basic Info:
     * Event name (required)
     * Description (optional)
     * Location (required)
     * Logo URL (optional)
   - Event Dates:
     * Start date (required)
     * End date (required)
   - Registration Settings:
     * Registration deadline
     * Pre-registration start date
     * Pre-registration end date
   - Fees:
     * Pre-registration fee
     * On-site registration fee
     * Cook registration fee
4. Status defaults to UPCOMING
5. Event appears in president's available events when registration opens
```

### 6.2 Admin Flow: Approve Registration

```
1. Admin logs in
2. Navigate to Registrations
3. Filter by "Pending" status
4. Click registration to view details
5. Review:
   - Church info
   - Delegate list
   - Cook list
6. Click "Approve" or "Reject"
7. If reject, add remarks
8. Status updates, president notified
```

### 6.3 President Flow: Register Delegates

```
1. President logs in (seeded account)
2. Navigate to Events
3. Select open event
4. Click "Register"
5. Add delegates:
   - Click "Add Delegate"
   - Fill: Full name, nickname, age, gender
   - Repeat for all delegates
6. Add cooks:
   - Click "Add Cook"
   - Fill: Full name, nickname, age, gender
   - Repeat for all cooks
7. Review submission
8. Click "Submit Registration"
9. Status = PENDING
10. Wait for admin approval
```

---

## 7. Validation Rules

### 7.1 Shared Zod Schemas (Frontend & Backend)

All validation schemas are defined once in `src/schemas/` and shared between frontend forms and server actions to ensure consistency.

```typescript
// ==========================================
// src/schemas/enums.ts
// ==========================================

import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE"]);
export const EventStatusEnum = z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]);
export const RegistrationStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export const UserRoleEnum = z.enum(["USER", "ADMIN", "PRESIDENT"]);

export type Gender = z.infer<typeof GenderEnum>;
export type EventStatus = z.infer<typeof EventStatusEnum>;
export type RegistrationStatus = z.infer<typeof RegistrationStatusEnum>;
export type UserRole = z.infer<typeof UserRoleEnum>;

// ==========================================
// src/schemas/division.schema.ts
// ==========================================

import { z } from "zod";

export const divisionSchema = z.object({
  name: z
    .string({ required_error: "Division name is required" })
    .min(1, "Division name is required")
    .max(100, "Division name must be 100 characters or less")
    .trim(),
});

export type DivisionInput = z.infer<typeof divisionSchema>;

// ==========================================
// src/schemas/church.schema.ts
// ==========================================

import { z } from "zod";

export const churchSchema = z.object({
  name: z
    .string({ required_error: "Church name is required" })
    .min(1, "Church name is required")
    .max(100, "Church name must be 100 characters or less")
    .trim(),
  divisionId: z
    .string({ required_error: "Division is required" })
    .cuid("Invalid division selected"),
});

export type ChurchInput = z.infer<typeof churchSchema>;

// ==========================================
// src/schemas/coordinator.schema.ts
// ==========================================

import { z } from "zod";

const phoneRegex = /^[\d\s\-+()]*$/;

export const coordinatorSchema = z.object({
  name: z
    .string({ required_error: "Coordinator name is required" })
    .min(1, "Coordinator name is required")
    .max(100, "Coordinator name must be 100 characters or less")
    .trim(),
  divisionId: z
    .string({ required_error: "Division is required" })
    .cuid("Invalid division selected"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .max(20, "Phone number too long")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .optional()
    .or(z.literal("")),
});

export type CoordinatorInput = z.infer<typeof coordinatorSchema>;

// ==========================================
// src/schemas/pastor.schema.ts
// ==========================================

import { z } from "zod";

const phoneRegex = /^[\d\s\-+()]*$/;

export const pastorSchema = z.object({
  name: z
    .string({ required_error: "Pastor name is required" })
    .min(1, "Pastor name is required")
    .max(100, "Pastor name must be 100 characters or less")
    .trim(),
  churchId: z
    .string({ required_error: "Church is required" })
    .cuid("Invalid church selected"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .max(20, "Phone number too long")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .optional()
    .or(z.literal("")),
});

export type PastorInput = z.infer<typeof pastorSchema>;

// ==========================================
// src/schemas/event.schema.ts
// ==========================================

import { z } from "zod";
import { EventStatusEnum } from "./enums";

// Helper for decimal/currency validation
const currencySchema = z
  .union([z.string(), z.number()])
  .transform((val) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    if (isNaN(num)) throw new Error("Invalid number");
    return num;
  })
  .refine((val) => val >= 0, "Amount must be 0 or greater")
  .refine((val) => val <= 999999.99, "Amount too large");

// Base event schema (shared fields)
const eventBaseSchema = z.object({
  name: z
    .string({ required_error: "Event name is required" })
    .min(1, "Event name is required")
    .max(200, "Event name must be 200 characters or less")
    .trim(),
  description: z
    .string()
    .max(5000, "Description must be 5000 characters or less")
    .optional()
    .or(z.literal("")),
  location: z
    .string({ required_error: "Location is required" })
    .min(1, "Location is required")
    .max(500, "Location must be 500 characters or less")
    .trim(),
  logo: z
    .string()
    .url("Invalid logo URL")
    .optional()
    .or(z.literal("")),
});

// Create event schema with full validation
export const createEventSchema = eventBaseSchema.extend({
  startDate: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), "Invalid start date"),
  endDate: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), "Invalid end date"),
  registrationDeadline: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), "Invalid registration deadline"),

  // Pre-registration fields
  preRegistrationFee: currencySchema,
  preRegistrationStart: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), "Invalid pre-registration start date"),
  preRegistrationEnd: z
    .union([z.string(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val))
    .refine((date) => !isNaN(date.getTime()), "Invalid pre-registration end date"),

  // Other fees
  onsiteRegistrationFee: currencySchema,
  cookRegistrationFee: currencySchema,

  status: EventStatusEnum.default("UPCOMING"),
})
  // Cross-field validations
  .refine(
    (data) => data.endDate >= data.startDate,
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => data.preRegistrationEnd >= data.preRegistrationStart,
    {
      message: "Pre-registration end must be on or after start",
      path: ["preRegistrationEnd"],
    }
  )
  .refine(
    (data) => data.preRegistrationStart <= data.startDate,
    {
      message: "Pre-registration must start before event",
      path: ["preRegistrationStart"],
    }
  )
  .refine(
    (data) => data.registrationDeadline <= data.startDate,
    {
      message: "Registration deadline must be before event starts",
      path: ["registrationDeadline"],
    }
  )
  .refine(
    (data) => data.preRegistrationEnd <= data.registrationDeadline,
    {
      message: "Pre-registration must end before or on registration deadline",
      path: ["preRegistrationEnd"],
    }
  );

// Update event schema (allows partial updates)
export const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().cuid("Invalid event ID"),
});

// Status update schema
export const updateEventStatusSchema = z.object({
  id: z.string().cuid("Invalid event ID"),
  status: EventStatusEnum,
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;

// ==========================================
// src/schemas/delegate.schema.ts
// ==========================================

import { z } from "zod";
import { GenderEnum } from "./enums";

export const delegateSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  nickname: z
    .string()
    .max(50, "Nickname must be 50 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  age: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val), "Age must be a valid number")
    .refine((val) => val >= 1, "Age must be at least 1")
    .refine((val) => val <= 120, "Age must be 120 or less"),
  gender: GenderEnum,
});

export type DelegateInput = z.infer<typeof delegateSchema>;

// ==========================================
// src/schemas/cook.schema.ts
// ==========================================

import { z } from "zod";
import { GenderEnum } from "./enums";

export const cookSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  nickname: z
    .string()
    .max(50, "Nickname must be 50 characters or less")
    .trim()
    .optional()
    .or(z.literal("")),
  age: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val), "Age must be a valid number")
    .refine((val) => val >= 1, "Age must be at least 1")
    .refine((val) => val <= 120, "Age must be 120 or less"),
  gender: GenderEnum,
});

export type CookInput = z.infer<typeof cookSchema>;

// ==========================================
// src/schemas/registration.schema.ts
// ==========================================

import { z } from "zod";
import { delegateSchema } from "./delegate.schema";
import { cookSchema } from "./cook.schema";

export const createRegistrationSchema = z.object({
  eventId: z
    .string({ required_error: "Event is required" })
    .cuid("Invalid event selected"),
  delegates: z
    .array(delegateSchema)
    .min(1, "At least one delegate is required")
    .max(100, "Maximum 100 delegates allowed"),
  cooks: z
    .array(cookSchema)
    .max(50, "Maximum 50 cooks allowed")
    .default([]),
});

export const updateRegistrationSchema = createRegistrationSchema.extend({
  id: z.string().cuid("Invalid registration ID"),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type UpdateRegistrationInput = z.infer<typeof updateRegistrationSchema>;

// ==========================================
// src/schemas/president.schema.ts
// ==========================================

import { z } from "zod";

export const seedPresidentSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .max(255, "Email too long")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  confirmPassword: z.string({ required_error: "Please confirm password" }),
  churchId: z
    .string({ required_error: "Church is required" })
    .cuid("Invalid church selected"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const updatePresidentSchema = z.object({
  id: z.string().cuid("Invalid president ID"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .toLowerCase()
    .trim()
    .optional(),
  churchId: z.string().cuid("Invalid church selected").optional(),
});

export const resetPasswordSchema = z.object({
  id: z.string().cuid("Invalid president ID"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  confirmPassword: z.string({ required_error: "Please confirm password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SeedPresidentInput = z.infer<typeof seedPresidentSchema>;
export type UpdatePresidentInput = z.infer<typeof updatePresidentSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ==========================================
// src/schemas/approval.schema.ts
// ==========================================

import { z } from "zod";

export const approveRegistrationSchema = z.object({
  registrationId: z.string().cuid("Invalid registration ID"),
});

export const rejectRegistrationSchema = z.object({
  registrationId: z.string().cuid("Invalid registration ID"),
  remarks: z
    .string({ required_error: "Rejection reason is required" })
    .min(1, "Please provide a reason for rejection")
    .max(1000, "Remarks must be 1000 characters or less")
    .trim(),
});

export type ApproveRegistrationInput = z.infer<typeof approveRegistrationSchema>;
export type RejectRegistrationInput = z.infer<typeof rejectRegistrationSchema>;
```

### 7.2 Form Validation Integration (Frontend)

```typescript
// Example: Event Form with React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventInput } from "@/schemas/event.schema";

export function EventForm() {
  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      logo: "",
      preRegistrationFee: 0,
      onsiteRegistrationFee: 0,
      cookRegistrationFee: 0,
      status: "UPCOMING",
    },
  });

  const onSubmit = async (data: CreateEventInput) => {
    // Data is already validated by Zod
    const result = await createEvent(data);
    // Handle result...
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields with automatic error display */}
      </form>
    </Form>
  );
}
```

### 7.3 Server Action Validation (Backend)

```typescript
// Example: Server Action with Zod validation
"use server";

import { createEventSchema } from "@/schemas/event.schema";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function createEvent(formData: unknown) {
  // 1. Authenticate user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  // 2. Check role
  if (session.user.role !== "ADMIN") {
    return { success: false, error: "Forbidden: Admin access required" };
  }

  // 3. Validate input with Zod (same schema as frontend)
  const validationResult = createEventSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const data = validationResult.data;

  // 4. Additional business logic validation
  const existingEvent = await prisma.event.findFirst({
    where: {
      name: data.name,
      startDate: { gte: new Date() },
    },
  });

  if (existingEvent) {
    return {
      success: false,
      error: "An upcoming event with this name already exists",
    };
  }

  // 5. Create event
  try {
    const event = await prisma.event.create({
      data: {
        name: data.name,
        description: data.description || null,
        location: data.location,
        logo: data.logo || null,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationDeadline: data.registrationDeadline,
        preRegistrationFee: data.preRegistrationFee,
        preRegistrationStart: data.preRegistrationStart,
        preRegistrationEnd: data.preRegistrationEnd,
        onsiteRegistrationFee: data.onsiteRegistrationFee,
        cookRegistrationFee: data.cookRegistrationFee,
        status: data.status,
      },
    });

    return { success: true, data: event };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event" };
  }
}
```

### 7.4 Validation Error Response Type

```typescript
// src/types/api.ts

export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };
```

---

## 8. Architecture: Server Actions + TanStack Query

### 8.1 Architecture Overview

The application uses a **Server Actions + TanStack Query** architecture for optimal performance, type safety, and maintainability.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │  Component  │───▶│  TanStack   │───▶│  Server Actions     │  │
│  │  (UI)       │◀───│  Query Hook │◀───│  (Mutations/Queries)│  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
│                            │                      │             │
│                     ┌──────┴──────┐               │             │
│                     │ Query Cache │               │             │
│                     └─────────────┘               │             │
└───────────────────────────────────────────────────│─────────────┘
                                                    │
┌───────────────────────────────────────────────────│─────────────┐
│                         SERVER                    ▼             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Server Actions                           ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  ││
│  │  │ Validation  │─▶│    Auth     │─▶│  Prisma Database    │  ││
│  │  │ (Zod)       │  │   Check     │  │     Operations      │  ││
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Caching**: TanStack Query handles caching and background refetching
- **Optimistic Updates**: Instant UI feedback while server processes
- **Error Handling**: Consistent error handling across the app
- **Scalability**: Clear separation of concerns

### 8.2 Query Keys Factory

```typescript
// src/lib/query-keys.ts

export const queryKeys = {
  // Division keys
  divisions: {
    all: ["divisions"] as const,
    list: (filters?: { search?: string }) =>
      [...queryKeys.divisions.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.divisions.all, "detail", id] as const,
  },

  // Church keys
  churches: {
    all: ["churches"] as const,
    list: (filters?: { divisionId?: string; search?: string }) =>
      [...queryKeys.churches.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.churches.all, "detail", id] as const,
    byDivision: (divisionId: string) =>
      [...queryKeys.churches.all, "byDivision", divisionId] as const,
  },

  // Coordinator keys
  coordinators: {
    all: ["coordinators"] as const,
    list: (filters?: { divisionId?: string }) =>
      [...queryKeys.coordinators.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.coordinators.all, "detail", id] as const,
  },

  // Pastor keys
  pastors: {
    all: ["pastors"] as const,
    list: (filters?: { churchId?: string; divisionId?: string }) =>
      [...queryKeys.pastors.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.pastors.all, "detail", id] as const,
  },

  // President keys
  presidents: {
    all: ["presidents"] as const,
    list: (filters?: { churchId?: string; status?: string }) =>
      [...queryKeys.presidents.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.presidents.all, "detail", id] as const,
  },

  // Event keys
  events: {
    all: ["events"] as const,
    list: (filters?: { status?: string; search?: string }) =>
      [...queryKeys.events.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.events.all, "detail", id] as const,
    available: () =>
      [...queryKeys.events.all, "available"] as const,
  },

  // Registration keys
  registrations: {
    all: ["registrations"] as const,
    list: (filters?: { eventId?: string; status?: string; churchId?: string }) =>
      [...queryKeys.registrations.all, "list", filters] as const,
    detail: (id: string) =>
      [...queryKeys.registrations.all, "detail", id] as const,
    myRegistrations: () =>
      [...queryKeys.registrations.all, "my"] as const,
    byEvent: (eventId: string) =>
      [...queryKeys.registrations.all, "byEvent", eventId] as const,
  },

  // Dashboard stats
  dashboard: {
    admin: () => ["dashboard", "admin"] as const,
    president: () => ["dashboard", "president"] as const,
  },
} as const;
```

### 8.3 Server Actions Structure

```typescript
// ==========================================
// src/actions/division/index.ts
// ==========================================

"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { divisionSchema, type DivisionInput } from "@/schemas/division.schema";
import type { ActionResponse } from "@/types/api";
import type { Division } from "@/lib/generated/prisma";

// ========== QUERIES ==========

export async function getDivisions(filters?: {
  search?: string;
}): Promise<ActionResponse<Division[]>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const divisions = await prisma.division.findMany({
      where: filters?.search
        ? { name: { contains: filters.search, mode: "insensitive" } }
        : undefined,
      include: {
        _count: { select: { churches: true } },
        coordinator: true,
      },
      orderBy: { name: "asc" },
    });

    return { success: true, data: divisions };
  } catch (error) {
    console.error("Failed to get divisions:", error);
    return { success: false, error: "Failed to fetch divisions" };
  }
}

export async function getDivisionById(
  id: string
): Promise<ActionResponse<Division>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const division = await prisma.division.findUnique({
      where: { id },
      include: {
        churches: true,
        coordinator: true,
      },
    });

    if (!division) {
      return { success: false, error: "Division not found" };
    }

    return { success: true, data: division };
  } catch (error) {
    console.error("Failed to get division:", error);
    return { success: false, error: "Failed to fetch division" };
  }
}

// ========== MUTATIONS ==========

export async function createDivision(
  input: DivisionInput
): Promise<ActionResponse<Division>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    // Validate input
    const validationResult = divisionSchema.safeParse(input);
    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Check for duplicate
    const existing = await prisma.division.findUnique({
      where: { name: validationResult.data.name },
    });
    if (existing) {
      return { success: false, error: "Division with this name already exists" };
    }

    const division = await prisma.division.create({
      data: validationResult.data,
    });

    revalidatePath("/admin/divisions");
    return { success: true, data: division };
  } catch (error) {
    console.error("Failed to create division:", error);
    return { success: false, error: "Failed to create division" };
  }
}

export async function updateDivision(
  id: string,
  input: DivisionInput
): Promise<ActionResponse<Division>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const validationResult = divisionSchema.safeParse(input);
    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Check for duplicate (excluding current)
    const existing = await prisma.division.findFirst({
      where: { name: validationResult.data.name, NOT: { id } },
    });
    if (existing) {
      return { success: false, error: "Division with this name already exists" };
    }

    const division = await prisma.division.update({
      where: { id },
      data: validationResult.data,
    });

    revalidatePath("/admin/divisions");
    revalidatePath(`/admin/divisions/${id}`);
    return { success: true, data: division };
  } catch (error) {
    console.error("Failed to update division:", error);
    return { success: false, error: "Failed to update division" };
  }
}

export async function deleteDivision(
  id: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.division.delete({ where: { id } });

    revalidatePath("/admin/divisions");
    return { success: true, data: { id } };
  } catch (error) {
    console.error("Failed to delete division:", error);
    return { success: false, error: "Failed to delete division" };
  }
}
```

### 8.4 TanStack Query Hooks

```typescript
// ==========================================
// src/hooks/use-divisions.ts
// ==========================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision,
} from "@/actions/division";
import type { DivisionInput } from "@/schemas/division.schema";
import { toast } from "sonner";

// ========== QUERY HOOKS ==========

export function useDivisions(filters?: { search?: string }) {
  return useQuery({
    queryKey: queryKeys.divisions.list(filters),
    queryFn: async () => {
      const result = await getDivisions(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useDivision(id: string) {
  return useQuery({
    queryKey: queryKeys.divisions.detail(id),
    queryFn: async () => {
      const result = await getDivisionById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

// ========== MUTATION HOOKS ==========

export function useCreateDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: DivisionInput) => {
      const result = await createDivision(input);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Division created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create division");
    },
  });
}

export function useUpdateDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: DivisionInput }) => {
      const result = await updateDivision(id, data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.divisions.detail(data.id)
      });
      toast.success("Division updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update division");
    },
  });
}

export function useDeleteDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteDivision(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.divisions.all });
      toast.success("Division deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete division");
    },
  });
}

// ==========================================
// src/hooks/use-events.ts
// ==========================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getEvents,
  getEventById,
  getAvailableEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventStatus,
} from "@/actions/event";
import type { CreateEventInput, UpdateEventInput } from "@/schemas/event.schema";
import type { EventStatus } from "@/schemas/enums";
import { toast } from "sonner";

// ========== QUERY HOOKS ==========

export function useEvents(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: queryKeys.events.list(filters),
    queryFn: async () => {
      const result = await getEvents(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: async () => {
      const result = await getEventById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useAvailableEvents() {
  return useQuery({
    queryKey: queryKeys.events.available(),
    queryFn: async () => {
      const result = await getAvailableEvents();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// ========== MUTATION HOOKS ==========

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateEventInput) => {
      const result = await createEvent(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      toast.success("Event created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create event");
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateEventInput }) => {
      const result = await updateEvent(id, data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(data.id) });
      toast.success("Event updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event");
    },
  });
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EventStatus }) => {
      const result = await updateEventStatus(id, status);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(data.id) });
      toast.success("Event status updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event status");
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteEvent(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
      toast.success("Event deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete event");
    },
  });
}

// ==========================================
// src/hooks/use-registrations.ts
// ==========================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getRegistrations,
  getRegistrationById,
  getMyRegistrations,
  createRegistration,
  updateRegistration,
  cancelRegistration,
  approveRegistration,
  rejectRegistration,
} from "@/actions/registration";
import type {
  CreateRegistrationInput,
  UpdateRegistrationInput
} from "@/schemas/registration.schema";
import { toast } from "sonner";

// ========== QUERY HOOKS ==========

export function useRegistrations(filters?: {
  eventId?: string;
  status?: string;
  churchId?: string;
}) {
  return useQuery({
    queryKey: queryKeys.registrations.list(filters),
    queryFn: async () => {
      const result = await getRegistrations(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useRegistration(id: string) {
  return useQuery({
    queryKey: queryKeys.registrations.detail(id),
    queryFn: async () => {
      const result = await getRegistrationById(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useMyRegistrations() {
  return useQuery({
    queryKey: queryKeys.registrations.myRegistrations(),
    queryFn: async () => {
      const result = await getMyRegistrations();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

// ========== MUTATION HOOKS ==========

export function useCreateRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateRegistrationInput) => {
      const result = await createRegistration(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      toast.success("Registration submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit registration");
    },
  });
}

export function useUpdateRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRegistrationInput }) => {
      const result = await updateRegistration(id, data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.detail(data.id)
      });
      toast.success("Registration updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update registration");
    },
  });
}

export function useCancelRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await cancelRegistration(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      toast.success("Registration cancelled");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel registration");
    },
  });
}

// ========== ADMIN APPROVAL HOOKS ==========

export function useApproveRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await approveRegistration(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.detail(data.id)
      });
      toast.success("Registration approved");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve registration");
    },
  });
}

export function useRejectRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, remarks }: { id: string; remarks: string }) => {
      const result = await rejectRegistration(id, remarks);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.registrations.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.registrations.detail(data.id)
      });
      toast.success("Registration rejected");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject registration");
    },
  });
}
```

### 8.5 Usage in Components

```typescript
// ==========================================
// Example: Division List Page
// ==========================================

"use client";

import { useState } from "react";
import { useDivisions, useDeleteDivision } from "@/hooks/use-divisions";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DivisionsPage() {
  const [search, setSearch] = useState("");
  const { data: divisions, isLoading, error } = useDivisions({ search });
  const deleteMutation = useDeleteDivision();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this division?")) {
      deleteMutation.mutate(id);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Divisions</h1>
        <Button asChild>
          <Link href="/admin/divisions/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Division
          </Link>
        </Button>
      </div>

      <Input
        placeholder="Search divisions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <DataTable
        columns={columns}
        data={divisions ?? []}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </div>
  );
}

// ==========================================
// Example: Division Create Form
// ==========================================

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateDivision } from "@/hooks/use-divisions";
import { divisionSchema, type DivisionInput } from "@/schemas/division.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DivisionForm() {
  const router = useRouter();
  const createMutation = useCreateDivision();

  const form = useForm<DivisionInput>({
    resolver: zodResolver(divisionSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: DivisionInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/divisions");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter division name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create Division"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

// ==========================================
// Example: Registration Form with Optimistic Updates
// ==========================================

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateRegistration } from "@/hooks/use-registrations";
import {
  createRegistrationSchema,
  type CreateRegistrationInput
} from "@/schemas/registration.schema";
import { Button } from "@/components/ui/button";
import { DelegateForm } from "./delegate-form";
import { CookForm } from "./cook-form";

export function RegistrationForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const createMutation = useCreateRegistration();

  const form = useForm<CreateRegistrationInput>({
    resolver: zodResolver(createRegistrationSchema),
    defaultValues: {
      eventId,
      delegates: [],
      cooks: [],
    },
  });

  const {
    fields: delegateFields,
    append: appendDelegate,
    remove: removeDelegate,
  } = useFieldArray({
    control: form.control,
    name: "delegates",
  });

  const {
    fields: cookFields,
    append: appendCook,
    remove: removeCook,
  } = useFieldArray({
    control: form.control,
    name: "cooks",
  });

  const onSubmit = async (data: CreateRegistrationInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/president/registrations");
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Delegates Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Delegates</h2>
        {delegateFields.map((field, index) => (
          <DelegateForm
            key={field.id}
            index={index}
            control={form.control}
            onRemove={() => removeDelegate(index)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendDelegate({ fullName: "", nickname: "", age: 0, gender: "MALE" })
          }
        >
          Add Delegate
        </Button>
      </section>

      {/* Cooks Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cooks</h2>
        {cookFields.map((field, index) => (
          <CookForm
            key={field.id}
            index={index}
            control={form.control}
            onRemove={() => removeCook(index)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendCook({ fullName: "", nickname: "", age: 0, gender: "MALE" })
          }
        >
          Add Cook
        </Button>
      </section>

      {/* Submit */}
      <div className="flex gap-2">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Submitting..." : "Submit Registration"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

### 8.6 All Server Actions Reference

#### Admin Actions
```typescript
// Division
getDivisions(filters?)          // Query
getDivisionById(id)             // Query
createDivision(input)           // Mutation
updateDivision(id, input)       // Mutation
deleteDivision(id)              // Mutation

// Church
getChurches(filters?)           // Query
getChurchById(id)               // Query
getChurchesByDivision(divisionId) // Query
createChurch(input)             // Mutation
updateChurch(id, input)         // Mutation
deleteChurch(id)                // Mutation

// Coordinator
getCoordinators(filters?)       // Query
getCoordinatorById(id)          // Query
createCoordinator(input)        // Mutation
updateCoordinator(id, input)    // Mutation
deleteCoordinator(id)           // Mutation

// Pastor
getPastors(filters?)            // Query
getPastorById(id)               // Query
createPastor(input)             // Mutation
updatePastor(id, input)         // Mutation
deletePastor(id)                // Mutation

// President
getPresidents(filters?)         // Query
getPresidentById(id)            // Query
seedPresident(input)            // Mutation
updatePresident(id, input)      // Mutation
resetPresidentPassword(id, input) // Mutation
deactivatePresident(id)         // Mutation

// Event
getEvents(filters?)             // Query
getEventById(id)                // Query
createEvent(input)              // Mutation
updateEvent(id, input)          // Mutation
updateEventStatus(id, status)   // Mutation
deleteEvent(id)                 // Mutation

// Registration (Admin)
getRegistrations(filters?)      // Query
getRegistrationById(id)         // Query
approveRegistration(id)         // Mutation
rejectRegistration(id, remarks) // Mutation

// Dashboard
getAdminDashboardStats()        // Query
```

#### President Actions
```typescript
// Event
getAvailableEvents()            // Query
getEventDetails(id)             // Query

// Registration
getMyRegistrations()            // Query
getMyRegistrationById(id)       // Query
createRegistration(input)       // Mutation
updateRegistration(id, input)   // Mutation (if PENDING)
cancelRegistration(id)          // Mutation (if PENDING)

// Dashboard
getPresidentDashboard()         // Query
```

### 8.7 TanStack Query Hooks Reference

```typescript
// src/hooks/
├── use-divisions.ts
│   ├── useDivisions(filters?)
│   ├── useDivision(id)
│   ├── useCreateDivision()
│   ├── useUpdateDivision()
│   └── useDeleteDivision()
│
├── use-churches.ts
│   ├── useChurches(filters?)
│   ├── useChurch(id)
│   ├── useChurchesByDivision(divisionId)
│   ├── useCreateChurch()
│   ├── useUpdateChurch()
│   └── useDeleteChurch()
│
├── use-coordinators.ts
│   ├── useCoordinators(filters?)
│   ├── useCoordinator(id)
│   ├── useCreateCoordinator()
│   ├── useUpdateCoordinator()
│   └── useDeleteCoordinator()
│
├── use-pastors.ts
│   ├── usePastors(filters?)
│   ├── usePastor(id)
│   ├── useCreatePastor()
│   ├── useUpdatePastor()
│   └── useDeletePastor()
│
├── use-presidents.ts
│   ├── usePresidents(filters?)
│   ├── usePresident(id)
│   ├── useSeedPresident()
│   ├── useUpdatePresident()
│   ├── useResetPresidentPassword()
│   └── useDeactivatePresident()
│
├── use-events.ts
│   ├── useEvents(filters?)
│   ├── useEvent(id)
│   ├── useAvailableEvents()
│   ├── useCreateEvent()
│   ├── useUpdateEvent()
│   ├── useUpdateEventStatus()
│   └── useDeleteEvent()
│
├── use-registrations.ts
│   ├── useRegistrations(filters?)
│   ├── useRegistration(id)
│   ├── useMyRegistrations()
│   ├── useCreateRegistration()
│   ├── useUpdateRegistration()
│   ├── useCancelRegistration()
│   ├── useApproveRegistration()
│   └── useRejectRegistration()
│
└── use-dashboard.ts
    ├── useAdminDashboard()
    └── usePresidentDashboard()
```

---

## 9. Security Considerations

### 9.1 Authentication
- No public registration - president accounts are seeded
- Better Auth with session-based authentication
- Rate limiting on login attempts

### 9.2 Authorization
- Role-based access control (ADMIN, PRESIDENT)
- Middleware route protection
- Server-side action validation
- President can only access their own church's data

### 9.3 Data Protection
- Input validation with Zod
- Parameterized database queries (Prisma)
- CSRF protection via Better Auth

---

## 10. Database Seeder

### 10.1 Initial Seed Data

```typescript
// seed.ts
async function seed() {
  // 1. Create Admin User
  await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@scmd.org",
      role: "ADMIN",
      accounts: {
        create: {
          accountId: "admin-account",
          providerId: "credential",
          password: await hashPassword("AdminPassword123!"),
        }
      }
    }
  });

  // 2. Create Sample Divisions
  const divisions = [
    { name: "North Division" },
    { name: "South Division" },
    { name: "East Division" },
    { name: "West Division" },
  ];

  for (const division of divisions) {
    await prisma.division.create({ data: division });
  }

  // 3. Create Sample Churches (linked to divisions)
  // 4. Create Coordinators (1 per division)
  // 5. Create Pastors (1 per church)
  // 6. Create President accounts (1 per church)
}
```

---

## 11. Implementation Phases

### Phase 1: Foundation
- [ ] Update Prisma schema with new models
- [ ] Run migrations
- [ ] Create seed script
- [ ] Update UserRole enum (USER → PRESIDENT)
- [ ] Update auth configuration

### Phase 2: Admin - Organization Management
- [ ] Division CRUD (pages, forms, actions)
- [ ] Church CRUD (pages, forms, actions)
- [ ] Coordinator CRUD (pages, forms, actions)
- [ ] Pastor CRUD (pages, forms, actions)
- [ ] President seeding (pages, forms, actions)

### Phase 3: Admin - Event Management
- [ ] Event CRUD (pages, forms, actions)
- [ ] Event status management
- [ ] Event listing with filters

### Phase 4: President - Registration
- [ ] President dashboard
- [ ] Event browsing
- [ ] Registration form (delegates + cooks)
- [ ] Registration history

### Phase 5: Admin - Approval Workflow
- [ ] Registration queue view
- [ ] Registration detail view
- [ ] Approve/Reject functionality
- [ ] Remarks on rejection

### Phase 6: Polish & Reports
- [ ] Dashboard statistics
- [ ] Export functionality
- [ ] Mobile responsiveness
- [ ] Error handling improvements

---

## 12. Technical Notes

### 12.1 Tech Stack (Existing)
- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Better Auth
- **UI**: shadcn/ui + Tailwind CSS 4
- **State**: TanStack React Query + Zustand
- **Forms**: React Hook Form + Zod

### 12.2 New Dependencies (If Needed)
- None required - existing stack is sufficient

### 12.3 Migration Strategy
- Backup existing database
- Run Prisma migrations
- Execute seed script
- Test authentication flow

---

## 13. Acceptance Criteria

### 13.1 Admin
- [ ] Can create, edit, delete divisions
- [ ] Can create, edit, delete churches (with division assignment)
- [ ] Can create, edit, delete coordinators (1 per division)
- [ ] Can create, edit, delete pastors (1 per church)
- [ ] Can seed president accounts (1 per church)
- [ ] Can create, edit, delete events
- [ ] Can open/close event registration
- [ ] Can view all registrations
- [ ] Can approve registrations
- [ ] Can reject registrations with remarks

### 13.2 President
- [ ] Can log in with seeded credentials
- [ ] Can view available events
- [ ] Can create registration with delegates and cooks
- [ ] Can edit pending registration
- [ ] Can view registration status
- [ ] Can view registration history

---

## Appendix A: Wireframe Descriptions

### A.1 Admin Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  SCMD Admin                              [User Menu ▼]  │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  Dashboard  │   Welcome, Admin                          │
│  Events     │                                           │
│  Divisions  │   ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  Churches   │   │ Events   │ │ Churches │ │ Pending  │  │
│  Coordinat. │   │    12    │ │    48    │ │    5     │  │
│  Pastors    │   └──────────┘ └──────────┘ └──────────┘  │
│  Presidents │                                           │
│  Registrat. │   Recent Registrations                    │
│             │   ┌─────────────────────────────────────┐ │
│             │   │ Church A - Event X - Pending        │ │
│             │   │ Church B - Event X - Approved       │ │
│             │   └─────────────────────────────────────┘ │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

### A.2 President Registration Form
```
┌─────────────────────────────────────────────────────────┐
│  SCMD President                          [User Menu ▼]  │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  Dashboard  │   Register for: Annual Conference 2025    │
│  Events     │                                           │
│  My Regist. │   Delegates                 [+ Add]       │
│             │   ┌─────────────────────────────────────┐ │
│             │   │ 1. John Doe, 25, Male        [Edit] │ │
│             │   │ 2. Jane Smith, 30, Female    [Edit] │ │
│             │   └─────────────────────────────────────┘ │
│             │                                           │
│             │   Cooks                      [+ Add]       │
│             │   ┌─────────────────────────────────────┐ │
│             │   │ 1. Mary Johnson, 45, Female [Edit]  │ │
│             │   └─────────────────────────────────────┘ │
│             │                                           │
│             │   [Cancel]              [Submit Registration]│
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

---

*Document Version: 1.1*
*Created: December 2025*
*Last Updated: December 2025*

---

## Changelog

### v1.1
- Updated EventStatus enum: UPCOMING, ONGOING, COMPLETED, CANCELLED
- Updated Event model with new fields:
  - `location` (required, replaces venue)
  - `logo` (optional)
  - `preRegistrationFee`, `preRegistrationStart`, `preRegistrationEnd`
  - `onsiteRegistrationFee`, `cookRegistrationFee`
- Added comprehensive Zod validation schemas for frontend and backend
- Added form validation integration examples
- Added server action validation examples with error handling
