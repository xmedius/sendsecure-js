import babel  from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'test/main.js',
  sourceMap: 'inline',
  plugins: [
    resolve ({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel(),
  ],
  dest: 'test/bundle.js',
  format: 'iife',
}
