# Dashboard Builder - PLAN

## App Name
DashBuilder

## One-Line Description
Create beautiful data dashboards in minutes with drag-and-drop widgets, CSV import, and API integrations.

## Core Value Proposition
Business owners and agencies can build professional dashboards without code, connecting their favorite tools or uploading data directly.

## Target User
Small business owners, marketing agencies, and consultants who need to visualize data quickly.

## Tech Stack
- Next.js 16 (App Router)
- Prisma 6 + Neon PostgreSQL
- Tailwind CSS
- Recharts (charts)
- @dnd-kit/core (drag-and-drop)
- Vercel

---

## MVP Features

1. **Dashboard Builder** - Create/edit dashboards with drag-and-drop widgets
2. **Widget Library** - 6 widget types: KPI, Line Chart, Bar Chart, Pie Chart, Table, Progress
3. **CSV Data Import** - Upload CSV files as data sources
4. **Demo Data** - Pre-loaded sample data for trying the app
5. **Templates** - 3 pre-built dashboard templates (Sales, Marketing, Operations)
6. **Share Links** - Generate public links to share dashboards
7. **PDF Export** - Download dashboard as PDF
8. **Auth** - Email/password signup and login

---

## API Integration Potentials (Future-Ready Architecture)

### MVP: Foundation for Integrations
The data source architecture supports OAuth-based API connections. MVP includes:
- **CSV Upload** - Manual data import
- **Demo Data** - Sample datasets

### Phase 2: Priority Integrations (High Demand)

#### Analytics & Marketing
- **Google Analytics 4** - Website traffic, user behavior, conversions
- **Google Search Console** - SEO performance, keywords, impressions
- **Facebook Ads** - Ad spend, impressions, conversions, ROAS
- **Google Ads** - Campaign performance, cost per click, conversions
- **LinkedIn Ads** - B2B campaign metrics
- **TikTok Ads** - Video ad performance

#### CRM & Sales
- **HubSpot** - Deals, contacts, pipeline, activities
- **Salesforce** - Opportunities, leads, accounts
- **Pipedrive** - Sales pipeline, deals, activities
- **Close.com** - Sales metrics, call tracking

#### E-Commerce
- **Stripe** - Revenue, subscriptions, churn, MRR
- **Shopify** - Orders, revenue, products, customers
- **WooCommerce** - Sales, inventory, customer data
- **PayPal** - Transaction history, revenue

#### Accounting & Finance
- **QuickBooks Online** - P&L, balance sheet, cash flow
- **Xero** - Financial statements, invoices
- **Wave** - Income, expenses, invoices
- **FreshBooks** - Time tracking, invoices, expenses

#### Project Management
- **Asana** - Tasks, projects, workload
- **Monday.com** - Project status, timelines
- **Jira** - Sprint velocity, bug counts, cycle time
- **Trello** - Board metrics, card counts
- **Notion** - Database queries

#### Support & Communication
- **Zendesk** - Ticket volume, response time, CSAT
- **Intercom** - Conversations, resolution time
- **Freshdesk** - Support metrics
- **Slack** - Message analytics (workspace admin)

#### Social Media
- **Instagram** - Followers, engagement, reach
- **Twitter/X** - Impressions, engagement, followers
- **YouTube** - Views, subscribers, watch time
- **LinkedIn** - Page analytics, follower growth

#### Databases & Warehouses
- **PostgreSQL** - Direct SQL queries
- **MySQL** - Direct SQL queries
- **MongoDB** - Collection queries
- **Airtable** - Base data
- **Google Sheets** - Spreadsheet data
- **Snowflake** - Data warehouse queries
- **BigQuery** - Analytics queries

### Integration Architecture (MVP-Ready)

```typescript
// DataSource model supports future integrations
model DataSource {
  id           String   @id
  userId       String
  name         String
  type         String   // csv, demo, google_analytics, stripe, hubspot, etc.
  credentials  Json?    // Encrypted OAuth tokens (future)
  config       Json     // API-specific config (account ID, date range, etc.)
  data         Json     // Cached data
  lastSync     DateTime?
  syncStatus   String?  // pending, syncing, success, error
}

// Future: OAuth flow
// GET /api/integrations/[provider]/connect - Start OAuth
// GET /api/integrations/[provider]/callback - OAuth callback
// POST /api/data-sources/[id]/sync - Trigger data refresh
```

### Integration UI (Prepared in MVP)
- Data Sources page shows "Connect" button with integration logos
- MVP shows "Coming Soon" badges on integrations
- CSV upload is fully functional
- Architecture ready for OAuth flows

---

## Database Models

```prisma
model User {
  id            String       @id @default(cuid())
  email         String       @unique
  passwordHash  String
  dashboards    Dashboard[]
  dataSources   DataSource[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Dashboard {
  id          String    @id @default(cuid())
  name        String
  description String?
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  widgets     Widget[]
  shareToken  String?   @unique
  isPublic    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Widget {
  id           String     @id @default(cuid())
  dashboardId  String
  dashboard    Dashboard  @relation(fields: [dashboardId], references: [id], onDelete: Cascade)
  type         String     // kpi, line, bar, pie, table, progress
  title        String
  config       Json       // type-specific config (colors, labels, etc.)
  dataConfig   Json       // which data source, columns to use
  position     Json       // { x, y, w, h } for grid layout
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

model DataSource {
  id           String    @id @default(cuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  name         String
  type         String    // csv, demo, google_analytics, stripe, hubspot, etc.
  credentials  Json?     // Encrypted OAuth tokens (null for CSV/demo)
  config       Json      // API-specific config or CSV metadata
  data         Json      // Parsed data
  columns      Json      // Column names and types
  lastSync     DateTime? // Last successful sync
  syncStatus   String?   // pending, syncing, success, error
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

---

## API Routes

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login, return session token
- `POST /api/auth/logout` - Clear session
- `GET /api/auth/me` - Get current user

### Dashboards
- `GET /api/dashboards` - List user's dashboards
- `POST /api/dashboards` - Create dashboard
- `GET /api/dashboards/[id]` - Get dashboard with widgets
- `PUT /api/dashboards/[id]` - Update dashboard
- `DELETE /api/dashboards/[id]` - Delete dashboard
- `POST /api/dashboards/[id]/share` - Generate share token
- `DELETE /api/dashboards/[id]/share` - Revoke share token

### Widgets
- `POST /api/dashboards/[id]/widgets` - Add widget
- `PUT /api/widgets/[id]` - Update widget (position, config)
- `DELETE /api/widgets/[id]` - Delete widget

### Data Sources
- `GET /api/data-sources` - List user's data sources
- `POST /api/data-sources` - Create (upload CSV or add demo)
- `DELETE /api/data-sources/[id]` - Delete data source
- `GET /api/data-sources/[id]/preview` - Get sample data
- `POST /api/data-sources/[id]/sync` - Trigger sync (future)

### Integrations (Future-Ready)
- `GET /api/integrations` - List available integrations
- `GET /api/integrations/[provider]/connect` - Start OAuth flow
- `GET /api/integrations/[provider]/callback` - OAuth callback

### Templates
- `GET /api/templates` - List available templates
- `POST /api/templates/[id]/use` - Create dashboard from template

### Export
- `GET /api/dashboards/[id]/export/pdf` - Generate PDF

### Public
- `GET /api/public/[shareToken]` - Get shared dashboard (no auth)

---

## Pages

### Public Pages
- `/` - Homepage with value prop, features, integration logos, CTA
- `/login` - Login form
- `/signup` - Signup form
- `/share/[token]` - Public shared dashboard view
- `/integrations` - Integration showcase page (marketing)

### Protected Pages (require auth)
- `/dashboard` - Dashboard list (home after login)
- `/dashboard/new` - Create new dashboard
- `/dashboard/[id]` - Dashboard builder/editor
- `/dashboard/[id]/preview` - Full-screen preview
- `/data` - Data sources management (CSV + integration tiles)
- `/templates` - Template gallery

---

## Components

### Layout
- `Navbar` - Logo, navigation, user menu
- `Sidebar` - Widget palette in builder
- `AuthGuard` - Protect routes

### Dashboard Builder
- `DashboardGrid` - Responsive grid with drag-and-drop
- `WidgetPalette` - Sidebar with draggable widget types
- `WidgetCard` - Container for any widget
- `WidgetConfigModal` - Configure widget data and appearance

### Widgets
- `KPIWidget` - Single big number with label
- `LineChartWidget` - Time series line chart
- `BarChartWidget` - Categorical bar chart
- `PieChartWidget` - Pie/donut chart
- `TableWidget` - Data table with sorting
- `ProgressWidget` - Progress bar with percentage

### Data
- `DataSourceList` - List of connected sources
- `CSVUploader` - File upload component
- `DataPreview` - Preview data in table
- `IntegrationGrid` - Grid of integration tiles (active + coming soon)
- `IntegrationTile` - Single integration with logo, status

### Templates
- `TemplateCard` - Template preview card
- `TemplateGallery` - Grid of templates

---

## Build Priority

1. Project setup + Prisma schema
2. Auth system (signup, login, session)
3. Dashboard CRUD
4. Widget system + 3 widget types
5. Drag-and-drop grid
6. CSV upload + data sources
7. Remaining 3 widget types
8. Templates
9. Share links
10. PDF export
11. Integration showcase (coming soon tiles)
12. Homepage + SEO
13. Final testing
