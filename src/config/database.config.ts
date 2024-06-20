/**
 * @description 数据库配置
 */

import { ConfigType, registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { env, envBoolean, envNumber } from '~/common/global/env';

export const dbRegToken = 'database';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: env('DB_HOST', '127.0.0.1'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  // 指示是否在每次应用程序启动时自动创建数据库架构
  synchronize: envBoolean('DB_SYNCHRONIZE', false),
};

export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions,
);

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;
