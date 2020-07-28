import cjsPlugin from '@rollup/plugin-commonjs';
import multiPlugin from '@rollup/plugin-multi-entry';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';

export default {
  input: '**/*',
  plugins: [
    multiPlugin({ exports: false }),
    cjsPlugin(),
    resolvePlugin(),
    replacePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
};
