import babel  from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/main.js',
  sourceMap: 'inline',
  plugins: [
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
