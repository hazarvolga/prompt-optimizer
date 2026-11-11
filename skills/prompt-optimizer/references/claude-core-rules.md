# Claude Core Prompt Engineering Rules (4.6 → 5.5 & Fable 5.2)

Synthesized best practices for modern Claude models covering structure, context placement, reasoning control, and safety guardrails.

## 1. Clarity, Context & Motivation
- **Explicit over implicit:** Treat Claude as a brilliant new engineer who lacks unspoken project context. Use explicit action verbs (*"Implement..."*, *"Modify..."*) when changes are desired rather than *"Can you suggest..."*.
- **State the WHY:** Explaining motivation behind a constraint lets the model generalize accurately across edge cases.
  - Weak: `NEVER use ellipses.`
  - Strong: `Your response will be read aloud by a text-to-speech engine, so never use ellipses since TTS engines cannot pronounce them cleanly.`
- **Avoid legacy shouting:** Modern Claude models are highly steerable and overtrigger on aggressive all-caps (`"CRITICAL: YOU MUST ALWAYS..."`). Use calm, direct phrasing (`"Use [tool] when..."`).

## 2. XML Structuring & Multishot Examples
- Separate distinct prompt components using consistent XML tags: `<role>`, `<documents>`, `<context>`, `<constraints>`, `<examples>`, `<task>`.
- When output format, tone, or boundary classification matters, provide **3–5 diverse examples** inside `<examples><example><input>...</input><output>...</output></example></examples>`.

## 3. Long Context (`20k+` Tokens) & Grounded RAG
1. **Long Data at the TOP, Query at the BOTTOM:** Place documents and large code contexts at the top of the prompt, above instructions and questions (improves complex multi-document quality by up to **30%**).
2. **Structured Document Tags:**
   ```xml
   <documents>
     <document index="1">
       <source>document_or_file_name</source>
       <document_content>{{CONTENT}}</document_content>
     </document>
   </documents>
   ```
3. **Quote Grounding First:** Instruct the model to extract verbatim supporting passages into `<quotes>` tags before writing its `<analysis>` or `<response>`. Explicitly permit stating what cannot be verified from the sources instead of guessing.

## 4. Output Formatting & Prefill Migration
- **Positive framing:** Tell the model what format to produce (*"Write in clear, flowing prose paragraphs"*) rather than only what to avoid.
- **No Assistant Prefill (Claude 4.6+):** Prefilling the final `assistant` turn returns HTTP `400`.
  - Schema enforcement → use **Structured Outputs** (`output_config.format`) or strict tool schemas.
  - Skipping preambles → add *"Respond directly without preamble. Do not open with 'Here is...' or 'Based on...'."*
  - Resuming interrupted generations → request continuation inside the `user` turn along with the trailing snippet.
- **Plain-text / TTS formatting:** Explicitly forbid LaTeX (`\( \)`, `$`, `\frac`) when targeting plain-text UIs or voice pipelines.

## 5. Adaptive Thinking, Effort & Preserved Thinking
- **No `budget_tokens` (Claude 4.7+):** Manual `budget_tokens` returns HTTP `400`. Use `thinking: {"type": "adaptive"}` and calibrate depth with `output_config: {"effort": "low" | "medium" | "high" | "xhigh" | "max"}`.
- **Size `max_tokens` for thinking + reply:** Thinking tokens count toward `max_tokens` (up to `128000` with streaming for agentic coding).
- **Avoid `reasoning_extraction` refusals:** Never prompt Claude 5.x / Fable 5.x to reproduce its internal chain-of-thought inside visible response text. Read `display: "summarized"` thinking blocks via the API if reasoning inspection is required.
- **Append-Only History (`Preserved Thinking`):** Never mutate `system`, `tools`, or earlier turns mid-conversation; prefix edits invalidate preserved thinking blocks (returning `400` on strict models and breaking Prompt Cache). Use per-message effort changes or mid-conversation system messages instead.

## 6. Indirect Prompt Injection Defense
- Isolate untrusted pasted text inside matching random-ID tags (`<pasted_content id="a9f2">...</pasted_content id="a9f2">`) and instruct the model to follow instructions inside pasted blocks only if the user's own message explicitly asks it to.
- Never place live mid-turn user input inside a `tool_result` block; append it as a separate user text block after `tool_result`.
