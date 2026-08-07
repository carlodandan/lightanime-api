import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.join(process.cwd(), 'src');

function collectFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

test('source tree should not use express', () => {
  const files = collectFiles(srcDir);
  const offenders = [];

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (text.includes("from 'express'") || text.includes('from "express"') || text.includes("require('express')") || text.includes('require("express")')) {
      offenders.push(path.relative(process.cwd(), file));
    }
  }

  assert.deepEqual(offenders, [], `Found Express imports in: ${offenders.join(', ')}`);
});
