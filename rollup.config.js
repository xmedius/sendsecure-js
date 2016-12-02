import babel  from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  sourceMap: 'inline',
  plugins: [
    resolve ({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    //eslint(),
  ],
  targets: [
    { dest: 'build/bundle.cjs.js', format: 'cjs' },
    { dest: 'build/bundle.iife.js', format: 'iife', moduleName: 'test' }
  ]
}
