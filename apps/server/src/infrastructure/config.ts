import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  HTTP_LOGGING: z.string().default('false'),
  HTTP_PORT: z.coerce.number().default(8000),
  WS_PORT: z.coerce.number().default(8001),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export interface AppConfig {
  httpLogging: boolean;
  httpPort: number;
  wsPort: number;
  jwtSecret: string;
  nodeEnv: 'development' | 'production' | 'test';
}

function getConfig(): AppConfig {
  const envs = EnvSchema.parse(process.env);

  if (envs.NODE_ENV === 'test') {
    envs.HTTP_PORT = 0;
  }

  return {
    httpLogging: envs.HTTP_LOGGING === 'true' ? true : false,
    httpPort: Number(envs.HTTP_PORT),
    wsPort: Number(envs.WS_PORT),
    nodeEnv: envs.NODE_ENV,

    // secret envs should be wrapped by getters not to show them when do `console.log(config)`
    get jwtSecret(): string {
      return envs.JWT_SECRET;
    },
  };
}

export const appConfig = getConfig();
