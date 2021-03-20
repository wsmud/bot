const { sync } = require('glob');
const { build } = require('esbuild');
const { dirname, resolve, basename } = require('path');
const { existsSync, statSync, mkdirSync, copyFileSync } = require('fs');

build({
  entryPoints: sync('source/**/*.ts'),
  outdir: 'bundles',
  format: 'cjs',
  platform: 'node',
});

const helpFile = [
  ...sync('source/**/*.yml'),
  ...sync('source/**/*.json'),
  ...sync('source/**/*.yaml'),
];

helpFile.forEach((file) => {
  const dir = resolve('bundles', dirname(file).replace(/^.+?\//, ''));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (statSync(dir).isDirectory()) {
    copyFileSync(resolve(file), resolve(dir, basename(file)));
  }
});
