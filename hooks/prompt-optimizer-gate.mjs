#!/usr/bin/env node
/**
 * Claude Code `UserPromptSubmit` hook for `prompt-optimizer`.
 * Injects a lightweight pre-execution reminder so Claude Code reliably shows
 * the Gear 1 (`/small`) or Gear 2 (`<details>`) approval card before editing files,
 * while staying completely silent on read-only questions, approvals, and pre-compiled XML contracts.
 *
 * Fail-open by design: always exits 0 so it never blocks a session on unexpected input.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

try {
  const raw = fs.readFileSync(0, 'utf8').trim();
  if (!raw) process.exit(0);

  const payload = JSON.parse(raw);
  const prompt = String(payload.prompt ?? payload.user_prompt ?? '').trim();
  if (!prompt) process.exit(0);

  const skillPath = path.join(os.homedir(), '.claude', 'skills', 'prompt-optimizer', 'SKILL.md');

  // 1. Gear 0 Bypass: Short approval / continuation replies
  if (
    prompt.length <= 60 &&
    /^(ok|okay|yes|yep|go|go ahead|proceed|apply|evet|onay|onayl[ıi]yorum|tamam|devam|uygula|yap|olur)[.!?\s]*$/i.test(prompt)
  ) {
    process.exit(0);
  }

  // 2. Gear 0 Bypass: Pre-compiled XML execution contracts
  if (prompt.includes('<documents>') && prompt.includes('<task>')) {
    process.exit(0);
  }

  // 3. Gear 1: Explicit `/small` surgical micro-mode
  if (/^\/small\b/i.test(prompt)) {
    process.stdout.write(
      `[prompt-optimizer · Gear 1 (/small)] Read ${skillPath} if not yet loaded in this session. ` +
        `Inspect the target file silently, ask ZERO questions, render the 3-line Surgical Mode card with <details>, ` +
        `and WAIT for user confirmation before calling Edit, Write, MultiEdit, or mutating Bash.\n`
    );
    process.exit(0);
  }

  // 4. Explicit `/prompt-optimize` or `/promptla`
  if (/^\/(prompt-optimize|promptla)\b/i.test(prompt)) {
    process.stdout.write(
      `[prompt-optimizer · Gear 2] Read ${skillPath} and its matching model reference file. ` +
        `Perform silent repo recon, ask at most ONE plain question only if critically ambiguous (otherwise zero), ` +
        `render the <details> Execution Contract card, and WAIT for user approval before modifying any files.\n`
    );
    process.exit(0);
  }

  // 5. Gear 0 Bypass: Other slash commands (e.g. /compact, /cost-report, /review)
  if (prompt.startsWith('/')) {
    process.exit(0);
  }

  // 6. Gear 0 Bypass: Pure read-only / diagnostic questions without mutation intent
  const hasMutationIntent =
    /\b(ekle|oluştur|yaz|düzenle|değiştir|güncelle|sil|kaldır|taşı|düzelt|kur|uygula|entegre|refactor|implement|create|add|build|write|edit|update|fix|remove|delete|migrate|install|push|commit)\b/i.test(
      prompt
    );
  if (!hasMutationIntent && (prompt.endsWith('?') || /\b(nedir|nasıl|neden|niye|nerede|var mı|emin misin|what|why|how|where|status)\b/i.test(prompt))) {
    process.exit(0);
  }

  if (hasMutationIntent) {
    process.stdout.write(
      `[prompt-optimizer · Auto Gate] Before calling Edit, Write, MultiEdit, or mutating Bash on this request, ` +
        `follow ${skillPath} (Gear 2): perform silent recon, ask at most 1 plain question ONLY if a critical decision is missing ` +
        `(0 questions if clear), present the collapsible <details> Execution Contract card in the user's language, and pause for approval.\n`
    );
  }
} catch {
  // Fail open silently
}
process.exit(0);
