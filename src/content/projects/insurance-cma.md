---
title: "Insurance Content Management Application"
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
links:
  repo: "https://github.com/schultzh06/insurance-cma-cs3733"
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