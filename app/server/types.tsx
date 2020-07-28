import { RequestHandler } from 'express';
import { Options as PinoOptions } from 'pino-http';

export type Envrionment = 'production' | 'development' | 'test';

type Route = {
  path: string | RegExp | Array<string | RegExp>;
  handler: RequestHandler;
};

export type EnvOption<T> = T | ((env: Envrionment) => T);
export type AppConfig = {
  port: EnvOption<number>;
  paths: Route[];
  loggingOptions?: EnvOption<PinoOptions>;
  assetHost?: string;
  staticRoot?: string;
};
