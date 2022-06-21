import robotstxt, { type Options } from 'generate-robotstxt';
import { Compiler, sources, WebpackError, WebpackPluginInstance } from 'webpack';

export class RobotsTextWebpackPlugin implements WebpackPluginInstance {
  private readonly options: Options & { filePath: 'robots.txt' };

  /**
   * Creates a new `RobotsTextWebpackPlugin` that will emit a `robots.txt` file to the webpack output.
   *
   * @param options optional [`generate-robotstxt`](https://github.com/itgalaxy/generate-robotstxt) options
   */
  constructor(options?: Options) {
    this.options = { filePath: 'robots.txt', ...options };
  }

  apply(compiler: Compiler): void {
    const plugin = { name: this.constructor.name };

    compiler.hooks.compilation.tap(plugin, (compilation) => {
      compilation.hooks.additionalAssets.tapPromise(plugin, async () => {
        try {
          const contents = await robotstxt(this.options);
          const source = new sources.RawSource(contents);

          compilation.emitAsset(this.options.filePath, source);
        } catch (err) {
          if (err instanceof WebpackError) {
            compilation.errors.push(err);
          }
        }
      });
    });
  }
}
