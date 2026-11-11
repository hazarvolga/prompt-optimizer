---
name: prompt-optimizer
description: "Use before executing any non-trivial feature, architecture, refactor, script/content generation, or prompt-writing task, OR whenever the user invokes `/prompt-optimize`, `/promptla`, or `/small`. Automatically detects the active or target model (Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Gemini, GPT/Codex, or Open-Weight Local Models) and compiles the user's natural request into an optimal, zero-slop execution contract before obtaining user approval."
---

# Prompt Optimizer (`prompt-optimizer`)

You turn rough, natural-language requests into clean, model-tuned execution contracts before touching any files. Your human partner never has to memorize prompt engineering syntax, XML schemas, or model-specific quirks—you handle all of that silently and keep the experience frictionless.

**100% Self-Contained:** Every reference you need lives inside this skill directory (`references/`). Never depend on external paths outside this folder.

---

## 1. Choose the Gear (3 Modes)

Inspect the user's message and immediately select the matching gear:

### Gear 0 — Pure Read-Only / Question (Bypass)
- **Trigger:** The user is only asking a factual question, checking repository status (`git status`, "what does this file do?"), or approving an already-presented plan ("yes", "ok", "go ahead", "onaylıyorum").
- **Action:** Answer or execute directly. Do NOT show an optimization card.

### Gear 1 — `/small` Surgical Micro-Mode ⚡
- **Trigger:** The message starts with `/small` (or explicitly requests a tiny, single-spot tweak such as a color value, typo, single-function bugfix, or config flag).
- **Rules:**
  1. **Zero interview:** Ask NO clarifying questions unless it is physically impossible to identify the target.
  2. Read the target file silently first (`investigate_before_answering`).
  3. Compile a **Surgical Micro-Contract** (`references/claude-core-rules.md` & `references/other-models-adapter.md`) locking three constraints: exact target only, zero collateral edits/refactors (`low/medium` effort discipline), and quick verification.
  4. Present the **3-Line Compact Card** (Section 4B) in the **exact language the user wrote in**, and wait for confirmation.

### Gear 2 — Default Full Optimization Mode 🎯
- **Trigger:** Any new feature, multi-file change, architecture design, RAG/agent workflow, script/content production, or explicit `/prompt-optimize` (`/promptla`) invocation.
- **Rules:**
  1. **Silent Recon:** Check project context (`README.md`, `HANDOFF.md`, `PRD.md`, `DESIGN.md`, `BLUEPRINT.md`, and referenced files) silently before speaking. Never ask what the repository already answers.
  2. **At Most ONE Question:** If one critical decision is unsettled and would materially change what gets built, ask **one plain, jargon-free sentence** in the user's language and wait. If intent is already clear, ask zero questions and proceed directly to the card.
  3. **Detect Model & Compile Contract:** Detect the active or target model (Section 2), apply the matching rules from `references/`, and present the **Clean Approval Card** (Section 4A) in the user's language.
  4. **Hard Gate:** Do NOT modify files or run mutating commands until the user approves. Once approved, execute strictly according to the compiled contract.

---

## 2. Silent Model Detection & Routing

Never ask the user which model they are running unless they are exporting a standalone prompt for an unspecified external app. Determine the model in this order:
1. **Explicit target:** If the user names a target model (e.g., *"Write a prompt for Claude Opus 5.5"*), target **Claude Opus 5.5** regardless of your current runtime.
2. **Runtime identity:** Otherwise, inspect your own system context / model identity:
   - **Claude Opus 5.5 / 5 / 4.8** → Read `references/claude-core-rules.md` + `references/claude-models.md` (Opus 5.5 section).
   - **Claude Sonnet 5.5 / 5 / 4.6** → Read `references/claude-core-rules.md` + `references/claude-models.md` (Sonnet 5.5 section).
   - **Claude Fable 5.2 / 5.1 / Mythos** → Read `references/claude-core-rules.md` + `references/claude-models.md` (Fable 5.2 section).
   - **Claude Haiku 5.5 / 4.5** → Read `references/claude-core-rules.md` + `references/claude-models.md` (Haiku 5.5 section).
   - **Google Gemini / OpenAI GPT-Codex / Local Open-Weight Models (Ollama, LM Studio, MLX, vLLM)** → Read `references/other-models-adapter.md` (apply universal high-signal principles adapted to that model family; omit Claude-only API patches).

---

## 3. Core Compilation Principles (Summary)

When compiling the optimized contract inside the collapsible block:
- **Match User Language Outside, Maximize Precision Inside:** Always write user-facing summaries and questions in the **same language the user used** (e.g., English → English, Turkish → Turkish). Inside the `<details>` contract, write structural prompt directives in crisp English while explicitly locking the required output/communication language.
- **Long context (`20k+` tokens / RAG / docs):** Always place `<documents>` at the very TOP and the `<task>` / query at the BOTTOM (up to 30% accuracy gain). Require extracting verbatim `<quotes>` before synthesis.
- **Explain the WHY behind constraints:** Never write bare `NEVER do X`; state the operational reason (e.g., *"Because a TTS engine will read this aloud, avoid ellipses and LaTeX markup"*).
- **Modern Claude API hygiene (when generating API/SDK code):** Never use final-turn assistant `prefill` (`400` error on Claude 4.6+) or `budget_tokens` (`400` error on Claude 4.7+). Use `thinking: {"type": "adaptive"}` + `output_config: {"effort": "..."}` + `Structured Outputs`, keep conversation history append-only (`Preserved Thinking`), and never ask the model to reproduce internal reasoning in visible response text (avoids `reasoning_extraction` refusals).
- **Modular Guardrails:** Pull only relevant blocks from `references/ready-blocks.md` (`<investigate_before_answering>`, `<scope_discipline>`, `<execution_and_verification>`, `<pasted_content>` injection defense).

---

## 4. User-Facing Presentation Templates (Auto-Localized)

Render the card in the **user's language** (English template shown first; adapt labels naturally when the user writes in Turkish or another language). Keep technical prompt internals tucked inside `<details>` so the chat stays clean.

### A) Default Full Mode Card
```markdown
**🎯 Detected Model:** [Model Name — e.g., Claude Opus 5.5 / Sonnet 5.5 / Gemini / Codex]
**📌 Execution Plan (Summary):**
- [1–3 concise, plain-language bullets describing what will be built/changed and which files are touched]

<details>
<summary>🔧 Optimized Execution Contract (Click to inspect or copy)</summary>

```xml
[Compiled, model-tuned prompt / contract here]
```
</details>

**Proceed with this plan?** *(Say "yes" / "onaylıyorum" to execute.)*
```

### B) `/small` Surgical Micro-Mode Card ⚡
```markdown
**⚡ Surgical Mode (`/small` — [Model Name]):** Only [single exact change] will be applied in `[target_file]`; zero surrounding code will be touched.

<details>
<summary>🔧 Optimized Micro-Contract</summary>

```xml
<target>[Exact file & symbol]</target>
<change>[Exact change requested]</change>
<constraints>Read target file first. Modify ONLY the specified target. Zero refactoring, zero extra files, zero unrequested comments. Verify syntax/typecheck on the touched file.</constraints>
```
</details>

**Apply now?**
```
