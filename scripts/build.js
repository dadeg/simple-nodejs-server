const rimraf = require('rimraf');
const shell = require('shelljs');

shell.rm('-rf', 'dist');

tsc({ module: 'es2015',   target: 'esnext', declaration: true });
tsc({ module: 'amd',      target: 'es2015', lib: 'esnext', forof: true });
tsc({ module: 'commonjs', target: 'es2015', lib: 'esnext', forof: true });

function tsc({ target, module, lib, forof, declaration, to }, command) {
  let options = ['-p .'];
  if (lib) options.push(`--lib ${lib}`);
  if (forof) options.push(`--downlevelIteration`);
  if (declaration) options.push(`--declaration --declarationDir dist/types`);

  options.push(`--target ${target}`, `--module ${module}`, `--outDir dist/${module}`);

  shell.exec(`tsc ${options.join(' ')}`, { async: false });
}
