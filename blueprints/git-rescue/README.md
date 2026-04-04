# Git Rescue

**Trade:** Dev | **Trigger:** On-demand | **Setup:** ~1 min

Diagnose and recover any troubled Git repository. Point it at a repo, and it figures out what went wrong and tells you exactly how to fix it — including a reflog-based recovery for "lost" commits.

## What It Does

Git Rescue runs a full diagnostic on a repository and identifies common failure modes:

- Merge conflicts blocking a commit
- Detached HEAD state
- Diverged branches (local vs. remote out of sync)
- Accidentally staged or committed files
- Lost commits (still recoverable via reflog)
- Corrupt index
- Wrong base branch after a bad rebase

It then provides step-by-step remediation commands, flagging any that are destructive or irreversible.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repo_path` | text | Yes | Absolute path to the repo, e.g. `/home/user/projects/myapp` |

## Example Usage

**Trigger:** `@Axie git-rescue /home/dave/projects/api`

**Example Output:**

> **Diagnosis: Detached HEAD + 3 uncommitted changes**
>
> Your HEAD is pointing directly to commit `a1b2c3d` rather than a branch. This happened when you ran `git checkout a1b2c3d` (or checked out a tag/remote ref directly).
>
> Your working tree also has 3 modified files that aren't staged.
>
> **Recovery plan:**
>
> 1. Save your uncommitted changes first:
>    ```bash
>    git stash push -m "rescue stash $(date +%Y%m%d)"
>    ```
> 2. Create a branch at your current position:
>    ```bash
>    git checkout -b rescue/detached-head
>    ```
> 3. Restore your changes:
>    ```bash
>    git stash pop
>    ```
> 4. Verify:
>    ```bash
>    git status && git log --oneline -5
>    ```

## Integrations Required

- **git** — Direct git CLI access to the repository

## Safety Notes

Git Rescue always prefers reversible operations. When a destructive command is unavoidable (e.g., `git reset --hard`, `git push --force`), it will:
1. Call it out explicitly
2. Explain what data will be lost
3. Ask for confirmation before proceeding
