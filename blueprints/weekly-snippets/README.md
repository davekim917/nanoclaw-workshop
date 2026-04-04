# Weekly Snippets

**Trade:** Productivity | **Trigger:** Scheduled | **Setup:** ~3 min

Automatically compile your weekly activity report every Friday afternoon. Gathers git commits and completed tasks from the week, then synthesizes a tight "snippets" summary — ready for standup notes, team wikis, or personal reflection.

## What It Does

Every Friday at 5 PM (configurable), this blueprint:

1. Optionally scans git repositories for commits made during the week
2. Optionally pulls completed tasks from your NanoClaw backlog
3. Synthesizes a structured weekly snippets report covering: shipped work, progress, task closures, blockers, and next-week priorities

The format is designed to be fast to read (under 3 minutes) and easy to paste into Notion, Confluence, or a team standup.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `schedule` | cron | No | `0 17 * * 5` | Run time (Fridays at 5 PM) |
| `include_commits` | boolean | No | `true` | Include git commit summary |
| `include_tasks` | boolean | No | `true` | Include completed backlog items |

## Example Output

> **📋 WEEKLY SNIPPETS — Week of Mar 31 – Apr 4**
>
> **🚢 Shipped**
> - Launched OAuth2 token refresh with race-condition protection (api#87, #89)
> - Deployed Workshop blueprint catalog scaffolding to nanoclaw-workshop repo
> - Fixed inbox-zero-bot false positives on automated GitHub notifications
>
> **📝 Progress**
> - Code reviewer blueprint — prompt refinement in progress, 80% done
> - Q2 roadmap draft circulated to team, awaiting two responses
>
> **✅ Tasks Closed**
> - Resolve merge conflict in auth middleware
> - Add sender allowlist docs to CLAUDE.md
> - Respond to Dave's Loom on homepage redesign
>
> **⚠️ Blockers / Carry-overs**
> - Budget approval still pending — following up Monday morning
>
> **📌 Next Week**
> 1. Ship Workshop CI pipeline
> 2. Finish Q2 roadmap with team feedback incorporated
> 3. Start auth migration to new token store

## Integrations Required

- **git** — Git commit history scanning
- **web-search** — Used when additional context lookup is needed for task summaries

## Tips

- Run it on Thursday EOD if your team's standup is early Friday
- Adjust `schedule` to match your timezone (default assumes server time)
- Disable `include_commits` if you don't use git (or keep work in a separate org)
- Pair with `morning-kickstart` on Monday to use last week's "Next Week" list as your weekly plan
