import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { classifyPrompt } from './prompt-optimizer-gate.mjs';

const HOOK = fileURLToPath(new URL('./prompt-optimizer-gate.mjs', import.meta.url));

test('approval replies bypass the gate, also with a short tail (observed failure in 1.0.0)', () => {
  for (const prompt of ['evet', 'Onaylıyorum', 'ok', 'Evet, güncelle', 'Onaylıyorum, uygula', 'evet düzelt ve push et', 'yes, go ahead']) {
    assert.equal(classifyPrompt(prompt), 'bypass', prompt);
  }
});

test('git follow-ups on approved work bypass the gate (observed failure in 1.0.0)', () => {
  for (const prompt of ['Commit ve push et', 'push', 'commitle', 'commit and push']) {
    assert.equal(classifyPrompt(prompt), 'bypass', prompt);
  }
});

test('Turkish words that only contain a verb stem are not change requests (observed failure in 1.0.0)', () => {
  for (const prompt of ['yazılım lisansı nedir', 'kurşun geçirmez cam hangi standarda girer', 'yazı tipi neden bozuk görünüyor']) {
    assert.equal(classifyPrompt(prompt), 'bypass', prompt);
  }
});

test('real change requests still trigger the gate, with Turkish verb suffixes', () => {
  for (const prompt of ['M25 modülünü ekle', 'giriş sayfasını yeniden yaz', 'bu hatayı düzeltir misin', 'Add a login page', 'install the skill']) {
    assert.equal(classifyPrompt(prompt), 'gear2-auto', prompt);
  }
});

test('explicit modes, other slash commands and pre-compiled contracts', () => {
  assert.equal(classifyPrompt('/small butonun rengini değiştir'), 'gear1');
  assert.equal(classifyPrompt('/promptla yeni modül'), 'gear2-explicit');
  assert.equal(classifyPrompt('/compact'), 'bypass');
  assert.equal(classifyPrompt('<documents>a</documents><task>b</task> uygula ve ekle'), 'bypass');
  assert.equal(classifyPrompt(''), 'bypass');
});

test('hook prints the gate only for change requests and never fails on bad input', () => {
  const run = input => execFileSync('node', [HOOK], { input }).toString();
  assert.match(run(JSON.stringify({ prompt: 'M25 modülünü ekle' })), /Auto Gate/);
  assert.equal(run(JSON.stringify({ prompt: 'Evet, güncelle' })), '');
  assert.equal(run('not json'), '');
});
