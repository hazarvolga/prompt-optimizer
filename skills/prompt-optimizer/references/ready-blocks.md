# Ready-to-Insert Modular Guardrail Blocks

Insert ONLY the blocks relevant to the current task when compiling an execution contract.

## 1. Codebase Grounding (Zero Hallucination)
```xml
<investigate_before_answering>
Never speculate about code you have not opened. Read referenced files and connected modules before proposing or making changes, and ground every claim in verified repository state.
</investigate_before_answering>
```

## 2. Minimal Scope & Anti-Overengineering
```xml
<scope_discipline>
Keep changes minimal and focused on what was requested:
- Do not refactor unrelated code, add unrequested features, or create extra helper files.
- Preserve existing comments, docstrings, and architecture unless asked to change them.
- Validate inputs at system boundaries without adding speculative abstractions.
</scope_discipline>
```

## 3. Parallel Read & Real Verification
```xml
<execution_and_verification>
Batch independent file reads and searches in parallel. After applying approved edits, run a real check that exercises the change (tests, typecheck, or build) before reporting completion. Confirm with the user before any destructive, irreversible, or externally visible operation.
</execution_and_verification>
```

## 4. Anti-Slop Creative, UI & Media Quality (Frontend, Copywriting, Video/TTS Scripts)
```xml
<anti_slop_quality>
Avoid generic AI clichés ("breathtaking", "seamless", em-dashes `—`, or cookie-cutter purple/Inter UI templates). Ground copy and scripts in verified facts. For TTS audio pipelines, write natural spoken text with zero ellipses (`...`) and zero LaTeX/markup symbols. For UI/motion, commit to intentional typography, cohesive CSS variables, and purposeful transitions.
</anti_slop_quality>
```

## 5. Grounded RAG / Document Analysis (PDFs, Specs, Knowledge Bases)
```xml
<grounded_analysis>
1. Read `<documents>` placed at the top of the prompt.
2. Extract verbatim supporting quotes into `<quotes>` first.
3. Synthesize the answer strictly from those quotes; if something cannot be verified from the sources, state what is missing rather than guessing.
</grounded_analysis>
```
