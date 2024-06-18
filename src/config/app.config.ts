import { ConfigType, registerAs } from '@nestjs/config';
import { env } from '~/common/global/env';
export const appRegToken = 'app';

export const AppConfig = registerAs(appRegToken, () => ({
  name: env('APP_NAME'),
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
