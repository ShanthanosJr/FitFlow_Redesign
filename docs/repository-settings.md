# Repository Settings

## Branch protection for `main`

Settings > Branches > Add branch protection rule (or Settings > Rules > Rulesets) for `main`:

- Require a pull request before merging (1 approving review, dismiss stale approvals on new commits)
- Require status checks to pass before merging (add the CI jobs after they have run once)
- Require branches to be up to date before merging
- Require linear history
- Do not allow force pushes; do not allow deletions
- Optional: require conversation resolution before merging

`scripts/setup-github.sh` applies these through the GitHub CLI.

Note: branch protection on private repositories needs a paid GitHub plan. On the free plan, make the repository public or use a GitHub Education account.

## Other settings

- Default branch: `main`
- Enable Dependabot alerts and security updates
- Enable secret scanning (and push protection where available)
- Enable "Automatically delete head branches" after merge
