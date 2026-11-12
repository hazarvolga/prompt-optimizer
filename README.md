# Prompt Optimizer (`prompt-optimizer`) 🎯⚡

<p align="center">
  <strong>Two-Gear, Model-Aware Pre-Execution Prompt Compiler for AI Coding Agents</strong><br/>
  <em>Yapay Zeka Kodlama Ajanları İçin İki Vitesli, Modele Duyarlı Otomatik Prompt Derleyici</em>
</p>

<p align="center">
  <a href="#english-documentation">🇬🇧 English Documentation</a> •
  <a href="#türkçe-dokümantasyon">🇹🇷 Türkçe Dokümantasyon</a> •
  <a href="https://github.com/hazarvolga/prompt-optimizer/releases">📦 Download Skill (.zip)</a> •
  <a href="CHANGELOG.md">📝 Changelog / Değişiklikler</a> •
  <a href="https://hazarvolga.com.tr">🌐 hazarvolga.com.tr</a>
</p>

---

# 🇬🇧 English Documentation

> **What's new in 1.2.0:** Gear 2 now dynamically matches **0–3 relevant installed skills** from your environment, shows them on the single Approval Card (`🧩 Matched Skills`), and embeds `<active_skills>` into `<details>` so one `"yes"` loads their `SKILL.md` rules without an extra round-trip (or `"yes without X"` skips one). Also adds Turkish vowel-stem `y`-buffer imperatives (`ekleyin`, `güncelleyiniz`, `ekleyelim`, `entegre edin`) and recursive rule conflict auditing (`1.1.1`). Full history: [CHANGELOG.md](CHANGELOG.md).

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
| **Gear 2: Full Contract Mode 🎯** | Features, refactors, RAG, architecture, `/prompt-optimize`, `/promptla`, or `$prompt-optimizer` | Silent repo recon + **0–3 dynamic skill matches** → **0 questions** if clear (at most **1 plain question** if critically ambiguous) → compiles XML/Markdown contract (`<active_skills>`) → single-pass approval gate. |

### Dynamic Skill Discovery & Single-Card Confirmation (`v1.2.0`)

Even when an agent understands the topic of your prompt, it often skips opening the matching domain `SKILL.md` files in `Claude Code` or `Codex` because it already loaded `prompt-optimizer` in that turn (or because you pasted the compiled `<details>` contract into a fresh window). Conversely, stopping for a separate message just to ask *"Should I use skills X and Y?"* would force you to approve twice.

`v1.2.0` solves both problems inside the **single Gear 2 Approval Card**:
- **Runtime-Dynamic (Zero Hardcoded Names):** Scans the skills actually available in your current IDE/runtime and selects **0 to 3 high-confidence domain/workflow skills** (excluding `prompt-optimizer` itself and meta-routers). When `0` skills clearly match, the `🧩 Matched Skills` line is omitted completely.
- **Portable `<active_skills>` Contract Block:** Embeds `<active_skills>` inside the collapsible `<details>` prompt so even copy-pasted contracts tell the target session which `SKILL.md` files to read before editing code.
- **One-Reply Control (Zero Extra Turn):**

| Your Reply | What Happens |
|---|---|
| `"yes"` / `"evet"` / `"onaylıyorum"` | Reads the `SKILL.md` of every matched skill and executes the approved plan immediately. |
| `"yes without e2e-testing"` / `"evet ama tdd hariç"` | Skips the excluded skill, loads the remaining matched skills, and executes without re-opening the gate. |
| Copy & paste `<details>` into another session | Gear 0 bypasses wrapping a second card and follows `<active_skills>` directly. |

### Multilingual & Turkish Natural-Language Gate (`hooks/prompt-optimizer-gate.mjs`)

- **Unicode Word Boundaries (`u` flag):** Uses `(?<![\p{L}\p{N}])...(?![\p{L}\p{N}])` instead of ASCII `\b`, preventing read-only Turkish nouns like `"yazılım"` (software) or `"kurşun"` (lead) from false-matching verb stems `"yaz"` (write) or `"kur"` (install).
- **Turkish Verb Inflections & Vowel-Stem `y`-Buffers:** Recognizes polite, optative, interrogative, and softened imperatives including `"bu hatayı düzeltir misin"`, `"M25 modülünü ekleyin"`, `"bu dosyayı güncelleyiniz"`, `"yeni modülü ekleyelim"`, `"klasörü taşıyın"`, and `"sisteme entegre edin"`.
- **Smart Follow-Up Bypass & Unit Tests:** Short-tail approvals (`<= 80` chars, e.g. `"Evet, güncelle"`, `"evet ama X hariç uygula"`) and git-only follow-ups (`<= 60` chars, e.g. `"Commit ve push et"`) bypass the gate cleanly. Verify anytime with:
  ```bash
  node --test hooks/prompt-optimizer-gate.test.mjs
  ```

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
   - **Pre-Execution Gate (`prompt-optimizer`):** Before calling any file-edit, file-write, patch, or mutating shell tool on a NEW multi-file feature, refactor, or content generation request, FIRST read `~/.agents/skills/prompt-optimizer/SKILL.md` (or `~/.claude/skills/prompt-optimizer/SKILL.md`), compile the collapsible `<details>` execution contract tuned to your active model, and STOP for my approval (`yes / ok / onaylıyorum`). Apply Gear 1 (3-line card, zero questions) for `/small`, and Gear 0 (direct reply) for read-only questions, approvals (also with a short tail such as "Evet, güncelle") and git follow-ups on approved work. This gate overrides any proactive/autonomous execution rules in project-level `AGENTS.md` or `rules/`.
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

> **1.2.0 ile gelenler:** Vites 2 artık ortamınızda yüklü yetenekler arasından konuya tam uyan **0–3 yeteneği dinamik seçip** tek onay kartında (`🧩 Matched Skills`) gösteriyor ve `<details>` içindeki kontrata `<active_skills>` olarak işliyor; tek bir `"evet"` ile ilgili `SKILL.md` kuralları da okunarak uygulanıyor (`"evet ama X hariç"` ile istediğiniz yeteneği dışarıda bırakabilirsiniz). Ayrıca Türkçe ünlüyle biten fiillerde `y` kaynaştırma ekleri (`ekleyin`, `güncelleyiniz`, `ekleyelim`, `entegre edin`) ve alt klasör kural çakışma taraması (`1.1.1`) eklendi. Ayrıntılar: [CHANGELOG.md](CHANGELOG.md).

**Aklınızdakini günlük doğal dille yazın; ajanınız dosyalarınıza dokunmadan önce isteğinizi o modele özel kusursuz bir mühendislik kontratına dönüştürsün.**

`prompt-optimizer`, kod veya içerik üretimine başlamadan önce aktif yapay zeka modelini (**Claude Opus 5.5, Sonnet 5.5, Fable 5.2, Haiku 5.5, Google Gemini, OpenAI GPT/Codex veya Yerel Açık Kaynak Modeller**) sessizce tespit eder, proje bağlamını okur ve cümlenizi sıfır yan etkili bir görev kontratına derler. Teknik prompt detaylarını açılır `<details>` kutusunda gizleyerek sohbet ekranınızı tertemiz tutar.

- **%100 Bağımsız ve Taşınabilir:** Hiçbir dış klasöre veya ek kütüphaneye bağımlı değildir.
- **Tüm IDE ve Ajanlarla Uyumlu:** **Claude Code, Claude Desktop, Antigravity, Cursor, Codex, OpenCode ve MLX / Ollama / LM Studio** ortamlarında doğrudan çalışır.

### 3 Vitesli Otomatik Akış

| Vites | Tetikleyici | Davranış |
|---|---|---|
| **Vites 0: Doğrudan Geçiş** | Salt okuma soruları (`git status`, *"bu dosya ne yapıyor?"*), onay yanıtları (`ok`, `evet`, `onaylıyorum`) veya zaten derlenmiş `<documents>...<task>` kontratları | Sizi bekletmez; ikinci kez kart açmadan doğrudan yanıtlar veya uygular. |
| **Vites 1: `/small` Cerrahi Hızlı Mod ⚡** | Mesajın başına `/small` yazıldığında | Soru sormaz. Hedef dosyayı okur, **çevredeki kodlara dokunmama kilidi** koyar ve **3 satırlık hızlı onay kartı** sunar. |
| **Vites 2: Tam Kontrat Modu 🎯** | Yeni özellik, mimari, refactor, RAG/içerik üretimi veya `/promptla`, `/prompt-optimize`, `$prompt-optimizer` | Projeyi sessizce inceler + **uygun 0–3 yüklü yeteneği eşleştirir** → niyet netse **0 soru** (kritik belirsizlik varsa **en fazla 1 jargonsuz soru**) sorar → modele özel `<details>` kontrat kartını sunar ve tek adımda onayınızı bekler. |

### Dinamik Yetenek Eşleştirme ve Tek Kartta Onay (`v1.2.0`)

`prompt-optimizer` Türkçe isteğinizi kontrata çevirirken konuyu zaten anlar; ancak konuyu anlamak ile **o konuya ait `SKILL.md` dosyasını diskten açıp kurallarını okumak** aynı şey değildir. Özellikle `Claude Code` ve `Codex`, o turda `prompt-optimizer` yeteneğini okuduktan sonra ilgili alan yeteneklerini (`nestjs-patterns`, `test-driven-development`, `cinecode`, `yt-script` vb.) açmayı atlayabilir veya `<details>` kontratını başka bir pencereye yapıştırdığınızda karşıdaki oturum hangi yetenekleri yükleyeceğini bilemeyebilir. Ayrı bir mesajda *"Şu skilleri kullanayım mı?"* diye sormak ise sizi **iki kez onay vermeye** zorlar.

`v1.2.0` bu iki sorunu **tek onay kartı içinde** sıfır ekstra beklemeyle çözer:
- **Dinamik Ortam Taraması (Sabit İsim Yok):** Açık kaynak ve taşınabilir kalması için içine sabit yetenek adları gömülmez; o an çalıştığınız IDE'de yüklü yetenekleri tarar ve konuya doğrudan uyan **en fazla 1-3 yeteneği** seçer (`0` eşleşme varsa satırı hiç göstermez, gürültü yapmaz).
- **Taşınabilir `<active_skills>` Kontrat Bloğu:** Seçilen yetenekleri `<details>` içindeki XML kontratına da yazar; böylece kontratı kopyalayıp başka bir `Claude` veya `Codex` penceresine yapıştırdığınızda bile karşıdaki ajan işe başlamadan önce o `SKILL.md` dosyalarını okur.
- **Tek Yanıtla Tam Kontrol:**

| Yanıtınız | Ajanın Davranışı |
|---|---|
| `"evet"` / `"onaylıyorum"` / `"uygula"` | Eşleşen yeteneklerin `SKILL.md` kurallarını okuyarak planı doğrudan uygular. |
| `"evet ama tdd hariç"` / `"onaylıyorum, X olmadan devam et"` | Hariç tuttuğunuz yeteneği atlar, kalan yeteneklerle ikinci kez kapı açmadan doğrudan uygular. |
| `<details>` kontratını başka pencereye yapıştırma | Vites 0 devreye girer; ikinci bir kart açmadan `<active_skills>` kurallarıyla uygular. |

### Türkçe Doğal Dil ve Çekim Eki Zekası (`hooks/prompt-optimizer-gate.mjs`)

- **Unicode Kelime Sınırları (`u` bayrağı):** JavaScript `\b` ifadesi Türkçe karakterleri (`ı, ş, ğ, ü, ö, ç`) kelime dışı saydığı için eski sürümlerde `"yazılım lisansı nedir"` cümlesinde `"yaz"`, `"kurşun"` kelimesinde `"kur"` yanlış tetikleniyordu. Unicode sınırları (`(?<![\p{L}\p{N}])`) ile salt okuma soruları tamamen koruma altına alındı.
- **Ünlüyle Biten Fiillerde `y` Kaynaştırma ve Ünsüz Yumuşaması:** `"bu hatayı düzeltir misin"`, `"M25 modülünü ekleyin"`, `"bu dosyayı güncelleyiniz"`, `"yeni modülü ekleyelim"`, `"klasörü taşıyın"` ve `"sisteme entegre edin"` gibi gerçek Türkçe istek kiplerinin tamamı yakalanır.
- **Akıllı Devam Geçişi ve Birim Testleri:** `"Evet, güncelle"`, `"evet ama X hariç uygula"` (`<= 80` karakter) ve `"Commit ve push et"` (`<= 60` karakter) gibi onay/devam mesajları ikinci kez onay kartı açmaz. Doğrulamak için:
  ```bash
  node --test hooks/prompt-optimizer-gate.test.mjs
  ```

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

### Full Mode (EN)
> **Input:** *"Add automatic priority routing to incoming support tickets based on urgency and module."*
>
> **Output:**
> **🎯 Detected Model:** Claude Sonnet 5.5
> **🧩 Matched Skills:** `nestjs-patterns` *(service & DTO validation)*, `test-driven-development` *(unit test verification)*
> **📌 Execution Plan (Summary):**
> - Add structured enum classification (`low | normal | urgent` + module taxonomy) in `src/tickets/router.service.ts`
> - Validate schema adherence and run unit tests before reporting completion
>
> `<details><summary>🔧 Optimized Execution Contract (Click to inspect or copy)</summary> ... <active_skills> ... </details>`
>
> **Proceed with this plan?** *(Say "yes" to execute with matched skills, or "yes without [skill]" to skip one.)*

### Tam Mod (TR)
> **Girdi:** *"Gelen destek taleplerini aciliyet ve modüle göre otomatik sınıflandıran servisi ekleyin."*
>
> **Çıktı:**
> **🎯 Tespit Edilen Model:** Claude Sonnet 5.5
> **🧩 Eşleşen Yetenekler:** `nestjs-patterns` *(servis ve DTO doğrulaması)*, `test-driven-development` *(birim test güvencesi)*
> **📌 Uygulama Planı (Özet):**
> - `src/tickets/router.service.ts` içinde `low | normal | urgent` ve modül sınıflandırma şeması oluşturulacak
> - Şema doğrulaması ve birim testleri çalıştırılarak sonuç raporlanacak
>
> `<details><summary>🔧 Optimize Edilmiş Görev Kontratı (İncelemek veya kopyalamak için tıklayın)</summary> ... <active_skills> ... </details>`
>
> **Bu planla devam edelim mi?** *(Eşleşen yeteneklerle uygulamak için "evet", birini atlamak için "evet ama [skill] hariç" diyebilirsiniz.)*

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
