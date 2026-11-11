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

Before touching a single file, `prompt-optimizer` silently detects your active model (**Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Google Gemini, OpenAI GPT/Codex, or Local Open-Weight Models**), inspects your repository context, and compiles your natural request into a surgical, zero-slop execution contract—tucked neatly inside a collapsible `<details>` block so your workspace stays clean.

- **100% Self-Contained:** Zero external path dependencies, zero runtime packages.
- **Cross-IDE & Cross-Runtime:** Works out of the box in **Claude Code, Claude Desktop, Antigravity, Cursor, Codex, OpenCode, and MLX / Ollama / LM Studio**.

### Why This Exists

Modern frontier models fail in two predictable ways when given raw human prompts:
1. **Under-specified complex tasks** trigger hallucinated file paths, unrequested refactors (*overengineering*), or premature turn endings.
2. **Over-prompted tiny tasks** cause excessive thinking latency and collateral edits to surrounding code.

`prompt-optimizer` solves both with an **Automatic 3-Gear Transmission**:

| Gear | Trigger | Behavior |
|---|---|---|
| **Gear 0 — Bypass** | Read-only questions (`git status`, *"how does auth work?"*) | Zero friction. Answers immediately without showing a card. |
| **Gear 1 — `/small` Surgical Mode ⚡** | Start message with `/small` | Zero interview. Reads target file, locks **zero-collateral-edit** rules, and presents a **3-line compact approval card**. |
| **Gear 2 — Full Contract Mode 🎯** | Features, refactors, RAG, architecture, or `/prompt-optimize` | Silent repo recon → at most **1 jargon-free question** (if needed) → compiles XML/Markdown contract tuned to the active model → clean approval gate. |

### Built-In Model Intelligence

- **Claude Opus 5.5:** Calibrates `medium`/`high` effort expectations, injects broad multi-module context discovery, prevents premature `end_turn` stops on long runs, and replaces generic UI defaults with concrete anti-slop constraints.
- **Claude Sonnet 5.5:** Applies dual-sided scope locks (prevents early check-ins at lower effort and unrequested extras at high effort), enforces real test/typecheck verification, and pairs `adaptive thinking` with structured JSON tasks.
- **Claude Fable 5.2:** Controls code-ownership refactoring behavior, subagent delegation cost, strict preserved-thinking history rules, and ASD-STE100 clear handoff reports.
- **Claude Haiku 5.5:** Adds current-date search grounding, tool-before-JSON sequencing, and system-prompt persistence for chat/routing workflows.
- **Gemini / GPT-Codex / Local Models (Qwen, DeepSeek, Llama):** Automatically strips Claude-only API patches and reformats the contract into hybrid Markdown (Gemini), crisp `# Objective` blocks (Codex), or flat numbered instructions (quantized local models).

### Quick Installation (EN)

#### Option A: CLI / IDE Agent Skill (`~/.claude`, `~/.agents`, `~/.gemini`, `~/.codex`)
```bash
git clone https://github.com/hazarvolga/prompt-optimizer.git
cd prompt-optimizer

# Claude Code & Claude Desktop
mkdir -p ~/.claude/skills ~/.claude/commands
cp -R skills/prompt-optimizer ~/.claude/skills/
cp commands/*.md ~/.claude/commands/

# Cross-runtime (Codex, OpenCode, Gemini CLI, Antigravity)
mkdir -p ~/.agents/skills
cp -R skills/prompt-optimizer ~/.agents/skills/
```

#### Option B: Claude Desktop / Web GUI Upload
Download `prompt-optimizer.zip` from [Releases](https://github.com/hazarvolga/prompt-optimizer/releases) (or zip `skills/prompt-optimizer`) and upload it under **Settings → Capabilities → Skills**.

#### Optional: Enable Automatically Across All Projects
Add this rule to your global `~/.claude/CLAUDE.md` or `AGENTS.md`:
```markdown
- Before executing any file/code modification, new feature, or content generation task, invoke `prompt-optimizer`: silently detect the active model, compile the request into a collapsible `<details>` execution contract, and ask for confirmation. If my message starts with `/small`, use Gear 1 (3-line surgical mode); for read-only questions, answer directly.
```

---

# 🇹🇷 Türkçe Dokümantasyon

**Aklınızdakini günlük doğal dille yazın; ajanınız dosyalarınıza dokunmadan önce isteğinizi o modele özel kusursuz bir mühendislik kontratına dönüştürsün.**

`prompt-optimizer`, kod veya içerik üretimine başlamadan önce aktif yapay zeka modelini (**Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Google Gemini, OpenAI GPT/Codex veya Yerel Açık Kaynak Modeller**) sessizce tespit eder, proje bağlamını okur ve cümlenizi sıfır yan etkili bir görev kontratına derler. Teknik prompt detaylarını açılır `<details>` kutusunda gizleyerek sohbet ekranınızı tertemiz tutar.

- **%100 Bağımsız ve Taşınabilir:** Hiçbir dış klasöre veya ek kütüphaneye bağımlı değildir.
- **Tüm IDE ve Ajanlarla Uyumlu:** **Claude Code, Claude Desktop, Antigravity, Cursor, Codex, OpenCode ve MLX / Ollama / LM Studio** ortamlarında doğrudan çalışır.

### Neden Geliştirildi?

Modern yapay zeka modelleri ham kullanıcı cümleleriyle çalıştığında iki temel sorun üretir:
1. **Karmaşık görevlerde eksik bağlam:** Okunmamış dosyalar hakkında tahmin yürütme (halüsinasyon), istenmeyen ek dosyalar/refactor üretme (*overengineering*) veya işi yarım bırakma.
2. **Küçük görevlerde aşırı yükleme:** Basit bir renk/satır değişikliğinde gereksiz uzun düşünme süresi ve çevredeki çalışan kodları bozma.

`prompt-optimizer` bu iki sorunu **3 Vitesli Otomatik Akış** ile çözer:

| Vites | Tetikleyici | Davranış |
|---|---|---|
| **Vites 0 — Doğrudan Yanıt** | Salt okuma ve bilgi soruları (`git status`, *"bu dosya ne yapıyor?"*) | Sizi hiç bekletmez; onay kartı açmadan doğrudan yanıtlar. |
| **Vites 1 — `/small` Cerrahi Hızlı Mod ⚡** | Mesajın başına `/small` yazıldığında | Soru sormaz. Hedef dosyayı okur, **çevredeki kodlara dokunmama kilidi** koyar ve **3 satırlık hızlı onay kartı** sunar. |
| **Vites 2 — Tam Kontrat Modu 🎯** | Yeni özellik, mimari, refactor, RAG/içerik üretimi veya `/prompt-optimize` | Projeyi sessizce inceler → gerekirse jargonsuz **en fazla 1 soru** sorar → aktif modele özel XML/Markdown kontratını derler → onayınızla uygular. |

### Hızlı Kurulum (TR)

```bash
git clone https://github.com/hazarvolga/prompt-optimizer.git
cd prompt-optimizer

# Claude Code & Claude Desktop kurulumu
mkdir -p ~/.claude/skills ~/.claude/commands
cp -R skills/prompt-optimizer ~/.claude/skills/
cp commands/*.md ~/.claude/commands/

# Diğer tüm ajanlar (Codex, OpenCode, Gemini, Antigravity)
mkdir -p ~/.agents/skills
cp -R skills/prompt-optimizer ~/.agents/skills/
```

**Görsel Arayüz (GUI) ile Yükleme:** [Releases](https://github.com/hazarvolga/prompt-optimizer/releases) sayfasından `prompt-optimizer.zip` dosyasını indirip Claude Desktop / Web içinde **Settings → Capabilities → Skills** bölümünden tek tıkla yükleyebilirsiniz.

**Tüm Projelerde Otomatik Çalıştırmak İçin (Opsiyonel):** Global `~/.claude/CLAUDE.md` veya `AGENTS.md` dosyanıza şu satırı ekleyin:
```markdown
- Dosya/kod değişikliği, yeni özellik veya içerik üretimi gerektiren görevlerde işleme başlamadan önce `prompt-optimizer` yeteneğini çalıştır: aktif modeli sessizce tespit et, isteğimi açılır `<details>` kutusunda optimize kontrata dönüştür ve onayımı al. Mesajım `/small` ile başlıyorsa 3 satırlık Cerrahi Hızlı Mod uygula; salt okuma sorularında doğrudan yanıtla.
```

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

Created by **[Hazar Volga Ekiz](https://hazarvolga.com.tr)** — informed by Anthropic's official Prompt Engineering & Agentic Systems guidelines.
Released under the [MIT License](./LICENSE).
