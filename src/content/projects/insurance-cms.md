---
title: "Insurance Content Management System"
hook: "Content platform for an insurance client, with natural-language database querying on top."
summary: "A content management platform for insurance agencies, centralizing internal documents of any format with in-browser preview, alongside employee administration, service-request tracking, natural-language data insights, and a customizable dashboard."
role: "Assistant Lead Software Engineer, Scrum Lead"
period: "2026"
order: 1
tech:
  - React
  - TypeScript
  - Express.js
  - PostgreSQL
  - Prisma ORM
  - Supabase
  - Auth0
  - OpenAI API
  - TailwindCSS
  - shadcn/ui
  - Vite
  - Agile
  - Jira
bullets:
  - "Built a natural-language to SQL insights feature over ten database tables, powered by the OpenAI API."
  - "Hardened the generated-SQL path with a read-only Postgres role, AST-level validation, and a constrained system prompt."
  - "Shipped a persistent customizable dashboard backed by a widget registry and drag-and-drop layout."
depth:
  - "Paired the NL-to-SQL pipeline with an input design that lets non-technical stakeholders query any part of their data — a table of content expiring soon, or which employees have overdue service requests. The system resolves natural-language assumptions and table joins across ten tables, so in-depth querying does not require a ticket to IT."
  - "Layered the defense on generated SQL: a read-only Postgres role, AST-level validation via node-sql-parser rejecting anything outside a SELECT allowlist, and a constrained system prompt with one-shot examples at low temperature."
  - "Made the dashboard fully customizable with a persistent drag-and-drop layout and an extensible widget registry, shipping with 14 curated widgets."
  - "Integrated Auth0's Management API so administrators provision and manage users from inside the app's own admin UI rather than the Auth0 dashboard, backed by JWT-verified route guards and role-based permissions."
media:
  - src: "../media/insights-multiturn.png"
    alt: "AI NL to SQL Insights"
    caption: "A follow-up question resolves against the previous turn — 'here' refers to the prior result set — and the renderer dispatches to a scorecard instead of a chart based on the shape the model returns."
  - src: "../media/insights-sql.png"
    alt: "Generated Insights SQL Query"
    caption: "Every result exposes the generated SQL. The query is validated against a read-only allowlist before it reaches the database"
  - src: "../media/dashboard-customized.png"
    alt: "Customizing Dashboard"
    caption: "Widgets are toggled and sized per employee; the layout is persisted as JSON on the employee record and restored on next load."
  - src: "../media/dashboard.png"
    alt: "Customized Dashboard & Dark Mode"
    caption: "The saved layout rendered — sortable, resizable widgets with the graphs in their selected sizes. The user has also opted for dark mode in this screenshot, found in settings."
  - src: "../media/employees.png"
    alt: "Employee Administration Page"
    caption: "Employee CRUD with Auth0 management API provisioning on create, and displays user-managed profile photos. Administrators have access to user actions to modify names and roles, and can delete employee records from the interface as well."
  - src: "../media/landing.png"
    alt: "Site Landing"
    caption: "Landing page, navigation, and hero. Unauthenticated users see the login gate; routes are protected by JWT."
links:
  repo: "https://github.com/schultzh06/insurance-cms-cs3733"
---

## Context

Built by a ten-person student team in Prof. Wong's CS3733 at WPI, in collaboration
with **The Hanover Insurance Group** (NYSE: THG), a publicly traded property and
casualty insurer headquartered in Worcester, MA. The project ran as a prototype
plus five iterations over a seven-week term, each with an associated class
presentation. The final iteration was presented to WPI administration and Hanover
executives — I was the lead presenter for our feature set, walking them through it
in person.

No Hanover proprietary data or documents appear in any screenshot or demo, in
accordance with WPI's Student Project IP policy and this project's client agreement.

## What it is

A content management and analytics platform for insurance agencies — a central
system for managing documents, links, employee records, and service requests,
with AI-assisted querying layered on top.

**Content management:** file or link-based content items with owner tracking,
tagging, status/type/persona classification, expiration dates, and a full
checkout/check-in locking system so two people can't overwrite the same edit.
Includes a recycle bin with restore, bulk upload, an inline file previewer
(PDF, DOCX, images, text), and a calendar view of upcoming expirations.

**Collections:** user-curated, ordered groupings of content items, public or
private, with favoriting and links to service requests.

**Service requests:** a lightweight ticketing layer that can be linked to
individual content items or whole collections, with assignees, deadlines, and
type classification.

**AI-powered Insights:** a chat interface where users ask questions about the
data in plain English (e.g. "what's expiring this week" or "which underwriter
has the most overdue requests") and get back a chart, table, or scorecard.
Under the hood: an LLM translates the question into SQL constrained by a
schema-aware system prompt, the generated query is validated against a
read-only allowlist before it ever touches the database, and it executes on a
separate read-only Postgres role — so the model never has write access,
regardless of what it generates.

**Global semantic search:** a single search bar that finds matches across
content, collections, employees, and service requests by meaning, not just
keyword, using OpenAI embeddings and pgvector similarity.

**Customizable dashboard:** a per-employee widget grid (charts, recent files,
quick links, assigned service requests, etc.) that's toggled, resized, and
reordered per user, with the layout persisted to their profile.

**Employee management:** admin CRUD for accounts, roles, and profile photos,
provisioned through Auth0 so admins never touch the Auth0 dashboard directly.

**Notifications:** a unified feed merging real content-change/ownership
events with dynamic expiration alerts, dismissible per item.