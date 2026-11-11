# Cross-Model & Multi-IDE Adapter (Gemini, GPT/Codex, Local Open-Weight Models)

Universal prompt engineering principles (clarity, motivation/why, evidence grounding, scope control, verification) improve every frontier model, **but structural syntax and model-specific patches must adapt to the active model family.**

---

## 1. Google Gemini Models (Gemini Pro / Flash / Ultra)
- **Keep:** Explicit goal & success criteria, long context placed above the final instruction, verbatim quote-grounding for RAG/docs, parallel tool reads, `<investigate_before_answering>`, minimal-diff scope rules, and concrete verification steps.
- **Adapt:**
  - Use a clean **hybrid layout**: Markdown headings (`## Goal`, `## Context`, `## Constraints`, `## Verification`) paired with lightweight XML wrappers around raw data (`<documents>`, `<target>`).
  - **Omit Claude-only mechanics:** Skip Claude API notes (`preserved thinking`, `between_tools`, `display: "updates"`, Fable ownership triggers, or Opus turn-ending blocks).

---

## 2. OpenAI GPT / Codex Models
- **Keep:** Exact scope boundaries, reading files before editing, explaining the *why* behind constraints, test/typecheck verification before finishing.
- **Adapt:**
  - Prefer **crisp Markdown sections** (`# Objective`, `# Context & Files`, `# Hard Constraints`, `# Done Criteria`) over deeply nested XML tags.
  - State completeness expectations clearly: *"Implement the complete, working change across the listed files without leaving TODO placeholders, while touching nothing outside scope."*
  - **Omit Claude-only mechanics.**

---

## 3. Local Open-Weight Models (Ollama, LM Studio, MLX, vLLM — QwenCoder, DeepSeek, Llama)
- **Keep:** Concrete file paths, exact input/output signatures, and one concise code example if formatting is strict.
- **Adapt:**
  - **Keep prompts compact, flat, and numbered (`1..5`).** Avoid lengthy prose blocks or deeply nested XML tags, which consume local KV-cache and dilute attention on quantized weights.
  - Place target file paths, function signatures, and expected outputs at the very top.
  - Scope work to one focused module/file per turn rather than multi-subsystem instructions.
