#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_SRC="$REPO_DIR/skills/prompt-optimizer"
CMD_SRC="$REPO_DIR/commands"
HOOK_SRC="$REPO_DIR/hooks/prompt-optimizer-gate.mjs"

echo "Installing prompt-optimizer across local AI coding environments..."

# 1. Claude Code (~/.claude)
mkdir -p "$HOME/.claude/skills" "$HOME/.claude/commands" "$HOME/.claude/hooks"
rm -rf "$HOME/.claude/skills/prompt-optimizer"
cp -R "$SKILL_SRC" "$HOME/.claude/skills/prompt-optimizer"
cp "$CMD_SRC"/*.md "$HOME/.claude/commands/"
cp "$HOOK_SRC" "$HOME/.claude/hooks/prompt-optimizer-gate.mjs"
chmod +x "$HOME/.claude/hooks/prompt-optimizer-gate.mjs"
echo "  ✓ Claude Code (~/.claude/skills, commands, hooks)"

# 2. Cross-Agent Standard (~/.agents/skills — OpenCode, Codex, Cursor, Gemini CLI)
mkdir -p "$HOME/.agents/skills"
rm -rf "$HOME/.agents/skills/prompt-optimizer"
cp -R "$SKILL_SRC" "$HOME/.agents/skills/prompt-optimizer"
echo "  ✓ Universal Agent Skills (~/.agents/skills)"

# 3. OpenAI Codex (~/.codex/skills) if ~/.codex exists
if [ -d "$HOME/.codex" ]; then
  mkdir -p "$HOME/.codex/skills"
  rm -rf "$HOME/.codex/skills/prompt-optimizer"
  cp -R "$SKILL_SRC" "$HOME/.codex/skills/prompt-optimizer"
  echo "  ✓ OpenAI Codex (~/.codex/skills)"
fi

# 4. Antigravity / Gemini: both layouts are in use (~/.gemini/config/skills and ~/.gemini/skills)
for GEMINI_SKILLS in "$HOME/.gemini/config/skills" "$HOME/.gemini/skills"; do
  if [ -d "$(dirname "$GEMINI_SKILLS")" ] && { [ -d "$GEMINI_SKILLS" ] || [ "$GEMINI_SKILLS" = "$HOME/.gemini/config/skills" ]; }; then
    mkdir -p "$GEMINI_SKILLS"
    rm -rf "$GEMINI_SKILLS/prompt-optimizer"
    cp -R "$SKILL_SRC" "$GEMINI_SKILLS/prompt-optimizer"
    echo "  ✓ Antigravity / Gemini ($GEMINI_SKILLS)"
  fi
done

# 5. MLX-Serve (~/.mlx-serve/skills) if ~/.mlx-serve exists
if [ -d "$HOME/.mlx-serve" ]; then
  mkdir -p "$HOME/.mlx-serve/skills"
  rm -rf "$HOME/.mlx-serve/skills/prompt-optimizer"
  cp -R "$SKILL_SRC" "$HOME/.mlx-serve/skills/prompt-optimizer"
  echo "  ✓ MLX-Serve (~/.mlx-serve/skills)"
fi

# 6. Conflict Audit (detects rules that silently override the approval gate)
echo ""
echo "Running multi-IDE override conflict audit..."
CONFLICTS=0
# Every global instruction file the agents load: top-level files plus all *.md files under rules/
# at any depth (1.0.0 and 1.1.0 missed nested rule sets such as ~/.claude/rules/ecc/common/agents.md).
AUDIT_FILES=()
for FILE in "$HOME/.codex/AGENTS.md" "$HOME/.claude/CLAUDE.md" "$HOME/.gemini/GEMINI.md"; do
  [ -f "$FILE" ] && AUDIT_FILES+=("$FILE")
done
for RULES_DIR in "$HOME/.claude/rules" "$HOME/.codex/rules"; do
  if [ -d "$RULES_DIR" ]; then
    while IFS= read -r FILE; do AUDIT_FILES+=("$FILE"); done < <(find "$RULES_DIR" -type f -name '*.md')
  fi
done
for FILE in "${AUDIT_FILES[@]+"${AUDIT_FILES[@]}"}"; do
  MATCH=$(grep -nE "No user prompt needed|Use agents proactively without user prompt|Give complete working solutions" "$FILE" 2>/dev/null | head -1 | cut -d: -f1 || true)
  if [ -n "$MATCH" ]; then
    echo "  ! Warning: '$FILE' line $MATCH contains an autonomous execution directive ('No user prompt needed' / 'Give complete working solutions') that can override the prompt-optimizer approval gate."
    CONFLICTS=$((CONFLICTS + 1))
  fi
done

if [ "$CONFLICTS" -eq 0 ]; then
  echo "  ✓ Zero conflicting override rules detected."
fi

echo ""
echo "Done! Tip: Open a NEW session/thread in Claude Code or Codex so updated global instructions take effect."
