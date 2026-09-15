/* eslint-disable no-console */
// Regenerates build-info.json, which the SORA component logs on load so the
// build deployed to Pega can be identified. Wired to the prepublish and
// prebuildComponent npm hooks, so it runs without being remembered.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const git = (args) => {
  try {
    return execSync(`git ${args}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return '';
  }
};

const buildInfo = {
  builtAt: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  commit: git('rev-parse --short HEAD') || 'unknown',
  branch: git('rev-parse --abbrev-ref HEAD') || 'unknown',
  // a dirty build is one that does not correspond to any commit, which is
  // worth seeing in the console when a deployed build misbehaves
  dirty: git('status --porcelain') !== '',
};

const target = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'EASA_Extensions_SORA',
  'build-info.json',
);

fs.writeFileSync(target, `${JSON.stringify(buildInfo, null, 2)}\n`);
console.log(
  `build-info: ${buildInfo.commit}${buildInfo.dirty ? ' (dirty)' : ''} on ${buildInfo.branch} at ${buildInfo.builtAt}`,
);
