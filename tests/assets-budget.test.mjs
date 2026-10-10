import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, statSync} from 'node:fs';
const root = new URL('../public/assets/health/', import.meta.url);
test('all five responsive illustration families stay below 100 KiB per file and 350 KiB total', () => {
  const files = readdirSync(root);
  assert.equal(files.length, 10);
  assert(files.every(file => file.endsWith('.webp')));
  let total = 0;
  for (const file of files) {
    const size = statSync(new URL(file, root)).size;
    assert(size < 100 * 1024, `${file} exceeds the image budget`);
    total += size;
  }
  assert(total < 350 * 1024, `responsive image variants exceed total budget: ${total}`);
});
