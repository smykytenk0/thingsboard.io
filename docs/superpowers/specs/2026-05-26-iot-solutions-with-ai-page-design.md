# Design: `/docs/iot-solutions-with-ai/` — "Build IoT solutions with AI"

**Date:** 2026-05-26
**Author:** brainstormed with Andrii Shvaika
**Status:** Approved for implementation planning

## Goal

Ship a new marketing-leaning doc landing page that explains ThingsBoard's full AI capability stack in four outcome-led sections, ranks for AI-IoT search intent, and routes readers to the underlying feature docs.

Reference page: `/docs/apis-and-sdks/` (same file-layout fan-out, same hero variant, similar information-density).

## Non-goals

- Not a tutorial. No step-by-step procedures.
- Not a feature reference. Each feature already has a dedicated doc; this page is a discovery surface, not a replacement.
- Not localized in this iteration. EN-only at launch (translations follow the normal Lunaria flow).

## URL & title

| Item | Value |
|---|---|
| Slug | `/docs/iot-solutions-with-ai/` (× 4 product variants) |
| Page title | **Build IoT solutions with AI** |
| Description / tagline | "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard." |
| Hero variant | `simple` (same as `/docs/apis-and-sdks/`) |
| TOC / prev / next | All disabled |

## Editions

Published for **CE, PE, PAAS (US), PAAS (EU)**. PE is the canonical variant (matches existing convention for multi-edition pages).

```
src/content/_includes/docs/iot-solutions-with-ai.mdx              ← shared include
src/content/docs/docs/iot-solutions-with-ai.mdx                   ← CE stub      → /docs/iot-solutions-with-ai/
src/content/docs/docs/pe/iot-solutions-with-ai.mdx                ← PE stub (canonical) → /docs/pe/iot-solutions-with-ai/
src/content/docs/docs/paas/iot-solutions-with-ai.mdx              ← PAAS US stub → /docs/paas/iot-solutions-with-ai/
src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx           ← PAAS EU stub → /docs/paas/eu/iot-solutions-with-ai/
```

Each stub is a thin wrapper:

```mdx
---
title: Build IoT solutions with AI
description: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
tableOfContents: false
editUrl: false
prev: false
next: false
hero:
  variant: simple
  title: Build IoT solutions with AI
  tagline: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
---
import IotSolutionsWithAi from '@includes/docs/iot-solutions-with-ai.mdx'
import { Products } from '~/models/site.models'

<IotSolutionsWithAi product={Products.CE}/>  {/* or PE / PAAS / PAAS_EU per stub */}
```

## Sidebar

A new **single-page** entry **"Build with AI"** sits between `Guides` and `Recipes` in every CE / PE / PAAS sidebar. `astro.sidebar.ts` has three insertion points:

| Insertion point | Covers |
|---|---|
| `mainSidebarItems(...)` helper (line ~1585) | CE (`opensourceSidebar`) **and** PE (`peSidebar`) — both invoke the same helper |
| `paasSidebar` array (line ~1722) | PAAS US |
| `paasEuSidebar` array (line ~2065) | PAAS EU |

In each location, insert between the `Guides` and `Recipes` block:

```ts
{
  label: 'Build with AI',
  link: `${prefix}/iot-solutions-with-ai`,
},
```

(`prefix` is in scope inside `mainSidebarItems`; the PAAS arrays use the literal prefix `docs/paas` / `docs/paas/eu` per their existing convention — match what the surrounding entries do.)

`translations` entry stays empty for now; Lunaria adds it via the normal i18n flow.

## Content structure

One include file containing four `## H2` outcome sections, each with one or two cards.

### Page intro (one paragraph, before the first H2)

> ThingsBoard ships with a complete AI stack for IoT — built into the platform, exposed through tooling, and ready to plug into your favourite AI agents. Whether you're scaffolding a new solution from a one-line description, running anomaly detection on live telemetry, or letting Claude or n8n drive ThingsBoard for you, the sections below cover what you can do today.

### Section 1 — Build IoT solutions with AI coding agents

**Why this is section 1:** CLI + Claude Code is the flagship differentiator. Broader edition coverage than AI Solution Creator (PE + Cloud vs. Cloud-only) and stronger marketing position ("agentic IoT development"). Full-width single card.

| Field | Content |
|---|---|
| Card title | **ThingsBoard CLI + Claude Code** |
| Edition badge | `Professional · Cloud` |
| Body teaser (2–3 sentences) | Scaffold an entire IoT solution as code with one `tb init`, then let your AI coding agent — **Claude Code, Codex, Cursor**, or any other — design the entity model, dashboards, alarm rules, and calculated fields for you. **Commit the generated solution to git** like any other codebase, and roll the **same solution** out to your **dev, QA, and production** ThingsBoard instances with `tb push --profile <env>` — no clicking through the UI in each environment. Drive it yourself from the terminal for scripting and CI, or hand the wheel to your agent. |
| Link | `<DocLink path='user-guide/cli'>Learn more about ThingsBoard CLI</DocLink>` |

### Section 2 — Build IoT solutions with AI inside the platform

Two-card grid.

| Card | Edition badge | Body teaser | Link |
|---|---|---|---|
| **AI Solution Creator** | `Cloud` | Describe your use case in plain English — *"Track temperature in cold storage facilities and alert on spoilage"* — and the in-platform wizard designs entity profiles, alarm rules, calculated fields, roles, and dashboards for you, then deploys them straight to your tenant. | `user-guide/ai-solution-creator` |
| **AI Assistant** *(TODO doc)* | `Professional · Cloud` | Edit calculated fields and alarm rules in natural language, and generate ready-to-use dashboards for any device or asset in one click — directly inside the ThingsBoard UI. | `user-guide/ai-assistant` (placeholder slug; doc to be written separately) |

### Section 3 — Process IoT data with AI models

Two-card grid.

| Card | Edition badge | Body teaser | Link |
|---|---|---|---|
| **AI Models** | *(none — all editions)* | Plug **OpenAI, Google Gemini, Anthropic, Azure OpenAI, Amazon Bedrock**, or any OpenAI-compatible provider into your tenant. Predict future values, detect anomalies, classify device states, or generate natural-language insights from live telemetry — invoked from any rule chain via the **AI request rule node**. | `user-guide/ai-models` |
| **Local AI with Ollama** | *(none — all editions)* | Run inference on-premise with self-hosted Ollama models — keep sensitive telemetry inside your perimeter and avoid per-token costs. | `user-guide/local-ai-ollama` |

### Section 4 — Connect ThingsBoard to AI agents & automation

Two-card grid.

| Card | Edition badge | Body teaser | Link |
|---|---|---|---|
| **MCP Server** | *(none — all editions)* | Expose your ThingsBoard tenant as a **Model Context Protocol** server. Talk to your devices, telemetry, alarms, and entity relations from **Claude Desktop, Claude Code, Cursor, VS Code Copilot**, or any MCP-compatible client — no REST calls or dashboard clicks required. | `user-guide/mcp-server` |
| **n8n node** | *(none — all editions)* | Drive ThingsBoard from **n8n** workflows — connect to AWS S3, Snowflake, Salesforce, Jira, AI agents, and hundreds of other services. Build IoT automation that reaches far beyond the rule engine. | `user-guide/n8n-node` |

## Components & patterns

### Card layout

Use `<CardGrid>` (from `@astrojs/starlight/components`) + `<Card>` (from `~/components/Landing/Card.astro`) — **not** `<ListCard>`.

Rationale: this page is a marketing landing, not a reference index. Each card needs 2–3 lines of outcome prose, not a bare link list. `<ListCard>` is the right choice for `/docs/apis-and-sdks/`, but it strips prose styling.

Per-section pattern:

```mdx
## Build IoT solutions with AI coding agents

<CardGrid>
  <Card title='ThingsBoard CLI + Claude Code' icon='terminal'>
    <PE/><Cloud/>

    Scaffold an entire IoT solution as code with one `tb init`, then let your AI coding agent — **Claude Code, Codex, Cursor**, or any other — design the entity model, dashboards, alarm rules, and calculated fields for you. **Commit the generated solution to git** like any other codebase, and roll the **same solution** out to **dev, QA, and production** ThingsBoard instances with `tb push --profile <env>` — no clicking through the UI in each environment.

    <DocLink product={props.product} path='user-guide/cli' bold={false}>Learn more about ThingsBoard CLI →</DocLink>
  </Card>
</CardGrid>
```

Section 1 has one card (renders full-width in `<CardGrid>`); sections 2–4 each have two cards (auto two-column).

### Edition badge pills

Defined inline at the top of the include, following the existing pattern in `connectivity-guide.mdx` (recorded in memory):

```mdx
export const CE = () => <span style="background:#22c55e;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Community</span>;
export const PE = () => <span style="background:#3b82f6;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Professional</span>;
export const Cloud = () => <span style="background:#a855f7;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Cloud</span>;
```

**Display rule:** show badges only when a feature is **not** available on every edition. "All editions" is the implicit default — no badge clutter on AI Models, Local AI, MCP, n8n.

Concretely:

| Card | Badge(s) |
|---|---|
| ThingsBoard CLI + Claude Code | `<PE/><Cloud/>` |
| AI Solution Creator | `<Cloud/>` |
| AI Assistant | `<PE/><Cloud/>` |
| AI Models | *(none)* |
| Local AI with Ollama | *(none)* |
| MCP Server | *(none)* |
| n8n node | *(none)* |

The Cloud badge color (`#a855f7` purple) is a proposal; final shade can be tuned in implementation to match the platform's Cloud-banner accent without changing the badge contract.

### Links

All internal links use `<DocLink product={props.product} path='...'>` — never bare markdown links. This routes readers on `/docs/pe/iot-solutions-with-ai/` to PE-prefixed targets, Cloud readers to Cloud-prefixed targets, etc.

The AI Assistant link uses `path='user-guide/ai-assistant'` (placeholder slug). The page will 404 until the AI Assistant doc is written. We accept this temporary 404 because:

1. It's a single link on a single page (low risk).
2. The placeholder is highly visible during review, so the real doc won't be forgotten.
3. Alternative ("hide the card until the doc ships") would force a content omission the user explicitly does not want.

If a 404 is unacceptable at launch, a one-line stub at `_includes/docs/user-guide/ai-assistant.mdx` + the four product stubs can be added in the same PR with placeholder copy. Implementation plan should make this a separate explicit task.

### SEO surface

Title, H2s, intro paragraph, and card body copy together cover the following keyword clusters:

- *build IoT with AI*, *AI IoT platform*, *IoT solutions with AI*
- *AI coding agents*, *agentic AI IoT*, *Claude Code IoT*, *Codex CLI IoT*, *Cursor IoT*
- *MCP IoT*, *Model Context Protocol IoT*
- *IoT anomaly detection AI*, *IoT predictive maintenance AI*
- *n8n IoT*, *Ollama IoT*, *AI rule engine*
- *solutions as code IoT*, *IoT infrastructure as code*

Page-level `description` frontmatter feeds the `<meta name="description">` and the OG-card eyebrow/meta line, so it doubles as the SERP snippet and the social preview.

## OG image

Page lives outside `MARKETING_ALLOWLIST` by default, so it falls back to the generic `/thingsboard-og.png`. **Recommendation:** add the four published slugs (CE / PE / PAAS / PAAS EU) to `MARKETING_ALLOWLIST` in `src/util/ogContext.ts` so the page gets a per-route OG card matching its eyebrow. Low effort, high marketing payoff for shared links.

## Out of scope

- AI Assistant feature doc (`user-guide/ai-assistant`). Separate work.
- Translation. EN-only at launch; Lunaria will pick it up for translation queues automatically.
- Custom hero illustration. Reuse the `simple` hero variant — no asset work.
- New CardGrid / Card components. Reuse existing.
- New sidebar tab / restructuring. Just one new entry inserted in the existing main sidebar.

## File changes summary

| File | Change |
|---|---|
| `src/content/_includes/docs/iot-solutions-with-ai.mdx` | **NEW** — shared include with intro + 4 H2 sections + cards |
| `src/content/docs/docs/iot-solutions-with-ai.mdx` | **NEW** — CE stub |
| `src/content/docs/docs/pe/iot-solutions-with-ai.mdx` | **NEW** — PE stub (canonical) |
| `src/content/docs/docs/paas/iot-solutions-with-ai.mdx` | **NEW** — PAAS US stub |
| `src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx` | **NEW** — PAAS EU stub |
| `astro.sidebar.ts` | **MOD** — insert single-page `Build with AI` entry between Guides and Recipes in three places: `mainSidebarItems(...)` helper (covers CE + PE), `paasSidebar` array (PAAS US), `paasEuSidebar` array (PAAS EU) |
| `src/util/ogContext.ts` *(optional)* | **MOD** — add the four slugs to `MARKETING_ALLOWLIST` for per-route OG cards |

No redirects required (new URLs, no existing pages renamed).

## Verification

- `pnpm check` — Astro / TS type check.
- `pnpm lint:eslint`.
- Local dev (`pnpm dev`) — visit all four URLs, verify:
  - Hero renders with `variant: simple`.
  - `Build with AI` appears in the sidebar between Guides and Recipes.
  - All `DocLink`s resolve to the correct product prefix per edition.
  - Edition badges render (CLI shows PE + Cloud; AI Solution Creator shows Cloud only; AI Assistant shows PE + Cloud).
  - `AI Assistant` link 404s with a clear message (expected until the dedicated doc lands).
- Before merge: ask user to run `pnpm build:fast` for verification (per CLAUDE.md build policy).
- Before merge: `pnpm lint:linkcheck` once, accepting the `user-guide/ai-assistant` 404 as documented.

## Open follow-ups (post-launch)

1. Write the AI Assistant feature doc and remove the TODO marker from this page.
2. Translate to the 13 non-EN locales via the standard Lunaria flow.
3. Consider adding `Build with AI` to top-level marketing nav (outside `/docs/`) if/when ready.
