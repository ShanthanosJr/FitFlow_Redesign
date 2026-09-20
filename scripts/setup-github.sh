#!/usr/bin/env bash
# Creates the GitHub repository, makes the first commit and enables branch protection.
# Prerequisites: git, GitHub CLI (https://cli.github.com) and `gh auth login`.
# Usage: bash scripts/setup-github.sh [public|private]
set -euo pipefail

VISIBILITY="${1:-public}"   # branch protection on private repos needs a paid plan
REPO="fitflow-redesign"

git init -b main
git add .
git commit -m "docs: add project structure, tech stack, decision matrix, architecture and ADRs"

gh repo create "$REPO" "--$VISIBILITY" --source=. --remote=origin --push

OWNER="$(gh api user --jq .login)"

# Branch protection for main
gh api -X PUT "repos/$OWNER/$REPO/branches/main/protection" --input - <<'JSON'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON

echo "Repository: https://github.com/$OWNER/$REPO"
