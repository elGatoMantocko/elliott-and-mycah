import cjsPlugin from '@rollup/plugin-commonjs';
import multiPlugin from '@rollup/plugin-multi-entry';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import sourcemapsPlugin from 'rollup-plugin-sourcemaps';

export default {
  input: '**/*',
  plugins: [
    sourcemapsPlugin(),
    multiPlugin({ exports: false }),
    cjsPlugin(),
    resolvePlugin(),
    replacePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
};
