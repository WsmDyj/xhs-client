import { ConfigType, registerAs } from '@nestjs/config';
import { env, envNumber } from '~/common/global/env';

export const appRegToken = 'app';

export const AppConfig = registerAs(appRegToken, () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  globalPrefix: env('GLOBAL_PREFIX', 'api'),
  logger: {
    level: env('LOGGER_LEVEL'),
    maxFiles: envNumber('LOGGER_MAX_FILES'),
  },
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
