import 'webpack-dev-server';

// eslint-disable-next-line import/namespace
import * as CopyPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import { Configuration, DefinePlugin, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { GenerateSW } from 'workbox-webpack-plugin';

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
  /**
   * if true, service worker is not included in the bundle (defaults to false)
   */
  noSW?: boolean;
};
/**
 * Function to generate a base webpack config
 *
 * @param config configuration object that abstracts webpack config
 * @param config.devtool to use for sourcemaps/dev utils (defaults to 'source-map')
 * @param config.mode mode to build the webpack bundle in (defaults to 'production')
 * @param config.noOutput if true, no output will be generated (defaults to false)
 * @param config.noSW if true, service-worker is not included in the bundle (defaults to false)
 * @returns webpack config
 */
export const factory = ({
  devtool = 'source-map',
  mode = 'production',
  noOutput = false,
  noSW = false,
}: Config): Configuration => {
  const plugins: WebpackPluginInstance[] = [
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
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
    new CopyPlugin({
      // favicon gets included in the HTMLWebpackPlugin and font is imported in the theme
      patterns: ['app/assets/robots.txt'],
    }),
  ];

  !noSW &&
    plugins.push(
      new GenerateSW({
        mode,
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/.html$/g, /.js.map$/g], // don't precache the html or sourcemaps
      }),
    );

  return {
    mode,
    devtool,
    devServer: {
      static: { directory: join('.', 'dist') },
      historyApiFallback: true,
      client: { logging: 'info' },
      compress: true,
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
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
 *
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
 *
 * @param flag name of the flag to check
 * @returns boolean if the flag exists or undefined
 */
const checkEnvFlag = (flag: string): boolean | undefined => {
  if (process.env[flag] != null) {
    return Boolean(process.env[flag]);
  }
  return;
};

export const config: Configuration = {
  ...factory({
    devtool: process.env['WEBPACK_DEV_TOOL'] ?? 'source-map',
    mode: getEnvMode(process.env['WEBPACK_MODE'] ?? process.env['NODE_ENV']),
    noOutput: checkEnvFlag('WEBPACK_NO_OUTPUT'),
    noSW: checkEnvFlag('WEBPACK_NO_SERVICE_WORKER'),
  }),
  entry: './app/index.tsx',
  optimization: {
    providedExports: true,
    removeAvailableModules: true,
  },
};

export default config;
