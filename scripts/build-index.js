#!/usr/bin/env node
/**
 * build-index.js
 *
 * Reads all blueprints/{id}/blueprint.json files and writes index.json with
 * summary metadata (strips `parameters` and `prompt_template`).
 *
 * Usage: node scripts/build-index.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BLUEPRINTS_DIR = path.join(ROOT, "blueprints");
const INDEX_PATH = path.join(ROOT, "index.json");

// Fields to exclude from the index (full details stay in blueprint.json)
const EXCLUDED_FIELDS = new Set(["parameters", "prompt_template"]);

function main() {
  if (!fs.existsSync(BLUEPRINTS_DIR)) {
    console.error(`ERROR: blueprints/ directory not found at ${BLUEPRINTS_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(BLUEPRINTS_DIR, { withFileTypes: true });
  const blueprintDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  if (blueprintDirs.length === 0) {
    console.warn("WARNING: No blueprint directories found.");
  }

  const summaries = [];

  for (const dir of blueprintDirs) {
    const blueprintPath = path.join(BLUEPRINTS_DIR, dir, "blueprint.json");

    if (!fs.existsSync(blueprintPath)) {
      console.warn(`WARNING: No blueprint.json found in blueprints/${dir}/ — skipping`);
      continue;
    }

    let blueprint;
    try {
      const raw = fs.readFileSync(blueprintPath, "utf8");
      blueprint = JSON.parse(raw);
    } catch (err) {
      console.error(`ERROR: Failed to parse ${blueprintPath}: ${err.message}`);
      process.exit(1);
    }

    // Validate that the id matches the directory name
    if (blueprint.id !== dir) {
      console.error(
        `ERROR: blueprint.id "${blueprint.id}" does not match directory name "${dir}" in ${blueprintPath}`
      );
      process.exit(1);
    }

    // Build summary object (omit excluded fields)
    const summary = {};
    for (const [key, value] of Object.entries(blueprint)) {
      if (!EXCLUDED_FIELDS.has(key)) {
        summary[key] = value;
      }
    }

    summaries.push(summary);
    console.log(`  ✓ ${dir} (v${blueprint.version})`);
  }

  const index = {
    schema_version: "1",
    generated_at: new Date().toISOString(),
    blueprints: summaries,
  };

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`\nWrote index.json with ${summaries.length} blueprint(s).`);
}

main();
