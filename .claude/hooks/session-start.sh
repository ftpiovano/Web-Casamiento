#!/bin/bash
set -euo pipefail

# Only run in the Claude Code web/remote environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install npm dependencies (idempotent — cached layer on repeated sessions).
npm install --no-audit --no-fund
