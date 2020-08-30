import { RequestHandler } from 'express';
import { Options as PinoOptions } from 'pino-http';

export type Envrionment = 'production' | 'development' | 'test';

type Route = {
  path: string | RegExp | Array<string | RegExp>;
  handler: RequestHandler;
};

export type EnvOption<T> = T | ((env: Envrionment) => T);
export type AppConfig = {
  host: string;
  port: number;
  secure: boolean;
  paths: Route[];
  loggingOptions?: EnvOption<PinoOptions>;
  staticRoot: string;
};
