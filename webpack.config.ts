import 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { join } from 'path';
import {
  Configuration,
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  WebpackPluginInstance,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { GenerateSW } from 'workbox-webpack-plugin';

import { RobotsTextWebpackPlugin } from './build';

// configure supported locales for date-fns
type SupportedLocales = 'en-US';
const supportedLocales: SupportedLocales[] = ['en-US'];

type Config = {
  /**
   * To use for sourcemaps/dev utils (defaults to 'source-map')
   */
  devtool?: string | false;
  /**
   * Mode to build the webpack bundle in (defaults to 'production')
   */
  mode?: 'development' | 'production' | 'none';
  /**
   * if true, no output will be generated (defaults to false)
   */
  noOutput?: boolean;
};
/**
 * Function to generate a base webpack config
 * @param config configuration object that abstracts webpack config
 * @param config.devtool to use for sourcemaps/dev utils (defaults to 'source-map')
 * @param config.mode mode to build the webpack bundle in (defaults to 'production')
 * @param config.noOutput if true, no output will be generated (defaults to false)
 * @returns webpack config
 */
export const factory = ({
  devtool = 'source-map',
  mode = 'production',
  noOutput = false,
}: Config): Configuration => {
  const plugins: WebpackPluginInstance[] = [
    // https://date-fns.org/v2.28.0/docs/webpack
    new ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]index\.js$`),
    ),
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
    new GenerateSW({
      mode,
      clientsClaim: true,
      skipWaiting: false,
      exclude: [/index\.html/, /\.map$/, /^manifest.*\.js$/],
    }),
    // default config will emit a basic robots.txt file to the dist
    new RobotsTextWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
    new ProgressPlugin(),
  ];

  return {
    mode,
    devtool,
    devServer: {
      static: { directory: join('.', 'dist') },
      historyApiFallback: true,
      client: { logging: 'info', overlay: { warnings: false } },
      compress: true,
      hot: false,
      liveReload: false,
      devMiddleware: {
        writeToDisk: true,
      },
    },
    plugins,
    optimization: {
      providedExports: true,
      removeAvailableModules: true,
      splitChunks: { chunks: 'all' },
      minimizer: [
        // magic `...` to extend other plugins (DO NOT GET RID OF THIS, or you lose `TerserWebpackPlugin`)
        '...',
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossy optimization with custom option
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['mozjpeg', { progressive: true, quality: 25 }],
                ['pngquant', { optimizationLevel: 5 }],
              ],
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        { test: /.(jpe?g|webp|png|gif|svg|ttf)$/, type: 'asset/resource' },
      ],
    },
    resolve: {
      modules: ['node_modules', './app'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: !noOutput ? { filename: '[name]-[contenthash].js' } : undefined,
  };
};

enum BuildMode {
  Prod = 'production',
  Dev = 'development',
  None = 'none',
}
/**
 * Function to map an environment to a `BuildMode`.
 * @param mode coerce this to a `BuildMode` enum
 * @returns enum describing the build mode
 */
const getEnvMode = (mode?: string): BuildMode | undefined => {
  switch (mode) {
    case BuildMode.Prod:
    case BuildMode.Dev:
    case BuildMode.None:
      return mode;
    default:
      return undefined;
  }
};

/**
 * Function to check a boolean env flag.
 * @param flag name of the flag to check
 * @returns boolean if the flag exists or undefined
 */
const checkEnvFlag = (flag: string): boolean | undefined => {
  if (process.env[flag] != null) {
    return Boolean(process.env[flag]);
  }
  return;
};

const baseConfig = factory({
  devtool: process.env['WEBPACK_DEV_TOOL'] ?? 'source-map',
  mode: getEnvMode(process.env['WEBPACK_MODE'] ?? process.env['NODE_ENV']),
  noOutput: checkEnvFlag('WEBPACK_NO_OUTPUT'),
});

export const config: Configuration = {
  ...baseConfig,
  entry: './app/index.tsx',
};

export default config;
