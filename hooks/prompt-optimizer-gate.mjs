#!/usr/bin/env node
/**
 * Claude Code `UserPromptSubmit` hook for `prompt-optimizer`.
 * Injects a lightweight pre-execution reminder so Claude Code reliably shows
 * the Gear 1 (`/small`) or Gear 2 (`<details>`) approval card before editing files,
 * while staying silent on read-only questions, approvals, git follow-ups and pre-compiled XML contracts.
 *
 * Fail-open by design: always exits 0 so it never blocks a session on unexpected input.
 * The decision logic lives in `classifyPrompt` so it can be unit-tested (see prompt-optimizer-gate.test.mjs).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Approval replies may carry a short tail ("Evet, güncelle", "ok go ahead"); 80 chars keeps real requests out. */
export const APPROVAL_MAX_LENGTH = 80;
/** "Commit ve push et" acts on work the user already approved; longer messages are treated as new requests. */
export const GIT_FOLLOW_UP_MAX_LENGTH = 60;

const APPROVAL_START =
  /^(ok|okay|yes|yep|sure|go|go ahead|proceed|apply|lgtm|evet|onay|onayl[ıi]yorum|tamam|devam|uygula|yap|olur)(?![\p{L}\p{N}])/iu;

/** A message made only of git verbs and Turkish/English filler words. */
const GIT_ONLY =
  /^(?:(?:git|commit|commitle|push|pushla|merge|et|ve|and|then|sonra|yap|le|la|it|now|şimdi|lütfen|please)[\s,.!]*)+$/iu;

/**
 * Word stems that signal a change request. Matched at a Unicode word start so that
 * "yazılım" (software) does not match "yaz" (write) and "kurşun" does not match "kur" (install).
 * Each stem is followed either by the end of the word or by a Turkish verb suffix.
 */
const MUTATION_STEMS = [
  'ekle', 'oluştur', 'yaz', 'düzenle', 'değiştir', 'güncelle', 'sil', 'kaldır', 'taşı', 'düzelt', 'kur', 'uygula', 'entegre e[td]',
  'refactor', 'implement', 'create', 'add', 'build', 'write', 'edit', 'update', 'fix', 'remove', 'delete', 'migrate', 'install',
];
const TURKISH_VERB_SUFFIX =
  '(?:ır|ir|ur|ür|ar|er|r|sın|sin|sun|sün|sana|sene|y?(?:alım|elim|ayım|eyim)|mısın|misin|musun|müsün|y?(?:ın|in|un|ün)(?:ız|iz|uz|üz)?|ma|me)?';
const MUTATION =
  new RegExp(`(?<![\\p{L}\\p{N}])(?:${MUTATION_STEMS.join('|')})${TURKISH_VERB_SUFFIX}(?![\\p{L}\\p{N}])`, 'iu');

const QUESTION_WORDS =
  /(?<![\p{L}\p{N}])(nedir|nasıl|neden|niye|nerede|hangi|ne dersin|var mı|mı|mi|mu|mü|emin misin|what|why|how|where|which|status)(?![\p{L}\p{N}])/iu;

/**
 * @param {string} prompt
 * @returns {'bypass' | 'gear1' | 'gear2-explicit' | 'gear2-auto'}
 */
export function classifyPrompt(prompt) {
  const text = prompt.trim();
  if (!text) return 'bypass';

  // 1. Approval replies, also with a short tail: "Evet, güncelle", "onaylıyorum uygula".
  if (text.length <= APPROVAL_MAX_LENGTH && APPROVAL_START.test(text)) return 'bypass';

  // 2. Git follow-ups on already approved work: "Commit ve push et", "push".
  if (text.length <= GIT_FOLLOW_UP_MAX_LENGTH && GIT_ONLY.test(text)) return 'bypass';

  // 3. Pre-compiled XML execution contracts.
  if (text.includes('<documents>') && text.includes('<task>')) return 'bypass';

  // 4. Explicit modes.
  if (/^\/small(?![\p{L}\p{N}])/iu.test(text)) return 'gear1';
  if (/^\/(prompt-optimize|promptla)(?![\p{L}\p{N}])/iu.test(text)) return 'gear2-explicit';

  // 5. Other slash commands (/compact, /review, ...).
  if (text.startsWith('/')) return 'bypass';

  // 6. Change request vs. read-only question.
  const hasMutationIntent = MUTATION.test(text);
  if (!hasMutationIntent) return 'bypass';
  if (text.endsWith('?') && QUESTION_WORDS.test(text) && text.length <= 120) return 'bypass';
  return 'gear2-auto';
}

function messageFor(kind, skillPath) {
  if (kind === 'gear1') {
    return `[prompt-optimizer · Gear 1 (/small)] Read ${skillPath} if not yet loaded in this session. ` +
      `Inspect the target file silently, ask ZERO questions, render the 3-line Surgical Mode card with <details>, ` +
      `and WAIT for user confirmation before calling Edit, Write, MultiEdit, or mutating Bash.\n`;
  }
  if (kind === 'gear2-explicit') {
    return `[prompt-optimizer · Gear 2] Read ${skillPath} and its matching model reference file. ` +
      `Perform silent repo recon, dynamically match 0-3 relevant skills from available skills, ask at most ONE plain question only if critically ambiguous (otherwise zero), ` +
      `render the <details> Execution Contract card (including Matched Skills when >=1 match), and WAIT for user approval before modifying any files.\n`;
  }
  if (kind === 'gear2-auto') {
    return `[prompt-optimizer · Auto Gate] Before calling Edit, Write, MultiEdit, or mutating Bash on this request, ` +
      `follow ${skillPath}: if this only continues work the user already approved in this session, proceed (Gear 0); ` +
      `if it is a new multi-file change, perform silent recon, dynamically match 0-3 relevant installed skills, ask at most 1 plain question ONLY if a critical decision is missing, ` +
      `present the collapsible <details> Execution Contract card in the user's language, and pause for approval.\n`;
  }
  return '';
}

function main() {
  try {
    const raw = fs.readFileSync(0, 'utf8').trim();
    if (!raw) return;
    const payload = JSON.parse(raw);
    const prompt = String(payload.prompt ?? payload.user_prompt ?? '');
    const skillPath = path.join(os.homedir(), '.claude', 'skills', 'prompt-optimizer', 'SKILL.md');
    process.stdout.write(messageFor(classifyPrompt(prompt), skillPath));
  } catch {
    // Fail open silently
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
  process.exit(0);
}
