# NanoClaw Workshop

A curated catalog of **Blueprints** — reusable, parameterized agent workflow templates for [NanoClaw](https://github.com/davekim917/nanoclaw).

Browse the catalog, install a Blueprint with a single command, and have a fully automated workflow running in minutes.

---

## What Is a Blueprint?

A Blueprint is a packaged agent workflow. Each one defines:

- **What it does** — a clear description and use case
- **How it triggers** — on a cron schedule or on-demand
- **What it needs** — integrations like Gmail, GitHub, or Google Calendar
- **How to configure it** — typed parameters with sensible defaults
- **The agent prompt** — a Mustache-style template that NanoClaw fills in with your parameters at runtime

Blueprints live in the `blueprints/` directory. Each has a `blueprint.json` (machine-readable) and a `README.md` (human-readable).

---

## Catalog

| Blueprint | Trade | Trigger | Setup |
|-----------|-------|---------|-------|
| [Morning Kickstart](blueprints/morning-kickstart/) | Productivity | Scheduled | 2 min |
| [Inbox Zero Bot](blueprints/inbox-zero-bot/) | Email | Scheduled | 2 min |
| [Git Rescue](blueprints/git-rescue/) | Dev | On-demand | 1 min |
| [Code Reviewer](blueprints/code-reviewer/) | Dev | On-demand | 1 min |
| [Weekly Snippets](blueprints/weekly-snippets/) | Productivity | Scheduled | 3 min |

---

## Blueprint Schema

Every `blueprint.json` must conform to [`schema/blueprint-schema.json`](schema/blueprint-schema.json).

### Required Fields

```json
{
  "id": "kebab-case-id",
  "version": "1.0.0",
  "name": "Human-readable Name",
  "description": "One-paragraph description of what this blueprint does.",
  "trade": "productivity | dev | email | research | creative | ops",
  "trigger_type": "scheduled | on-demand",
  "estimated_setup_time": "N min",
  "author": "your-username",
  "verified": false,
  "tags": ["tag-one", "tag-two"],
  "integrations": ["tool-name"],
  "parameters": [ ... ],
  "prompt_template": "Mustache template with {{param_key}} substitution ..."
}
```

### Parameters

Each entry in `parameters` describes one configurable input:

```json
{
  "key": "param_name",
  "label": "Human Label",
  "description": "What this param controls.",
  "type": "text | cron | select | number | boolean",
  "options": ["only", "for", "select"],
  "default": "optional default value",
  "required": true
}
```

### Prompt Templates

Templates use Mustache-style syntax:

- `{{param_key}}` — substituted with the parameter value
- `{{#bool_key}}...{{/bool_key}}` — conditional block, rendered only when `bool_key` is truthy

**System variables** available in all templates:

| Variable | Description |
|----------|-------------|
| `{{group_name}}` | Name of the NanoClaw group running this blueprint |
| `{{group_folder}}` | Group's workspace folder path |
| `{{chat_channel}}` | Channel identifier (Discord, WhatsApp, Telegram, etc.) |
| `{{current_date}}` | Today's date (ISO format) |

---

## Contributing

### Adding a New Blueprint

1. **Create a directory** under `blueprints/` with your blueprint's kebab-case ID:
   ```
   blueprints/your-blueprint-id/
   ├── blueprint.json
   └── README.md
   ```

2. **Write `blueprint.json`** following the schema above. The `id` field must exactly match your directory name.

3. **Write `README.md`** explaining what the blueprint does, its parameters, example output, and required integrations.

4. **Validate locally:**
   ```bash
   npm install
   npm run validate
   ```

5. **Open a pull request.** CI will automatically validate your blueprint and regenerate `index.json` on merge.

### Guidelines

- `id` must be unique across the catalog and match the directory name exactly
- `prompt_template` should be a real, useful prompt — not placeholder text
- `verified` should be `false` for community contributions (the NanoClaw team sets this to `true` after review)
- Keep `description` to one paragraph — detail goes in the README
- Tags should be lowercase kebab-case

---

## Development

```bash
npm install

# Validate all blueprints against the schema
npm run validate

# Regenerate index.json from blueprint.json files
npm run build

# Validate then build
npm run validate:build
```

### index.json

The `index.json` file at the repo root is **auto-generated** by CI. Do not edit it manually — your changes will be overwritten. It is regenerated automatically whenever a `blueprints/**` file changes on `main`.

---

## License

MIT
