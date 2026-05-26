#!/bin/bash
set -euo pipefail

# Install npm dependencies — remote (cloud) sessions only.
# Redirect install output to stderr so it doesn't pollute the context
# that Claude reads from stdout.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  cd "$CLAUDE_PROJECT_DIR"
  npm install --no-audit --no-fund 1>&2
fi

# Inject project-level context for every session. Anything printed to
# stdout here is appended to the conversation as system context before
# the first prompt — see https://code.claude.com/docs/en/hooks.
cat <<'EOF'
[Project context — wedding website]
For any UI, layout, styling, or visual-design work, ALWAYS read
.agents/skills/frontend-design/SKILL.md before writing code. The skill
encodes the visual-quality bar for this project (bold aesthetic
direction, intentional typography, avoidance of generic AI defaults).

When relevant, pair it with:
- .agents/skills/web-design-guidelines/SKILL.md — accessibility & UX correctness
- .agents/skills/vercel-composition-patterns/SKILL.md — React component design
- .agents/skills/vercel-react-best-practices/SKILL.md — performance patterns
- .agents/skills/theme-factory/SKILL.md — when exploring theme variants
EOF
