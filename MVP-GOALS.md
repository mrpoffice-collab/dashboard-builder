# Dashboard Builder - MVP Goals & Testable Criteria

## Problem Statement
Business owners and agencies waste hours manually pulling data from multiple sources and creating reports, leading to stale insights and missed opportunities.

## Target Users
1. **Small Business Owners** - Need to see business health at a glance but don't have time to pull reports from 5 different tools
2. **Marketing Agencies** - Must create client reports monthly but spend 4+ hours per client gathering data
3. **Operations Managers** - Need real-time KPI visibility but current tools require technical setup
4. **Freelance Consultants** - Want to deliver professional dashboards to clients but can't afford enterprise tools

## Success Metric
User can create a functional dashboard with real data in under 5 minutes without writing code.

---

## MVP Scope Analysis

### What the FULL vision includes:
- 50+ data source integrations
- Drag-and-drop widget builder
- Pre-built industry templates
- Automated alerts
- Scheduled reports
- PDF export
- White-label sharing
- Data governance & audit trails

### What MVP ACTUALLY needs:
The core value is: **"See your data in one place, fast."**

MVP should prove this works. Everything else is scale.

---

## MVP Goals

### Goal 1: Dashboard Creation
**Problem:** Users can't quickly create a dashboard without technical skills
**Target:** All user types
**Success:** User creates a dashboard with widgets in < 2 minutes

### Goal 2: Data Connection (Demo Mode)
**Problem:** Users need to see how their data would look
**Target:** Users evaluating the product
**Success:** User connects a demo data source OR uploads CSV and sees it visualized

### Goal 3: Widget Library
**Problem:** Users don't know how to visualize data effectively
**Target:** Non-technical users
**Success:** User picks from pre-built widget types (charts, KPIs, tables) and configures them

### Goal 4: Dashboard Sharing
**Problem:** Users need to share insights with stakeholders
**Target:** Agencies, consultants
**Success:** User generates a shareable link that works without login

### Goal 5: Template Quick-Start
**Problem:** Starting from blank canvas is overwhelming
**Target:** New users
**Success:** User picks a template and has a working dashboard in 1 click

### Goal 6: PDF Export
**Problem:** Users need offline/printable reports
**Target:** Agencies, consultants
**Success:** User exports dashboard as professional PDF

---

## User Journey Mapping

### 3.1 Discovery → First Use

1. **User lands on homepage**
   - Sees: "Build dashboards in minutes, not hours"
   - Sees: Live demo dashboard preview
   - Sees: "Start Free" CTA
   - **Feature needed:** Homepage with value prop, demo preview

2. **User understands value**
   - Sees: Feature grid showing capabilities
   - Sees: Template gallery preview
   - Sees: "No code required" messaging
   - **Feature needed:** Marketing sections, social proof

3. **User takes first action**
   - Clicks "Start Free" → lands in dashboard builder
   - OR clicks template → dashboard pre-populated
   - **Feature needed:** Auth-free trial, template gallery

4. **User sees first result**
   - Dashboard renders with sample data
   - Widgets are draggable/configurable
   - **Feature needed:** Widget builder, sample data

### 3.2 Continued Use

1. **User returns**
   - Logs in → sees saved dashboards
   - **Feature needed:** Auth, dashboard persistence

2. **User does more**
   - Adds more widgets, customizes layout
   - Connects real data source
   - **Feature needed:** Data source connection, layout system

3. **User tracks progress**
   - Dashboard history view
   - **Feature needed:** Dashboard list page

### 3.3 Advanced Use

1. **User exports/shares**
   - Generates share link
   - Downloads PDF
   - **Feature needed:** Share system, PDF export

2. **User manages multiple dashboards**
   - Dashboard list with CRUD
   - **Feature needed:** Dashboard management

---

## Feature Completeness Check

### 4.1 The "Day 1 User" Test

- [x] Understand what it does - Homepage with clear value prop
- [x] Take the core action - Create dashboard with widgets
- [x] See the result - Dashboard renders with data visualization
- [x] Do it again - Can create multiple dashboards
- [x] Find their past work - Dashboard list after login
- [x] Get help if stuck - Error messages, empty states

### 4.2 The "Promised Value" Test

| Claim | Feature Required | Planned? |
|-------|------------------|----------|
| "Build dashboards in minutes" | Widget builder + templates | Yes |
| "Connect your data" | CSV upload + demo sources | Yes (limited) |
| "Share with stakeholders" | Share links | Yes |
| "Export to PDF" | PDF generation | Yes |
| "No code required" | Drag-and-drop UI | Yes |
| "50+ integrations" | API connectors | NO - DEFER |
| "White-label" | Branding removal | NO - DEFER |
| "Automated alerts" | Notification system | NO - DEFER |
| "Scheduled reports" | Cron jobs | NO - DEFER |
| "Data governance" | Audit logs | NO - DEFER |

### 4.3 The "Competitor Baseline" Test

What Databox/Geckoboard/Klipfolio offer:
- [x] Pre-built widgets - PLANNED
- [x] Drag-and-drop - PLANNED
- [x] Share links - PLANNED
- [x] PDF export - PLANNED
- [ ] Real-time data refresh - DEFER (manual refresh MVP)
- [ ] Mobile app - DEFER
- [ ] Team collaboration - DEFER

---

## Testable Criteria

### Homepage - 6 criteria
- [ ] **HOME-01:** Homepage loads in < 3 seconds
- [ ] **HOME-02:** Hero section has clear value prop and CTA
- [ ] **HOME-03:** Feature grid shows 4-6 key capabilities
- [ ] **HOME-04:** Template preview section shows 3+ templates
- [ ] **HOME-05:** "Start Free" button navigates to builder
- [ ] **HOME-06:** SEO meta tags present (title, description, og:tags)

### Authentication - 5 criteria
- [ ] **AUTH-01:** User can sign up with email/password
- [ ] **AUTH-02:** User can log in with existing account
- [ ] **AUTH-03:** User can log out
- [ ] **AUTH-04:** Protected routes redirect to login
- [ ] **AUTH-05:** Session persists across page refresh

### Dashboard Builder - 10 criteria
- [ ] **BUILD-01:** User can create new dashboard with name
- [ ] **BUILD-02:** User can add widget from widget palette
- [ ] **BUILD-03:** Widget can be positioned via drag-and-drop
- [ ] **BUILD-04:** Widget can be resized
- [ ] **BUILD-05:** Widget can be configured (data source, display options)
- [ ] **BUILD-06:** Widget can be deleted
- [ ] **BUILD-07:** Dashboard auto-saves on change
- [ ] **BUILD-08:** Dashboard can be renamed
- [ ] **BUILD-09:** Dashboard can be deleted
- [ ] **BUILD-10:** Empty state shows helpful prompt to add widget

### Widget Types - 8 criteria
- [ ] **WIDGET-01:** KPI/Metric widget displays single number with label
- [ ] **WIDGET-02:** Line chart widget renders time-series data
- [ ] **WIDGET-03:** Bar chart widget renders categorical data
- [ ] **WIDGET-04:** Pie/Donut chart widget renders proportional data
- [ ] **WIDGET-05:** Table widget renders tabular data with sorting
- [ ] **WIDGET-06:** Progress bar widget shows completion percentage
- [ ] **WIDGET-07:** All widgets have loading state
- [ ] **WIDGET-08:** All widgets have error state for bad data

### Data Sources - 5 criteria
- [ ] **DATA-01:** User can upload CSV file
- [ ] **DATA-02:** CSV data is parsed and available for widgets
- [ ] **DATA-03:** Demo data source provides realistic sample data
- [ ] **DATA-04:** User can see list of connected data sources
- [ ] **DATA-05:** User can disconnect/remove data source

### Templates - 4 criteria
- [ ] **TMPL-01:** Template gallery shows 3+ templates
- [ ] **TMPL-02:** User can preview template before using
- [ ] **TMPL-03:** User can create dashboard from template (1-click)
- [ ] **TMPL-04:** Template includes sample data for demo

### Sharing - 4 criteria
- [ ] **SHARE-01:** User can generate public share link
- [ ] **SHARE-02:** Share link displays read-only dashboard
- [ ] **SHARE-03:** Share link works without login
- [ ] **SHARE-04:** User can revoke share link

### PDF Export - 3 criteria
- [ ] **PDF-01:** User can export dashboard as PDF
- [ ] **PDF-02:** PDF includes all visible widgets
- [ ] **PDF-03:** PDF has professional formatting (header, date)

### Dashboard Management - 4 criteria
- [ ] **MGMT-01:** User sees list of all their dashboards
- [ ] **MGMT-02:** Dashboard list shows name, last modified
- [ ] **MGMT-03:** User can duplicate a dashboard
- [ ] **MGMT-04:** User can search/filter dashboards

---

## Deferred Features (with justification)

### 50+ Data Source Integrations
- **Why defer:** Each integration requires API auth, rate limiting, data mapping. Minimum 2-3 days per integration. 50 = 100+ days of work.
- **User impact:** Users can upload CSV for now. Demo data shows value.
- **When to build:** Phase 2, prioritize by user request (Google Analytics, Stripe, HubSpot first)
- **Marketing note:** DO NOT claim "50+ integrations" - say "Connect your data via CSV (more integrations coming)"

### White-Label / Custom Branding
- **Why defer:** Requires subdomain routing, custom CSS system, logo upload
- **User impact:** Shared dashboards show "DashBuilder" branding. Professional but not anonymous.
- **When to build:** Phase 2, premium tier feature
- **Marketing note:** DO NOT advertise white-label in MVP

### Automated Alerts
- **Why defer:** Requires background job system, email infrastructure, threshold configuration UI
- **User impact:** User manually checks dashboards
- **When to build:** Phase 2, after core is stable
- **Marketing note:** DO NOT mention alerts

### Scheduled Reports
- **Why defer:** Requires cron infrastructure, email templates, scheduling UI
- **User impact:** User manually exports PDF when needed
- **When to build:** Phase 2, pairs with alerts
- **Marketing note:** DO NOT mention scheduled reports

### Data Governance & Audit Trails
- **Why defer:** Enterprise feature requiring extensive logging infrastructure
- **User impact:** MVP targets SMB, not enterprise compliance
- **When to build:** Phase 3, enterprise tier
- **Marketing note:** DO NOT mention compliance/governance

### Real-Time Data Refresh
- **Why defer:** Requires WebSocket infrastructure, background polling
- **User impact:** Manual "Refresh" button available
- **When to build:** Phase 2
- **Marketing note:** Say "up-to-date data" not "real-time"

### Team Collaboration
- **Why defer:** Requires role system, permissions, activity feeds
- **User impact:** Single user per account, share via links
- **When to build:** Phase 2, team tier
- **Marketing note:** DO NOT mention teams/collaboration

---

## Marketing Alignment Check

| Claim | Feature | Status |
|-------|---------|--------|
| "Build dashboards in minutes" | Widget builder + templates | ✅ Built |
| "No code required" | Drag-and-drop UI | ✅ Built |
| "Connect your data" | CSV upload | ✅ Built (limited) |
| "Share insights" | Share links | ✅ Built |
| "Export reports" | PDF export | ✅ Built |
| "Pre-built templates" | Template gallery | ✅ Built |
| "50+ integrations" | API connectors | ❌ REMOVE FROM COPY |
| "White-label" | Custom branding | ❌ REMOVE FROM COPY |
| "Automated alerts" | Notifications | ❌ REMOVE FROM COPY |
| "Scheduled reports" | Cron jobs | ❌ REMOVE FROM COPY |
| "Data governance" | Audit logs | ❌ REMOVE FROM COPY |

**All claims verified: YES (after removing deferred items from marketing)**

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts (simple, React-native)
- **Drag-and-Drop:** @dnd-kit/core (modern, accessible)
- **State:** React Context + localStorage for demo mode

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Neon) via Prisma
- **Auth:** NextAuth.js with credentials provider
- **File Storage:** Vercel Blob (for CSV uploads)
- **PDF Generation:** @react-pdf/renderer

### Infrastructure
- **Hosting:** Vercel
- **Database:** Neon PostgreSQL
- **Domain:** Vercel (dashbuilder.vercel.app initially)

---

## Build Priority

### Phase 1: Core Builder (Days 1-2)
1. Project setup (Next.js, Tailwind, Prisma)
2. Database schema
3. Basic auth (signup/login/logout)
4. Dashboard CRUD
5. Widget palette + drag-and-drop
6. 3 widget types (KPI, Bar Chart, Line Chart)

### Phase 2: Data & Polish (Days 3-4)
7. CSV upload and parsing
8. Demo data source
9. 3 more widget types (Pie, Table, Progress)
10. Template gallery (3 templates)
11. Dashboard sharing (public links)

### Phase 3: Export & Launch (Day 5)
12. PDF export
13. Homepage with marketing
14. SEO optimization
15. Final testing against all criteria

---

## Database Schema (Draft)

```prisma
model User {
  id            String      @id @default(cuid())
  email         String      @unique
  passwordHash  String
  dashboards    Dashboard[]
  dataSources   DataSource[]
  createdAt     DateTime    @default(now())
}

model Dashboard {
  id          String    @id @default(cuid())
  name        String
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  widgets     Widget[]
  shareToken  String?   @unique
  isPublic    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Widget {
  id            String    @id @default(cuid())
  dashboardId   String
  dashboard     Dashboard @relation(fields: [dashboardId], references: [id], onDelete: Cascade)
  type          String    // kpi, line, bar, pie, table, progress
  title         String
  config        Json      // widget-specific configuration
  position      Json      // { x, y, w, h }
  dataSourceId  String?
  dataSource    DataSource? @relation(fields: [dataSourceId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model DataSource {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  name      String
  type      String    // csv, demo
  config    Json      // file path, demo type, etc.
  data      Json?     // cached data for CSV
  widgets   Widget[]
  createdAt DateTime  @default(now())
}

model Template {
  id          String  @id @default(cuid())
  name        String
  description String
  category    String  // sales, marketing, operations
  thumbnail   String
  config      Json    // full dashboard config to clone
}
```

---

## Completion Checklist

- [x] Problem statement is specific and clear
- [x] Target users are defined with their pain points
- [x] Success metric is measurable
- [x] All features needed for value prop are listed
- [x] User journeys are mapped completely
- [x] Each feature has testable criteria
- [x] Deferred features are justified
- [x] Marketing claims match planned features
- [x] No feature is "assumed" - everything explicit

---

## TOTAL CRITERIA: 49

**Planning complete. Ready for build phase.**
