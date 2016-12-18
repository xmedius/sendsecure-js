import babel  from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify  from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
  entry: 'src/sendsecure.js',
  plugins: [
    resolve ({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel(babelrc(), {
      exclude: 'node_modules/**'
    }),
    uglify({}, minify),
  ],
  targets: [
    { dest: 'build/sendsecure.cjs.min.js', format: 'cjs', sourceMap: true },
    { dest: 'build/sendsecure.iife.min.js', format: 'iife', moduleName: 'SendSecure', sourceMap: true }
  ]
}
