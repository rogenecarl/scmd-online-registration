# SCMD Online Registration - Mobile Responsiveness Implementation Plan

## Overview

This plan outlines the implementation of mobile responsiveness for all Admin and President pages. The goal is to create a seamless mobile experience with proper navigation patterns while maintaining consistency with the existing desktop design.

**Scope:** Admin & President pages only (no functionality changes)
**Approach:** Mobile-first responsive design
**Key Features:** Mobile header, bottom navigation, responsive layouts

---

## Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Mobile-First** | Base styles for mobile, enhance for larger screens |
| **Touch-Friendly** | Minimum 44x44px touch targets, adequate spacing |
| **Thumb-Zone Design** | Primary actions in bottom navigation for easy reach |
| **Consistent Navigation** | Same patterns for Admin and President |
| **Progressive Disclosure** | Show essential info first, details on demand |
| **Performance** | Avoid layout shifts, optimize for mobile networks |

---

## Breakpoint Strategy

| Breakpoint | Width | Target Device | Navigation Mode |
|------------|-------|---------------|-----------------|
| Default | 0-639px | Mobile phones | Bottom nav + hamburger header |
| `sm` | 640-767px | Large phones/small tablets | Bottom nav + hamburger header |
| `md` | 768-1023px | Tablets | Collapsible sidebar |
| `lg` | 1024px+ | Desktops | Full sidebar |

---

## Phase Summary

| Phase | Name | Focus Area | Key Deliverables |
|-------|------|------------|------------------|
| 1 | Mobile Navigation Infrastructure | Shared components | Mobile header, bottom nav, mobile sidebar drawer |
| 2 | Layout Integration | Admin & President layouts | Responsive layout switching |
| 3 | Data Tables | Table components | Mobile card layouts, column visibility |
| 4 | Dashboard Pages | Dashboard responsiveness | Stats grids, cards, mobile optimization |
| 5 | List Pages | CRUD list pages | Responsive tables, filters, actions |
| 6 | Form Pages | Create/Edit pages | Touch-friendly forms, mobile layouts |
| 7 | Detail Pages | View/Detail pages | Responsive detail layouts |
| 8 | Polish & Testing | Final adjustments | Touch targets, spacing, testing |

---

## Phase 1: Mobile Navigation Infrastructure

### 1.1 Mobile Header Component

**Goal:** Create a consistent mobile header for Admin and President sections

**File:** `src/components/dashboard/mobile-header.tsx`

```
┌─────────────────────────────────────────────┐
│  ☰   SCMD Registration    🔔  👤           │
│ Menu     Page Title      Notif  Profile    │
└─────────────────────────────────────────────┘
```

**Features:**
- Hamburger menu button (opens sidebar drawer)
- Dynamic page title
- Notification indicator (optional)
- User avatar/profile dropdown
- Sticky positioning

**Tasks:**
- [ ] Create `mobile-header.tsx` component
- [ ] Add page title context or prop system
- [ ] Implement hamburger menu button with animation
- [ ] Add user dropdown (simplified for mobile)
- [ ] Style with consistent branding

**Component Structure:**
```typescript
interface MobileHeaderProps {
  title: string;
  onMenuClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}
```

### 1.2 Bottom Navigation Component

**Goal:** Thumb-friendly navigation for primary actions

**File:** `src/components/dashboard/bottom-nav.tsx`

**Admin Bottom Nav (5 items max):**
```
┌─────────────────────────────────────────────┐
│  🏠      📊      📋      ✓      ⋯          │
│ Home   Events  Regist  Approve  More       │
└─────────────────────────────────────────────┘
```

**President Bottom Nav (4 items):**
```
┌─────────────────────────────────────────────┐
│  🏠      📅      📝      👤                 │
│ Home   Events   My Reg  Profile            │
└─────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create `bottom-nav.tsx` component
- [ ] Create `admin-bottom-nav.tsx` with admin-specific items
- [ ] Create `president-bottom-nav.tsx` with president-specific items
- [ ] Add active state indicator
- [ ] Add haptic feedback consideration (CSS active states)
- [ ] Implement safe-area-inset for iOS

**Component Structure:**
```typescript
interface BottomNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number; // For notification counts
}

interface BottomNavProps {
  items: BottomNavItem[];
  moreItems?: BottomNavItem[]; // For "More" menu
}
```

### 1.3 Mobile Sidebar Drawer

**Goal:** Full navigation accessible via hamburger menu

**File:** `src/components/dashboard/mobile-sidebar.tsx`

**Features:**
- Slide-in from left (overlay)
- Full navigation sections
- User info at top
- Logout at bottom
- Backdrop with tap-to-close
- Swipe-to-close gesture (optional)

**Tasks:**
- [ ] Create `mobile-sidebar.tsx` component
- [ ] Use existing sidebar nav structure
- [ ] Add slide-in animation (transform + transition)
- [ ] Add backdrop overlay
- [ ] Handle body scroll lock when open
- [ ] Add close button and tap-outside-to-close

**Animation Specs:**
```css
/* Slide-in animation */
.sidebar-enter { transform: translateX(-100%); }
.sidebar-enter-active { transform: translateX(0); transition: transform 300ms ease-out; }
.sidebar-exit { transform: translateX(0); }
.sidebar-exit-active { transform: translateX(-100%); transition: transform 200ms ease-in; }
```

### 1.4 Shared Mobile Context

**Goal:** Manage mobile navigation state

**File:** `src/contexts/mobile-nav-context.tsx`

**Tasks:**
- [ ] Create context for sidebar open/close state
- [ ] Create context for current page title
- [ ] Add hook `useMobileNav()` for easy access
- [ ] Handle route changes (auto-close sidebar)

---

## Phase 2: Layout Integration

### 2.1 Admin Layout Updates

**File:** `src/app/admin/layout.tsx`

**Current Structure:**
```
┌─────────────────────────────────────────────┐
│ Sidebar (w-64) │ Main Content (flex-1)      │
│                │                             │
│                │                             │
└─────────────────────────────────────────────┘
```

**Mobile Structure:**
```
┌─────────────────────────────────────────────┐
│ Mobile Header (sticky)                       │
├─────────────────────────────────────────────┤
│                                              │
│ Main Content (full width, pb-20)             │
│                                              │
├─────────────────────────────────────────────┤
│ Bottom Navigation (fixed)                    │
└─────────────────────────────────────────────┘

+ Mobile Sidebar (overlay, triggered by menu)
```

**Tasks:**
- [ ] Wrap layout in `MobileNavProvider`
- [ ] Add conditional rendering based on screen size
- [ ] Hide desktop sidebar on mobile (`hidden md:flex`)
- [ ] Add mobile header on mobile (`md:hidden`)
- [ ] Add bottom navigation on mobile (`md:hidden`)
- [ ] Add mobile sidebar drawer component
- [ ] Adjust main content padding for bottom nav

**Responsive Classes:**
```tsx
// Desktop sidebar
<Sidebar className="hidden md:flex" />

// Mobile header
<MobileHeader className="md:hidden" />

// Main content
<main className="flex-1 pb-20 md:pb-0">

// Bottom nav
<BottomNav className="md:hidden" />
```

### 2.2 President Layout Updates

**File:** `src/app/president/layout.tsx`

**Tasks:**
- [ ] Apply same responsive pattern as admin layout
- [ ] Use president-specific bottom nav items
- [ ] Ensure ProfileGuard works with mobile layout
- [ ] Test with complete-profile flow

### 2.3 Shared Layout Components

**Tasks:**
- [ ] Update `header.tsx` for responsive behavior
- [ ] Update `sidebar.tsx` to support mobile props
- [ ] Create shared layout wrapper component (optional)

---

## Phase 3: Data Tables Mobile Optimization

### 3.1 Mobile Card Layout for Tables

**Goal:** Transform horizontal tables into vertical cards on mobile

**File:** `src/components/dashboard/data-table.tsx`

**Desktop View:**
```
┌──────────────────────────────────────────────────┐
│ Name        │ Division    │ Status   │ Actions  │
├──────────────────────────────────────────────────┤
│ John Doe    │ North       │ Active   │ Edit Del │
│ Jane Smith  │ South       │ Pending  │ Edit Del │
└──────────────────────────────────────────────────┘
```

**Mobile Card View:**
```
┌─────────────────────────────┐
│ John Doe              ⋯    │
│ Division: North             │
│ Status: ● Active            │
├─────────────────────────────┤
│ Jane Smith            ⋯    │
│ Division: South             │
│ Status: ● Pending           │
└─────────────────────────────┘
```

**Tasks:**
- [ ] Create `MobileDataCard` component for card layout
- [ ] Add `mobileRenderer` prop to column definitions
- [ ] Create responsive wrapper that switches layouts
- [ ] Implement swipe actions for edit/delete (optional)
- [ ] Add expandable card details

**Column Definition Extension:**
```typescript
interface ColumnDef<T> {
  // ... existing props
  mobileVisible?: boolean;      // Show in mobile card
  mobilePriority?: number;      // Order in mobile card
  mobileRenderer?: (row: T) => ReactNode; // Custom mobile render
}
```

### 3.2 Update Paginated Data Table

**File:** `src/components/dashboard/paginated-data-table.tsx`

**Tasks:**
- [ ] Integrate mobile card layout
- [ ] Make pagination touch-friendly
- [ ] Simplify pagination on mobile (prev/next only)
- [ ] Add pull-to-refresh (optional)

**Mobile Pagination:**
```
┌─────────────────────────────┐
│  ←  Page 1 of 10  →        │
└─────────────────────────────┘
```

### 3.3 Update Entity Tables

Apply mobile optimizations to all entity tables:

**Tasks:**
- [ ] `division-table.tsx` - Add mobile columns config
- [ ] `church-table.tsx` - Add mobile columns config
- [ ] `coordinator-table.tsx` - Add mobile columns config
- [ ] `pastor-table.tsx` - Add mobile columns config
- [ ] `president-table.tsx` - Add mobile columns config
- [ ] `event-table.tsx` - Add mobile columns config
- [ ] `registration-table.tsx` - Add mobile columns config

**Mobile Column Strategy per Entity:**

| Entity | Primary (Always Show) | Secondary (Card Detail) | Hidden on Mobile |
|--------|----------------------|------------------------|------------------|
| Division | Name, Actions | Created date | ID |
| Church | Name, Division, Actions | Pastor | ID |
| Coordinator | Name, Division, Actions | Phone, Email | ID |
| Pastor | Name, Church, Actions | Phone | ID, Division |
| President | Name, Church, Status | Email | ID, Division |
| Event | Name, Date, Status | Fees, Location | ID, Description |
| Registration | Church, Event, Status | Date, Total | ID, Reviewer |

---

## Phase 4: Dashboard Pages

### 4.1 Admin Dashboard

**File:** `src/components/admin/admin-overview.tsx`

**Current Layout Issues:**
- Stats grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Activity sections: `lg:grid-cols-3`

**Mobile Optimizations:**

**Tasks:**
- [ ] Adjust stats grid for mobile: `grid-cols-2` base
- [ ] Stack activity sections vertically on mobile
- [ ] Make stat cards more compact on mobile
- [ ] Optimize pending registrations list for mobile
- [ ] Make quick action buttons full-width on mobile

**Responsive Grid Updates:**
```tsx
// Stats - 2 columns on mobile, 4 on desktop
<div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">

// Activity sections - stack on mobile
<div className="grid gap-6 lg:grid-cols-3">
  <Card className="lg:col-span-2">  // Recent registrations
  <Card>  // Activity feed
</div>
```

### 4.2 President Dashboard

**Files:**
- `src/app/president/dashboard/page.tsx`
- `src/components/president/dashboard/`

**Tasks:**
- [ ] Update `church-info-card.tsx` for mobile
- [ ] Update `registration-summary.tsx` for mobile
- [ ] Update `upcoming-events-card.tsx` for mobile
- [ ] Adjust grid layouts for mobile stacking
- [ ] Make action buttons full-width on mobile

### 4.3 Stats Components

**File:** `src/components/dashboard/stats-grid.tsx`

**Tasks:**
- [ ] Add responsive column props
- [ ] Reduce padding on mobile: `p-4 md:p-6`
- [ ] Smaller icons and text on mobile
- [ ] Stack icon and value vertically on small mobile

---

## Phase 5: List Pages

### 5.1 Page Header Component

**File:** `src/components/shared/page-header.tsx` (create if doesn't exist)

**Desktop:**
```
┌─────────────────────────────────────────────┐
│ Page Title                    + Add New     │
│ Description text here                       │
└─────────────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────────────────────────────┐
│ Page Title                                  │
│ Description text here                       │
│ ┌─────────────────────────────────────────┐ │
│ │            + Add New                    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create/update page header component
- [ ] Stack title and button on mobile
- [ ] Make add button full-width on mobile
- [ ] Consistent spacing across pages

### 5.2 Search & Filter Components

**Tasks:**
- [ ] Make search input full-width on mobile
- [ ] Stack filter dropdowns vertically on mobile
- [ ] Add filter sheet/modal for complex filters
- [ ] Collapsible filter section on mobile

**Mobile Filter Pattern:**
```
┌─────────────────────────────────────────────┐
│ 🔍 Search...                          🎛️   │ <- Filter icon opens sheet
└─────────────────────────────────────────────┘

Filter Sheet:
┌─────────────────────────────────────────────┐
│ Filters                              ✕      │
├─────────────────────────────────────────────┤
│ Status: [All ▼]                             │
│ Event: [All ▼]                              │
│ Division: [All ▼]                           │
├─────────────────────────────────────────────┤
│ [Clear]                    [Apply Filters]  │
└─────────────────────────────────────────────┘
```

### 5.3 Admin List Pages

Apply responsive patterns to all admin list pages:

**Tasks:**
- [ ] `divisions/page.tsx` - Responsive header, mobile table
- [ ] `churches/page.tsx` - Responsive header, mobile table
- [ ] `coordinators/page.tsx` - Responsive header, mobile table
- [ ] `pastors/page.tsx` - Responsive header, mobile table
- [ ] `presidents/page.tsx` - Responsive header, mobile table
- [ ] `events/page.tsx` - Responsive header, mobile table
- [ ] `registrations/page.tsx` - Responsive filters, mobile table

### 5.4 President List Pages

**Tasks:**
- [ ] `events/page.tsx` - Responsive event cards grid
- [ ] `registrations/page.tsx` - Responsive registration list

---

## Phase 6: Form Pages

### 6.1 Form Layout Optimization

**General Form Patterns:**

**Desktop (2-column):**
```
┌────────────────────┬────────────────────┐
│ Field 1            │ Field 2            │
├────────────────────┼────────────────────┤
│ Field 3            │ Field 4            │
└────────────────────┴────────────────────┘
```

**Mobile (stacked):**
```
┌─────────────────────────────────────────┐
│ Field 1                                 │
├─────────────────────────────────────────┤
│ Field 2                                 │
├─────────────────────────────────────────┤
│ Field 3                                 │
├─────────────────────────────────────────┤
│ Field 4                                 │
└─────────────────────────────────────────┘
```

**Tasks:**
- [ ] Ensure all grids use mobile-first: `grid-cols-1 md:grid-cols-2`
- [ ] Increase touch target size for inputs
- [ ] Add proper spacing between form sections
- [ ] Make form buttons full-width on mobile
- [ ] Sticky form actions on mobile (optional)

### 6.2 Admin Form Pages

**Tasks:**
- [ ] `divisions/create/page.tsx` - Responsive form
- [ ] `divisions/[id]/edit/page.tsx` - Responsive form
- [ ] `churches/create/page.tsx` - Responsive form with division select
- [ ] `churches/[id]/edit/page.tsx` - Responsive form
- [ ] `coordinators/create/page.tsx` - Responsive form
- [ ] `coordinators/[id]/edit/page.tsx` - Responsive form
- [ ] `pastors/create/page.tsx` - Responsive form
- [ ] `pastors/[id]/edit/page.tsx` - Responsive form
- [ ] `presidents/create/page.tsx` - Responsive form
- [ ] `presidents/[id]/edit/page.tsx` - Responsive form
- [ ] `events/create/page.tsx` - Multi-section form
- [ ] `events/[id]/edit/page.tsx` - Multi-section form

### 6.3 Event Form Sections

**File:** `src/components/admin/events/event-form.tsx`

**Current sections:**
1. Basic Info
2. Event Dates
3. Registration Settings
4. Fees

**Tasks:**
- [ ] Make sections collapsible on mobile (accordion)
- [ ] Stack date pickers vertically on mobile
- [ ] Group fee inputs in responsive grid
- [ ] Add section progress indicator (optional)

### 6.4 President Registration Form

**File:** `src/components/president/registration/registration-form.tsx`

**Tasks:**
- [ ] Optimize delegate/cook person forms for mobile
- [ ] Make add/remove buttons touch-friendly
- [ ] Stack fee summary below form on mobile
- [ ] Add step indicator for long forms (optional)

### 6.5 Form Components

**Tasks:**
- [ ] Update `person-form.tsx` - Responsive grid
- [ ] Update `fee-summary.tsx` - Mobile layout
- [ ] Ensure all shadcn form components are touch-friendly

---

## Phase 7: Detail Pages

### 7.1 Detail Page Layout Pattern

**Desktop:**
```
┌───────────────────────────────────────────────────┐
│ Back   Entity Name                    Edit Delete │
├───────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌───────────────────────────┐ │
│ │ Info Card       │ │ Related Data              │ │
│ │                 │ │                           │ │
│ └─────────────────┘ └───────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────────────────────────┐
│ ← Back                                  │
├─────────────────────────────────────────┤
│ Entity Name                             │
│ Status Badge                            │
├─────────────────────────────────────────┤
│ Info Card                               │
│ ...                                     │
├─────────────────────────────────────────┤
│ Related Data                            │
│ ...                                     │
├─────────────────────────────────────────┤
│ [Edit]              [Delete]            │
└─────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create shared detail page layout component
- [ ] Stack cards vertically on mobile
- [ ] Move action buttons to bottom on mobile
- [ ] Add sticky action bar on mobile (optional)

### 7.2 Admin Detail Pages

**Tasks:**
- [ ] `divisions/[id]/page.tsx` - Responsive detail
- [ ] `churches/[id]/page.tsx` - Responsive detail with relations
- [ ] `coordinators/[id]/page.tsx` - Responsive detail
- [ ] `pastors/[id]/page.tsx` - Responsive detail
- [ ] `presidents/[id]/page.tsx` - Responsive detail
- [ ] `events/[id]/page.tsx` - Responsive detail with stats
- [ ] `registrations/[id]/page.tsx` - Responsive with delegates/cooks

### 7.3 Registration Detail (Special)

**File:** `src/app/admin/registrations/[registrationId]/page.tsx`

**Tasks:**
- [ ] Responsive info grid
- [ ] Stack delegates and cooks tables vertically
- [ ] Make approval/rejection dialogs mobile-friendly
- [ ] Full-width action buttons on mobile

### 7.4 President Detail Pages

**Tasks:**
- [ ] `events/[eventId]/page.tsx` - Responsive event detail
- [ ] `registrations/[registrationId]/page.tsx` - Responsive registration view
- [ ] `registrations/[registrationId]/edit/page.tsx` - Responsive edit form

---

## Phase 8: Polish & Testing

### 8.1 Touch Target Optimization

**Minimum sizes:**
- Buttons: 44x44px minimum
- List items: 48px height minimum
- Icons: 24px with 44px touch area

**Tasks:**
- [ ] Audit all buttons for touch targets
- [ ] Audit all list items for height
- [ ] Add appropriate padding to icon buttons
- [ ] Test with actual touch devices

### 8.2 Spacing Adjustments

**Mobile spacing scale:**
```
gap-2 → gap-3 on mobile for lists
gap-4 → gap-3 on mobile for grids
p-6 → p-4 on mobile for cards
```

**Tasks:**
- [ ] Review all card padding
- [ ] Review all grid gaps
- [ ] Ensure consistent mobile spacing

### 8.3 Typography Adjustments

**Tasks:**
- [ ] Review heading sizes on mobile
- [ ] Ensure readable font sizes (min 14px body)
- [ ] Check line heights for touch targets

### 8.4 Loading States

**Tasks:**
- [ ] Ensure skeletons are mobile-responsive
- [ ] Add pull-to-refresh indicators (optional)
- [ ] Test loading states on slow connections

### 8.5 Error States

**Tasks:**
- [ ] Make error messages mobile-friendly
- [ ] Ensure toast notifications work on mobile
- [ ] Test form validation on mobile

### 8.6 Testing Checklist

**Devices to test:**
- [ ] iPhone SE (375px) - smallest common screen
- [ ] iPhone 14 (390px) - standard phone
- [ ] iPhone 14 Pro Max (430px) - large phone
- [ ] iPad Mini (768px) - small tablet
- [ ] iPad (1024px) - standard tablet

**Test scenarios:**
- [ ] Navigate all admin pages
- [ ] Navigate all president pages
- [ ] Complete a registration form
- [ ] Approve/reject a registration
- [ ] Use all filters
- [ ] Test all CRUD operations
- [ ] Test with keyboard on mobile
- [ ] Test with screen reader basics

---

## Component File Structure

```
src/components/
├── dashboard/
│   ├── mobile-header.tsx         # NEW - Mobile header
│   ├── bottom-nav.tsx            # NEW - Bottom navigation base
│   ├── mobile-sidebar.tsx        # NEW - Mobile sidebar drawer
│   ├── sidebar.tsx               # UPDATE - Add mobile support
│   ├── header.tsx                # UPDATE - Responsive updates
│   ├── data-table.tsx            # UPDATE - Mobile card layout
│   └── paginated-data-table.tsx  # UPDATE - Mobile pagination
│
├── shared/
│   ├── page-header.tsx           # NEW - Responsive page header
│   ├── mobile-filter-sheet.tsx   # NEW - Mobile filter drawer
│   └── detail-page-layout.tsx    # NEW - Responsive detail layout
│
├── admin/
│   ├── admin-bottom-nav.tsx      # NEW - Admin bottom nav config
│   └── [entity]/
│       └── *-columns.tsx         # UPDATE - Mobile column configs
│
└── president/
    ├── president-bottom-nav.tsx  # NEW - President bottom nav config
    └── ...
```

---

## New Files Summary

| File | Purpose |
|------|---------|
| `src/components/dashboard/mobile-header.tsx` | Mobile header with menu, title, user |
| `src/components/dashboard/bottom-nav.tsx` | Base bottom navigation component |
| `src/components/dashboard/mobile-sidebar.tsx` | Slide-in drawer for full navigation |
| `src/components/admin/admin-bottom-nav.tsx` | Admin-specific bottom nav items |
| `src/components/president/president-bottom-nav.tsx` | President-specific bottom nav items |
| `src/components/shared/page-header.tsx` | Responsive page header |
| `src/components/shared/mobile-filter-sheet.tsx` | Mobile filter drawer |
| `src/components/shared/detail-page-layout.tsx` | Responsive detail page layout |
| `src/contexts/mobile-nav-context.tsx` | Mobile navigation state management |

---

## Files to Modify Summary

### Priority 1 - Critical (Layout & Navigation)
- `src/app/admin/layout.tsx`
- `src/app/president/layout.tsx`
- `src/components/dashboard/sidebar.tsx`
- `src/components/dashboard/header.tsx`
- `src/components/dashboard/data-table.tsx`
- `src/components/dashboard/paginated-data-table.tsx`

### Priority 2 - High (Tables & Lists)
- `src/components/admin/divisions/division-columns.tsx`
- `src/components/admin/churches/church-columns.tsx`
- `src/components/admin/coordinators/coordinator-columns.tsx`
- `src/components/admin/pastors/pastor-columns.tsx`
- `src/components/admin/presidents/president-columns.tsx`
- `src/components/admin/events/event-columns.tsx`
- `src/components/admin/registrations/registration-columns.tsx`

### Priority 3 - Medium (Pages)
All admin pages in:
- `src/app/admin/dashboard/`
- `src/app/admin/divisions/`
- `src/app/admin/churches/`
- `src/app/admin/coordinators/`
- `src/app/admin/pastors/`
- `src/app/admin/presidents/`
- `src/app/admin/events/`
- `src/app/admin/registrations/`
- `src/app/admin/reports/`

All president pages in:
- `src/app/president/dashboard/`
- `src/app/president/events/`
- `src/app/president/registrations/`
- `src/app/president/complete-profile/`

### Priority 4 - Components
- `src/components/admin/admin-overview.tsx`
- `src/components/president/dashboard/*`
- `src/components/president/events/*`
- `src/components/president/registration/*`
- All form components

---

## CSS Utilities to Add

Add to `src/app/globals.css`:

```css
/* Safe area insets for iOS */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

/* Mobile-specific utilities */
@media (max-width: 767px) {
  .mobile-full-width {
    width: 100% !important;
  }

  .mobile-stack {
    flex-direction: column !important;
  }

  .mobile-hidden {
    display: none !important;
  }
}

/* Touch-friendly sizing */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Bottom nav height variable */
:root {
  --bottom-nav-height: 64px;
}

/* Main content padding for bottom nav */
.has-bottom-nav {
  padding-bottom: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom));
}
```

---

## Testing Checklist

### Phase 1 Completion
- [ ] Mobile header renders correctly
- [ ] Bottom nav shows on mobile, hides on desktop
- [ ] Sidebar drawer opens/closes
- [ ] Navigation works from bottom nav
- [ ] Navigation works from sidebar drawer

### Phase 2 Completion
- [ ] Admin layout switches correctly at breakpoints
- [ ] President layout switches correctly at breakpoints
- [ ] No layout shifts during navigation

### Phase 3 Completion
- [ ] Tables show card layout on mobile
- [ ] All table actions work on mobile
- [ ] Pagination is usable on mobile

### Phase 4 Completion
- [ ] Dashboard stats are readable on mobile
- [ ] Dashboard cards stack correctly
- [ ] All dashboard actions work on mobile

### Phase 5 Completion
- [ ] All list pages are mobile-friendly
- [ ] Filters work on mobile
- [ ] Search works on mobile
- [ ] Add/Create buttons work on mobile

### Phase 6 Completion
- [ ] All forms are usable on mobile
- [ ] Form validation shows correctly
- [ ] Submit buttons are reachable
- [ ] Date pickers work on mobile

### Phase 7 Completion
- [ ] All detail pages are readable on mobile
- [ ] Actions are accessible on mobile
- [ ] Related data is visible on mobile

### Phase 8 Completion
- [ ] All touch targets are 44px minimum
- [ ] Spacing is consistent
- [ ] No horizontal scroll on any page
- [ ] All features work on real devices

---

## Notes

- **No functionality changes** - Only UI/UX and responsive design
- **Consistent patterns** - Same navigation and layout patterns for Admin and President
- **Progressive enhancement** - Desktop experience unchanged
- **Accessibility** - Maintain keyboard navigation and screen reader support
- **Performance** - Avoid unnecessary re-renders from responsive logic

---

*Plan Version: 1.0*
*Created: December 2025*
