import cjsPlugin from '@rollup/plugin-commonjs';
import multiPlugin from '@rollup/plugin-multi-entry';
import resolvePlugin from '@rollup/plugin-node-resolve';

export default {
  input: '**/*',
  plugins: [multiPlugin({ exports: false }), cjsPlugin(), resolvePlugin()],
};
