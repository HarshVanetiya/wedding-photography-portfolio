// Runs after `next build` (npm "postbuild").
//
// Works around a Next.js static-export bug on Windows: prefetch files for dynamic
// routes are written as nested folders (out/stories/<slug>/__next.stories/$d$slug/__PAGE__.txt)
// instead of one dotted filename (__next.stories.$d$slug.__PAGE__.txt), so link
// prefetching 404s. Builds on macOS/Linux are already correct and this does nothing.

import { cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(import.meta.dirname, '..', 'out');

async function filesUnder(dir, prefix = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? filesUnder(path.join(dir, entry.name), [...prefix, entry.name])
        : [[...prefix, entry.name]],
    ),
  );
  return nested.flat();
}

async function flatten(dir) {
  let fixed = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) {
      for (const parts of await filesUnder(full)) {
        await cp(path.join(full, ...parts), path.join(dir, [entry.name, ...parts].join('.')));
        fixed++;
      }
      await rm(full, { recursive: true });
    } else {
      fixed += await flatten(full);
    }
  }
  return fixed;
}

const fixed = await flatten(OUT_DIR);
if (fixed) console.log(`fix-static-export: flattened ${fixed} prefetch file(s)`);
