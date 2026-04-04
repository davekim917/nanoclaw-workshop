# Morning Kickstart

**Trade:** Productivity | **Trigger:** Scheduled | **Setup:** ~2 min

Start every workday with a personalized briefing that combines your calendar, weather, and smart priority guidance — delivered automatically at a time you choose.

## What It Does

Each morning (by default, 8 AM on weekdays) this blueprint:

1. Fetches your Google Calendar events for the day
2. Identifies focus windows between meetings
3. Optionally pulls the local weather forecast
4. Suggests quick wins to build early momentum

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `schedule` | cron | `0 8 * * 1-5` | When to run (weekdays at 8 AM) |
| `timezone` | select | `America/New_York` | Your local timezone |
| `include_weather` | boolean | `true` | Fetch weather forecast |

## Example Output

> **Good morning!** Here's your briefing for Tuesday, April 4.
>
> **Today's Calendar**
> - 9:00 AM — Team standup (30 min, Google Meet)
> - 11:00 AM — Product review with Design (1 hr)
> - 2:30 PM — 1:1 with Sarah
>
> **Focus Windows**
> - 8:00–9:00 AM (1 hr) — Pre-standup deep work
> - 9:30–11:00 AM (90 min) — Best block of the day
> - 3:30–5:00 PM (90 min) — Afternoon wrap-up
>
> **Weather:** 62°F / 45°F, partly cloudy, 10% rain chance.
>
> **Quick wins:** Reply to the two emails flagged from yesterday. Review the open PR in your queue.
>
> Make today count. 🚀

## Integrations Required

- **gws-calendar** — Google Calendar access
- **web-search** — Weather forecast lookup (only if `include_weather` is enabled)

## Tips

- Adjust the cron schedule for your actual start time
- Disable weather if you're in a consistent climate or don't need it
- Pair with `inbox-zero-bot` for a full morning routine
