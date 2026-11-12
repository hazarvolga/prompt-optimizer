# Changelog / Değişiklik Günlüğü

## 1.1.0 (2026-11-12)

Fixes found while using 1.0.0 in a real Turkish-language project. Each change lists the observed problem, the fix, and why.
Gerçek bir Türkçe projede 1.0.0 kullanılırken bulunan sorunların düzeltmeleri. Her madde gözlenen sorunu, yapılan değişikliği ve nedenini yazar.

### Scope / Kapsam

| Part | Where it runs | Affected by this release |
|---|---|---|
| `hooks/prompt-optimizer-gate.mjs` | Claude Code only (`UserPromptSubmit`) | Changes 1, 2, 3 |
| `skills/prompt-optimizer/` | Every tool that reads the skill (Claude, Codex, Gemini, Agents, MLX) | Changes 4, 5 |
| `install.sh` | Local installation | Change 6 |

Codex and Gemini have no equivalent hook here; for them the skill text (changes 4 and 5) is what controls the gate.
Codex ve Gemini tarafında bu hook yoktur; onlar için kapıyı skill metni (4 ve 5) belirler.

### 1. Approvals with a short tail re-opened the gate / Kısa ek içeren onaylar kapıyı yeniden açıyordu

- **Observed (1.0.0):** `Evet, güncelle` and `Commit ve push et` printed the Auto Gate reminder, asking for a new approval card right after the user had approved. The skill's own Gear 0 says to skip the card here, so every such turn started with a contradiction.
- **Gözlenen:** Kullanıcı onay verdikten hemen sonra yazdığı `Evet, güncelle` ve `Commit ve push et` mesajları yeniden kart istiyordu; skill'in kendi Gear 0 kuralı ise burada kartı atlamayı söylüyor.
- **Fix:** a message that starts with an approval word and is at most 80 characters, or a git-only follow-up (`commit`, `push`, `merge`) of at most 60 characters, bypasses the gate.
- **Why:** these messages act on work the user already approved; asking again adds friction and teaches the user to ignore the card.

### 2. Turkish letters broke word boundaries / Türkçe harfler kelime sınırını bozuyordu

- **Observed (1.0.0):** `yazılım lisansı nedir` (a read-only question) triggered the gate, because JavaScript `\b` treats `ı` as a non-word character, so `yaz` (write) matched inside `yazılım` (software). The same happened with `kur` in `kurşun`.
- **Gözlenen:** `\b` Türkçe harfleri tanımadığı için `yaz` kökü `yazılım` içinde eşleşiyor, salt okuma soruları kart tetikliyordu.
- **Fix:** Unicode-aware boundaries (`(?<![\p{L}\p{N}])` with the `u` flag).
- **Why:** the gate must react to change requests, not to words that happen to start with a verb stem.

### 3. Turkish verb forms were missed / Türkçe fiil çekimleri kaçırılıyordu

- **Observed (1.0.0):** `bu hatayı düzeltir misin` (a change request) passed silently, because the stem had to be followed by a word boundary.
- **Gözlenen:** `düzeltir misin` gibi gerçek bir değişiklik isteğinde kart hiç gösterilmiyordu.
- **Fix:** each stem may be followed by a common Turkish verb suffix (`-ir`, `-ır`, `-sın`, `-elim`, ...).
- **Why:** missing a real change request is worse than an extra card: it is the failure the gate exists to prevent.

The decision logic is now a pure function (`classifyPrompt`) with unit tests in `hooks/prompt-optimizer-gate.test.mjs`, covering every case above. Run `node --test hooks/prompt-optimizer-gate.test.mjs`.

### 4. The skill loaded on almost every message / Skill neredeyse her mesajda yükleniyordu

- **Observed (1.0.0):** the description said to read the skill before *every* bugfix or edit, so it was loaded for one-line follow-ups too, costing tokens and time.
- **Gözlenen:** "Her değişiklikten önce oku" ifadesi skill'in tek satırlık devam mesajlarında da yüklenmesine yol açıyordu.
- **Fix:** the description and Gear 2 trigger now name NEW multi-file features, architecture, refactors and content generation. Gear 0 also covers approvals with a short tail, git follow-ups and the next step of an already approved plan. Single-spot changes the user described exactly go through Gear 1.
- **Why:** the approval gate stays where it protects the user (new, multi-file work) and gets out of the way elsewhere.

### 5. API rules made precise / API kuralları netleştirildi

- **Checked:** the two hard rules in `references/claude-core-rules.md` against the Claude API reference on 2026-11-12. Both were correct in substance.
- **Kontrol edildi:** iki API kuralı resmi Claude API belgesiyle karşılaştırıldı; özünde doğruydular.
- **Made precise:** prefill returns 400 on the 4.6+ family and later (Haiku 4.5 still accepts it); `budget_tokens` returns 400 from Opus 4.7 on, while Opus 4.6 / Sonnet 4.6 still accept it as deprecated; `xhigh` effort exists from Opus 4.7 on; default effort is `medium` on Opus 5.5 and Haiku 5.5; on Opus 4.7 / 4.8, omitting `thinking` means no thinking.
- **Why:** a prompt compiler that writes API code must not overstate or understate what the API rejects.

### 6. Gemini install path / Gemini kurulum yolu

- **Observed (1.0.0):** `install.sh` installed only into `~/.gemini/config/skills`, while some setups read `~/.gemini/skills`; that copy stayed on the old version.
- **Gözlenen:** `~/.gemini/skills` klasöründeki kopya eski sürümde kalıyordu.
- **Fix:** the installer updates both locations when they exist.
- **Why:** two copies of one skill on different versions give different behaviour in the same tool.

## 1.0.0 (2026-11-11)

Initial public release.
