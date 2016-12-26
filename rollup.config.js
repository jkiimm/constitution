// Rollup plugins
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import css from 'rollup-plugin-css-only';

export default {
  entry: 'src/scripts/main.js',
  dest: 'build/assets/js/main.js',
  format: 'iife',
  sourceMap: false,
  context: 'window',
  plugins: [
    css({ output: 'build/assets/css/style.css' }),
    babel({ include: 'src/scripts/**/*.js', exclude: 'node_modules/**' }),
    svelte({ include: 'src/components/**/*.html' }),
    globals(),
    builtins(),
    nodeResolve({ jsnext: true, main: true, browser: true, preferBuiltins: true }),
    commonjs(),
  ],
};
