import babel  from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify  from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
  entry: 'src/sendsecure.js',
  sourceMap: 'inline',
  plugins: [
    resolve ({
      jsnext: true,
      main: true,
      browser: true,
    }),
    eslint(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify({}, minify),
  ],
  targets: [
    { dest: 'build/sendsecure.cjs.min.js', format: 'cjs' },
    { dest: 'build/sendsecure.iife.min.js', format: 'iife', moduleName: 'SendSecure' }
  ]
}
