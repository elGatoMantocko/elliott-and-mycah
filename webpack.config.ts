import * as CopyPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/**
 * Function to generate a base webpack config
 * @param mode to build webpack config for
 */
const factory = (mode = 'development'): Configuration => ({
  mode: mode === 'production' || mode === 'development' ? mode : 'none',
  devtool: 'source-map',
  devServer: {
    contentBase: [join('.', 'dist')],
    historyApiFallback: true,
    clientLogLevel: 'trace',
    compress: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      favicon: 'app/assets/favicon.ico',
      meta: {
        viewport: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        description: {
          name: 'description',
          content: 'Celebrate the wedding of Elliott and Mycah on June 12, 2021.',
        },
      },
      scriptLoading: 'defer',
      inject: 'body',
    }),
    new CopyPlugin({
      // favicon gets included in the HTMLWebpackPlugin
      patterns: ['app/assets/Lucian Schoenschrift CAT.ttf', 'app/assets/robots.txt'],
    }),
  ],
  module: {
    rules: [
      { test: /.tsx$/, use: 'ts-loader' },
      { test: /.(jpe?g|webp|png|gif|svg)$/, type: 'asset/resource' },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.js'],
  },
  output: {
    filename: '[name]-[contenthash].js',
  },
});

export const config: Configuration = {
  ...factory(process.env['NODE_ENV']),
  entry: './app/index.tsx',
  optimization: {
    providedExports: true,
    removeAvailableModules: true,
  },
};

export default config;
