#!/usr/bin/env node
/**
 * validate-blueprints.js
 *
 * Validates all blueprints/{id}/blueprint.json files against schema/blueprint-schema.json.
 * Exits non-zero if any blueprint fails validation.
 *
 * Usage: node scripts/validate-blueprints.js
 * Requires: npm install ajv (listed in package.json devDependencies)
 */

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ROOT = path.resolve(__dirname, "..");
const BLUEPRINTS_DIR = path.join(ROOT, "blueprints");
const SCHEMA_PATH = path.join(ROOT, "schema", "blueprint-schema.json");

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`ERROR: Cannot parse ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function main() {
  // Load schema
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error(`ERROR: Schema not found at ${SCHEMA_PATH}`);
    process.exit(1);
  }
  const schema = loadJson(SCHEMA_PATH);

  // Initialize AJV with draft-07 support
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  // Find blueprint directories
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
    console.warn("WARNING: No blueprint directories found. Nothing to validate.");
    process.exit(0);
  }

  let passed = 0;
  let failed = 0;

  console.log(`Validating ${blueprintDirs.length} blueprint(s) against schema...\n`);

  for (const dir of blueprintDirs) {
    const blueprintPath = path.join(BLUEPRINTS_DIR, dir, "blueprint.json");

    if (!fs.existsSync(blueprintPath)) {
      console.error(`  MISSING  blueprints/${dir}/blueprint.json`);
      failed++;
      continue;
    }

    const blueprint = loadJson(blueprintPath);
    const valid = validate(blueprint);

    if (valid) {
      // Also check that the id matches the directory name
      if (blueprint.id !== dir) {
        console.error(`  FAIL     blueprints/${dir}/blueprint.json`);
        console.error(`           → id "${blueprint.id}" does not match directory name "${dir}"`);
        failed++;
      } else {
        console.log(`  PASS     blueprints/${dir}/blueprint.json`);
        passed++;
      }
    } else {
      console.error(`  FAIL     blueprints/${dir}/blueprint.json`);
      for (const error of validate.errors) {
        const location = error.instancePath || "(root)";
        console.error(`           → ${location}: ${error.message}`);
        if (error.params && Object.keys(error.params).length > 0) {
          const params = Object.entries(error.params)
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .join(", ");
          console.error(`             (${params})`);
        }
      }
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed.`);

  if (failed > 0) {
    process.exit(1);
  }
}

main();
