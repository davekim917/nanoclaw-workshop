# Inbox Zero Bot

**Trade:** Email | **Trigger:** Scheduled | **Setup:** ~2 min

Stop reading every email to figure out which ones matter. Inbox Zero Bot scans your Gmail inbox each morning, categorizes every unread message by urgency, and delivers a structured triage report so you know exactly where to focus.

## What It Does

Each morning (by default, 9 AM on weekdays) this blueprint:

1. Reads the most recent unread emails in your Gmail inbox (up to your configured limit)
2. Categorizes each email:
   - **Action Required** — needs a reply, decision, or task
   - **FYI / Review** — informational, no action today
   - **Newsletter / Digest** — subscription content
   - **Junk / Auto** — automated or marketing emails
3. Produces a grouped summary with suggested actions for high-priority items
4. Highlights anything time-sensitive (deadlines, meeting requests)

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `schedule` | cron | No | `0 9 * * 1-5` | Run time (weekdays at 9 AM) |
| `account` | text | **Yes** | — | Gmail address to triage |
| `max_emails` | number | No | `20` | Max emails to process per run |

## Example Output

> **📬 INBOX TRIAGE — Tue Apr 4 (14 unread)**
>
> **🔴 Action Required (3)**
> - Sarah Chen — "Budget approval needed by Friday" — Waiting on your sign-off for Q2 budget. **Reply to approve or flag questions.**
> - GitHub — "Your PR has merge conflicts" — PR #142 needs conflict resolution before it can merge. **Fix and re-push.**
> - Loom — "Dave shared a video with you" — New screen recording from your designer, likely needs feedback. **Watch and respond.**
>
> **🟡 FYI / Review (4)**
> - Figma — "New comment on Homepage redesign"
> - Linear — "Sprint 14 is starting Monday"
> - ...
>
> **📋 Newsletters (5)**
> — TLDR, Hacker Newsletter, Morning Brew, ...
>
> **🗑️ Junk (2)** — 2 automated emails, safe to archive.
>
> **Bottom line:** 3 emails need attention today. Budget approval is the most time-sensitive — deadline Friday.

## Integrations Required

- **gws-gmail** — Gmail read access (read-only, no emails are sent or modified)

## Tips

- Set `max_emails` higher (e.g., 50) after a long weekend
- Pair with `morning-kickstart` to get inbox triage alongside your calendar briefing
- The bot is read-only — it will never send, archive, or delete emails
