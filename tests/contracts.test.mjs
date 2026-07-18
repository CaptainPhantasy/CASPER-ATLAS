import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

const html = await readFile(new URL('../agents.html', import.meta.url), 'utf8');

test('standalone page has a closed publication boundary', () => {
  assert.match(html, /connect-src 'none'/);
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic|unpkg\.com/i);
  assert.doesNotMatch(html, /\/Users\/[^/]+\/|\/Volumes\/[^/]+\//i);
  assert.doesNotMatch(html, /new APIKeyManager\s*\(/);
  assert.match(html, /const apiConfig = null;/);
  assert.match(html, /const useAI = false;/);
});

test('inline JavaScript parses and contains no control bytes', () => {
  const controlCharacters = [...html].filter((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && !['\n', '\r', '\t'].includes(character);
  });
  assert.deepEqual(controlCharacters, []);

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .filter((script) => script.trim());
  assert.equal(scripts.length, 1);
  new vm.Script(scripts[0], { filename: 'agents.html:inline.js' });
});

test('recovered keyword detectors use real word boundaries', () => {
  assert.match(html, /match\(\/\\b\(api\|integration/);
  assert.match(html, /const hasML = \/\\b\(ml\|ai/);
  assert.match(html, /const isMultiTenant = \/\\b\(multi/);
  assert.match(html, /const hasMigration = \/\\b\(migration/);
  assert.match(html, /weeks: '\(\\\\d\+\)\\\\s\*weeks\?'/);
});
