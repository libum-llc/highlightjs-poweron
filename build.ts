import * as esbuild from 'esbuild';
import { promises as fs } from 'fs';

async function build(): Promise<void> {
  // Clean dist directory
  await fs.rm('dist', { recursive: true, force: true });
  await fs.mkdir('dist', { recursive: true });

  // Build UMD version (for browsers/CDN)
  await esbuild.build({
    entryPoints: ['src/poweron.ts'],
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'hljsDefinePowerOn',
    outfile: 'dist/poweron.min.js',
    footer: {
      js: 'if (typeof exports === "object" && typeof module !== "undefined") { module.exports = hljsDefinePowerOn; }',
    },
  });

  // Build ES module version
  await esbuild.build({
    entryPoints: ['src/poweron.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'dist/poweron.es.min.js',
  });

  // Build non-minified ES module version
  await esbuild.build({
    entryPoints: ['src/poweron.ts'],
    bundle: false,
    format: 'esm',
    outfile: 'dist/poweron.js',
    platform: 'neutral',
  });

  console.log('✅ Build complete: dist/poweron.min.js, dist/poweron.es.min.js, dist/poweron.js');
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
