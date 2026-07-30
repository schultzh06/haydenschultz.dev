<!-- Brainstorming for content on the portfolio site -->

# Insurance Content Management Application

**Summary:** A content management platform for insurance agencies, centralizing internal documents of any format — office files, PDFs, media — with in-browser preview, alongside employee administration and service-request tracking, plus AI-powered NL-to-SQL data insights and a customizable dashboard.

This project was created by a 10 person student-team (Team B) in Prof. Wong's CS3733 at WPI, and was a project designed in collaboration with **The Hanover Insurance Group** (NYSE: THG), a publicly traded property and casualty insurer headquartered in Worcester, MA. The project was split into 5 iterations and a prototype over the course of one 7-week term, with each having a class presentation associated and with the final iteration being attended by WPI administration personnel and Hanover Insurance executives.

*NOTE: No Hanover Insurance proprietary data or documents appear in any screenshots or demos, in accordance with WPI's Student Project IP policy and this project's client agreement.*

**Role: Assistant Lead Software Engineer & Scrum Lead**

Short:

* Extensive Natural Language -> SQL insights feature for database queries, powered by OpenAI API
* Layered defense on the generated-SQL path: read-only Postgres role, AST-level validation via `node-sql-parser`, and a constrained system prompt
* Customizable persistent dashboard, with widget registry and drag-and-drop layout

Depth:

* Extensive Natural Language -> SQL insights feature powered by OpenAI API, paired with a front end input design that gives non-technical stakeholders full range to query any aspect of their data — whether it be a table of content expiring soon or which employees have overdue service requests. Across 10 of the database's tables, the system handles natural language assumptions, table joins, and more, making in-depth database querying accessible to even the non-tech-savvy user, forgoing a ticket to IT.
* Hardened the generated-SQL path with a multi-layered defense: a read-only Postgres role, AST-level validation via `node-sql-parser` to reject anything outside a SELECT allowlist, and a constrained system prompt with one-shot examples at low temperature.
* Implemented a fully customizable dashboard with a persistent drag-and-drop layout, and an extensible widget registry, shipping with 14 curated widgets.
* Integrated Auth0's Management API to provision and manage users from inside the app's own admin UI, so administrators never touch the Auth0 dashboard. Backed by JWT-verified route guards and role-based permissions.
* Was the lead presenter for our unique features to Hanover executives, walking them through our features in person.

## Tech Stack
**Technologies:** `PostgreSQL` `Express.js` `React` `Node.js` `Supabase` `Auth0` `shadcn/ui` `Prisma ORM` `TailwindCSS` `OpenAI API` `TypeScript/TSX` `Vite`\
**Workflow:** `Agile Methodology` `Daily Standup/Scrum` `UML` `ERD` 

## Media
TODO -- essentially an informative screenshot of a few essential features, as well as one of the landing page, with captions

## Learn More
[**insurance-cma-cs3733 Github Repository**](https://github.com/schultzh06/insurance-cma-cs3733) — A fork of the original project repository I made for clean up purposes, peer-reviewed by my development team after the fact.

# Subpixel

**Summary:** Python CLI that encrypts a message using AES-256-GCM and Argon2id key derivation, and embeds it in an image's least-significant bits, where it can be symmetrically extracted by a recipient with the right password.

**Why I Built This:** Beginning as an idea to brush up on my Python since I hadn't built anything with it in a while, this project took its direction with inspiration from a lot of Cybersecurity related work (my municipal government IT Internship) and personal endeavors having to do with encryption methods, key derivation, and brute force attack defenses. I took this opportunity to let encryption be something I can implement hands on rather than read about and research, and bundled it with LSB-Steganography as it was another interesting topic I stumbled upon that piqued my interest.

**Limitations:** LSB requires a lossless container, so this CLI is for PNG only. Lossy file types like JPEG would completely ruin the message, which has to be read exactly the way it was embedded. Message capacity is also limited to 3 bits/pixel, so a 1920x1080 PNG can carry around 750 KB. LSB embedding is also statistically detectable (chi-square and RS analysis will flag a modified image) so this is a demonstration of the technique, not a covert channel.

* Encrypts with AES-256-GCM under a key derived via Argon2id (m=64 MiB, t=3, p=4): a 16-byte random salt per message so identical passwords derive distinct keys and precomputation doesn't apply, a 12-byte random nonce so no key/nonce pair repeats, and GCM's 16-byte tag so decryption fails loudly on tampering rather than returning garbage.
* Program structures embedded blob bytes as follows: 
```
┌──────────┬──────────┬───────────┬──────────────┬──────────┐
│  length  │   salt   │   nonce   │  ciphertext  │   tag    │
│  4 bytes │ 16 bytes │  12 bytes │   N bytes    │ 16 bytes │
└──────────┴──────────┴───────────┴──────────────┴──────────┘
```
* Polished CLI experience with argument parsing, proper error handling & feedback, and implemented thorough pytests to ensure nothing is broken between versions.

## Tech Stack
`Python` `cryptography` `Pillow` `argparse` `pytest`\
`AES-256-GCM` `Argon2id` `LSB Steganography` 

## Media
TODO: Asciinema cast

## Learn More
[**subpixel Github Repository**](https://github.com/schultzh06/subpixel) — Repository containing the source code and release points of subpixel.