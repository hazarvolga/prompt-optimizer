# Prompt Optimizer (`prompt-optimizer`) 🎯⚡

<p align="center">
  <strong>Two-Gear, Model-Aware Pre-Execution Prompt Compiler for AI Coding Agents</strong><br/>
  <em>Yapay Zeka Kodlama Ajanları İçin İki Vitesli, Modele Duyarlı Otomatik Prompt Derleyici</em>
</p>

<p align="center">
  <a href="#english-documentation">🇬🇧 English Documentation</a> •
  <a href="#türkçe-dokümantasyon">🇹🇷 Türkçe Dokümantasyon</a> •
  <a href="https://github.com/hazarvolga/prompt-optimizer/releases">📦 Download Skill (.zip)</a> •
  <a href="https://hazarvolga.com.tr">🌐 hazarvolga.com.tr</a>
</p>

---

# 🇬🇧 English Documentation

**Write what you want in plain everyday language. Let the agent compile the engineering-grade prompt contract.**

Before touching a single file, `prompt-optimizer` silently detects your active model (**Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Google Gemini, OpenAI GPT/Codex, or Local Open-Weight Models**), inspects your repository context, and compiles your natural request into a surgical, zero-slop execution contract tucked inside a collapsible `<details>` block so your workspace stays clean.

- **100% Self-Contained:** Zero external path dependencies, zero runtime packages.
- **Cross-IDE & Cross-Runtime:** Works across **Claude Code, Claude Desktop, Antigravity, Cursor, Codex, OpenCode, and MLX / Ollama / LM Studio**.

### Why This Exists

Modern frontier models fail in two predictable ways when given raw human prompts:
1. **Under-specified complex tasks** trigger hallucinated file paths, unrequested refactors (*overengineering*), or premature turn endings.
2. **Over-prompted tiny tasks** cause excessive thinking latency and collateral edits to surrounding code.

`prompt-optimizer` solves both with an **Automatic 3-Gear Transmission**:

| Gear | Trigger | Behavior |
|---|---|---|
| **Gear 0: Bypass** | Read-only questions (`git status`, *"how does auth work?"*), approvals (`ok`, `yes`), or pre-compiled `<documents>...<task>` contracts | Zero friction. Answers or executes immediately without wrapping a second card. |
| **Gear 1: `/small` Surgical Mode ⚡** | Start message with `/small` | Zero interview. Reads target file, locks **zero-collateral-edit** rules, and presents a **3-line compact approval card**. |
| **Gear 2: Full Contract Mode 🎯** | Features, refactors, RAG, architecture, `/prompt-optimize`, `/promptla`, or `$prompt-optimizer` | Silent repo recon → **0 questions** if clear (at most **1 plain question** if critically ambiguous) → compiles XML/Markdown contract → clean approval gate. |

### Built-In Model Intelligence

- **Claude Opus 5.5:** Calibrates `medium`/`high` effort expectations, injects broad multi-module context discovery, prevents premature `end_turn` stops on long runs, and replaces generic UI defaults with concrete anti-slop constraints.
- **Claude Sonnet 5.5:** Applies dual-sided scope locks (prevents early check-ins at lower effort and unrequested extras at high effort), enforces real test/typecheck verification, and pairs `adaptive thinking` with structured JSON tasks.
- **Claude Fable 5.2:** Controls code-ownership refactoring behavior, subagent delegation cost, strict preserved-thinking history rules, and ASD-STE100 clear handoff reports.
- **Claude Haiku 5.5:** Adds current-date search grounding, tool-before-JSON sequencing, and system-prompt persistence for chat/routing workflows.
- **Gemini / GPT-Codex / Local Models (Qwen, DeepSeek, Llama):** Automatically strips Claude-only API patches and reformats the contract into hybrid Markdown (Gemini), crisp `# Objective` blocks (Codex), or flat numbered instructions (quantized local models).

### Quick Installation (EN)

#### Option A: One-Command Multi-IDE Installer (Recommended)
Installs the skill across `~/.claude`, `~/.agents`, `~/.codex`, `~/.gemini/config`, and `~/.mlx-serve`, installs slash commands (`/prompt-optimize`, `/promptla`, `/small`), installs the Claude Code `UserPromptSubmit` hook, and audits global rules for conflicting override directives:
```bash
git clone https://github.com/hazarvolga/prompt-optimizer.git
cd prompt-optimizer
chmod +x install.sh
./install.sh
```

#### Option B: Claude Desktop (`Chat` / `Cowork` Tab) GUI Upload
Note that `Claude Desktop` runs `Chat` and `Cowork` inside an isolated VM that does not read `~/.claude/skills/` on your host disk (whereas the local `Code` tab does). To enable `prompt-optimizer` inside `Chat` / `Cowork`, download `prompt-optimizer.zip` from [Releases](https://github.com/hazarvolga/prompt-optimizer/releases) and upload it under **Settings → Capabilities → Skills**.

#### Automatic Pre-Execution Gate Across All IDEs
1. **Global `CLAUDE.md` / `AGENTS.md` Rule:** Always specify the explicit `SKILL.md` path and hard-stop gate:
   ```markdown
   - **Pre-Execution Gate (`prompt-optimizer`):** Before calling any file-edit, file-write, patch, or mutating shell tool on any feature, bugfix, refactor, or content generation request, FIRST read `~/.agents/skills/prompt-optimizer/SKILL.md` (or `~/.claude/skills/prompt-optimizer/SKILL.md`), compile the collapsible `<details>` execution contract tuned to your active model, and STOP for my approval (`yes / ok / onaylıyorum`). Apply Gear 1 (3-line card, zero questions) for `/small`, and Gear 0 (direct reply) for read-only questions. This gate overrides any proactive/autonomous execution rules in project-level `AGENTS.md` or `rules/`.
   ```
2. **Claude Code `UserPromptSubmit` Hook (`~/.claude/settings.json`):** Ensures reliable card rendering even in long sessions or repositories with heavy project `CLAUDE.md` files:
   ```json
   {
     "hooks": {
       "UserPromptSubmit": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "node ~/.claude/hooks/prompt-optimizer-gate.mjs"
             }
           ]
         }
       ]
     }
   }
   ```
3. **Why Codex or Claude May Skip the Card (Troubleshooting):**
   - **Conflicting Global Directives:** Legacy rules in `~/.codex/AGENTS.md` or `~/.claude/rules/agents.md` such as *"Use agents proactively without user prompt"* or *"Focus on speed / Give complete working solutions"* cause GPT/Codex and Claude to bypass soft approval rules. Run `./install.sh` to detect them automatically.
   - **Explicit Invocation Syntax:** Claude Code uses `/promptla`, `/prompt-optimize`, and `/small`; OpenAI Codex uses `$prompt-optimizer` (Codex does not read `~/.claude/commands/`).
   - **Zero Questions vs. Skipping the Card:** When your intent is already clear from repo context, `prompt-optimizer` intentionally asks **0 questions**—but it must still present the `<details>` Approval Card before editing files. Always open a **New Session / Thread** after updating global rules.

---

# 🇹🇷 Türkçe Dokümantasyon

**Aklınızdakini günlük doğal dille yazın; ajanınız dosyalarınıza dokunmadan önce isteğinizi o modele özel kusursuz bir mühendislik kontratına dönüştürsün.**

`prompt-optimizer`, kod veya içerik üretimine başlamadan önce aktif yapay zeka modelini (**Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Google Gemini, OpenAI GPT/Codex veya Yerel Açık Kaynak Modeller**) sessizce tespit eder, proje bağlamını okur ve cümlenizi sıfır yan etkili bir görev kontratına derler. Teknik prompt detaylarını açılır `<details>` kutusunda gizleyerek sohbet ekranınızı tertemiz tutar.

- **%100 Bağımsız ve Taşınabilir:** Hiçbir dış klasöre veya ek kütüphaneye bağımlı değildir.
- **Tüm IDE ve Ajanlarla Uyumlu:** **Claude Code, Claude Desktop, Antigravity, Cursor, Codex, OpenCode ve MLX / Ollama / LM Studio** ortamlarında doğrudan çalışır.

### 3 Vitesli Otomatik Akış

| Vites | Tetikleyici | Davranış |
|---|---|---|
| **Vites 0: Doğrudan Geçiş** | Salt okuma soruları (`git status`, *"bu dosya ne yapıyor?"*), onay yanıtları (`ok`, `evet`, `onaylıyorum`) veya zaten derlenmiş `<documents>...<task>` kontratları | Sizi bekletmez; ikinci kez kart açmadan doğrudan yanıtlar veya uygular. |
| **Vites 1: `/small` Cerrahi Hızlı Mod ⚡** | Mesajın başına `/small` yazıldığında | Soru sormaz. Hedef dosyayı okur, **çevredeki kodlara dokunmama kilidi** koyar ve **3 satırlık hızlı onay kartı** sunar. |
| **Vites 2: Tam Kontrat Modu 🎯** | Yeni özellik, mimari, refactor, RAG/içerik üretimi veya `/promptla`, `/prompt-optimize`, `$prompt-optimizer` | Projeyi sessizce inceler → niyet netse **0 soru** (kritik belirsizlik varsa **en fazla 1 jargonsuz soru**) sorar → modele özel `<details>` kontrat kartını sunar ve onayınızı bekler. |

### Hızlı Kurulum ve Çoklu-IDE Senkronizasyonu (TR)

Tek komutla tüm yerel IDE dizinlerine (`~/.claude`, `~/.agents`, `~/.codex`, `~/.gemini/config`, `~/.mlx-serve`) kurmak, `/promptla` + `/small` komutlarını ve Claude Code `UserPromptSubmit` kancasını bağlamak ve çakışan kural denetimi yapmak için:

```bash
git clone https://github.com/hazarvolga/prompt-optimizer.git
cd prompt-optimizer
chmod +x install.sh
./install.sh
```

**Claude Desktop (`Chat` / `Cowork` Sekmesi) İçin Görsel Yükleme:** `Claude Desktop` içindeki `Chat` ve `Cowork` sekmeleri izole sanal makinede çalıştığı için yerel `~/.claude/skills/` klasörünü okumaz (yerel `Code` sekmesi ise okur). `Chat / Cowork` içinde de aktif etmek için [Releases](https://github.com/hazarvolga/prompt-optimizer/releases) sayfasından `prompt-optimizer.zip` dosyasını indirip **Settings → Capabilities → Skills** ekranından yükleyebilirsiniz.

### Codex ve Claude Neden Kart Göstermeden Koda Dalabilir? (Sorun Giderme)

1. **Çelişkili Global Kurallar (`AGENTS.md` / `rules/agents.md`):** Global `AGENTS.md` veya `rules/agents.md` içinde eski kurulumlardan kalan *"No user prompt needed"*, *"Use agents proactively without user prompt"* veya *"Focus on speed / Give complete working solutions"* ifadeleri varsa özellikle GPT/Codex modelleri onay kapısını atlayıp doğrudan kod yazmaya geçer. `./install.sh` betiği bu çakışmaları otomatik tespit edip uyarır.
2. **Komut Sözdizimi Farkı:** Claude Code `/promptla` ve `/small` komutlarını (`~/.claude/commands/`) okur; Codex ise slash komut klasörünü okumaz, doğrudan yetenek adı ile (`$prompt-optimizer`) veya global `AGENTS.md` kuralıyla tetiklenir.
3. **"Soru Sormama" ile "Kart Göstermeme" Farkı:** İsteğiniz ve proje dosyaları yeterince net olduğunda `prompt-optimizer` tasarım gereği **0 soru** sorar; ancak soru sormasa bile kod değiştirmeden önce **`<details>` Görev Kontratı Kartını** gösterip onay istemesi zorunludur. Kural güncellemelerinden sonra her zaman **Yeni Oturum (`New Session / New Thread`)** açın.

---

## Usage Preview / Örnek Görünüm

### Full Mode / Tam Mod
> **Input:** *"Add automatic priority routing to incoming support tickets based on urgency and module."*
>
> **Output:**
> **🎯 Detected Model:** Claude Sonnet 5.5
> **📌 Execution Plan (Summary):**
> - Add structured enum classification (`low | normal | urgent` + module taxonomy) in `src/tickets/router.service.ts`
> - Validate schema adherence and run unit tests before reporting completion
>
> `<details><summary>🔧 Optimized Execution Contract (Click to inspect or copy)</summary> ... </details>`
>
> **Proceed with this plan?**

### Surgical Mode / `/small` Hızlı Mod ⚡
> **Input:** `/small üst menüdeki giriş butonunun rengini #0F172A yap`
>
> **Output:**
> **⚡ Cerrahi Hızlı Mod (`/small` — Claude Opus 5.5):** `src/components/Header.tsx` içinde yalnızca giriş butonu arka plan rengi `#0F172A` olarak güncellenecek; çevredeki hiçbir koda dokunulmayacak.
> `<details><summary>🔧 Optimize Mikro-Kontrat</summary> ... </details>`
> **Uygulayayım mı?**

---

## Author & License

Created by **[Hazar Volga Ekiz](https://hazarvolga.com.tr)** · Informed by official frontier Prompt Engineering & Agentic Systems guidelines.
Released under the [MIT License](./LICENSE).
