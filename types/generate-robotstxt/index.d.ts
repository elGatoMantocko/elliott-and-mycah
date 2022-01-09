declare module 'generate-robotstxt' {
  interface Policy {
    allow: string;
    cleanParam?: boolean;
    crawlDelay?: number | null;
    userAgent: string;
  }

  export interface Options {
    configFile?: string;
    policy?: Policy[];
    sitemap?: string;
    host?: string;
  }

  /**
   * Used to generate robots.txt file.
   */
  export default function (opts: Options): Promise<string>;
}
