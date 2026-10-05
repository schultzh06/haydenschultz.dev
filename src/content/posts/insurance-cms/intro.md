---
project: insurance-cms
title: Introducing the Insurance CMS
description: A content management platform built by a ten-person team with The Hanover Insurance Group, with natural-language data querying on top.
published: 2026-10-05
tags: [react, typescript, postgres, team]
---

## The context

This project came out of CS3733 at WPI, where a ten-person student team built a
content management platform in collaboration with **The Hanover Insurance Group**.
We worked through a prototype and five iterations over a seven-week term, and the
final version was presented to WPI administration and Hanover executives. I was
the assistant lead software engineer and scrum lead, and I presented our feature
set in person.

## What it is

The platform is a central home for an insurance agency's internal content:
documents and links with ownership, tagging, expiration dates, and check-out
locking so two people can't overwrite the same edit. Around that core sit
collections, lightweight service-request tracking, employee administration, and a
per-user customizable dashboard.

## The part I focused on

My main feature was **Insights**: a chat interface where someone can ask a question
in plain English, like "what's expiring this week?", and get back a chart, table, or
scorecard. An LLM translates the question into SQL across ten tables.

Letting a model write SQL against a real database means assuming it will
eventually generate something it shouldn't. So the generated query is validated
against a read-only allowlist before it runs, and it executes on a separate
read-only Postgres role. Whatever the model produces, it has no way to write.

## Working as a team

Beyond the code, I was the team's scrum lead: running iterations in Jira, keeping
ten people's work integrated, and getting a presentable build ready for each
iteration's class presentation.

The [project page](/projects/insurance-cms) has screenshots and more detail on each
feature.
