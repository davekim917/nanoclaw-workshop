# Code Reviewer

**Trade:** Dev | **Trigger:** On-demand | **Setup:** ~1 min

Get a thorough, structured code review for any GitHub pull request — bugs, security vulnerabilities, performance issues, and style feedback, organized by severity so you know exactly what must be fixed before merge.

## What It Does

Point Code Reviewer at a GitHub PR URL, and it:

1. Fetches the PR metadata and full diff via the `gh` CLI
2. Analyzes the changes across six dimensions: correctness, security, performance, error handling, test coverage, and readability
3. Produces a structured review with tiered severity (Must Fix / Should Fix / Suggestions)
4. Highlights what's done well (positive reinforcement matters)
5. Delivers a clear merge verdict

Optionally, you can specify focus areas like `"security, database queries"` to direct extra attention where it matters most.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pr_url` | text | **Yes** | Full GitHub PR URL, e.g. `https://github.com/owner/repo/pull/42` |
| `focus_areas` | text | No | Comma-separated focus areas, e.g. `"security, performance"` |

## Example Usage

**Trigger:** `@Axie code-reviewer https://github.com/myorg/api/pull/87 focus_areas="auth, error handling"`

**Example Output:**

> ## Code Review: Add OAuth2 token refresh logic
>
> ### Summary
> This PR adds token refresh handling to the auth middleware. The core logic is sound, but there's a race condition in concurrent refresh scenarios and a missing revocation path on logout.
>
> ### 🔴 Must Fix (2)
> - **middleware/auth.go:142** — Token refresh is not mutex-protected. Concurrent requests can trigger multiple simultaneous refreshes, causing token invalidation. Use `sync.Once` or a per-user mutex.
> - **handlers/logout.go:67** — Refresh token is not revoked on logout, leaving valid tokens dangling. Add a call to `oauth.RevokeToken()`.
>
> ### 🟡 Should Fix (1)
> - **middleware/auth.go:98** — Error from `refreshAccessToken()` is logged but not returned to the caller. The request proceeds with an expired token. Return the error.
>
> ### ✅ What's Good
> - Clean separation of concerns between token validation and refresh logic
> - Good use of context propagation throughout
>
> ### Verdict
> **Request Changes** — fix the race condition and token revocation before merge.

## Integrations Required

- **git** — Local git operations
- **gh** — GitHub CLI for fetching PR diffs and metadata

## Tips

- Use `focus_areas` when you want a security-focused review or when reviewing database-heavy changes
- Works best with GitHub PRs that have a clear description — the more context in the PR, the better the review
- For very large PRs (1000+ lines), consider breaking them up first
