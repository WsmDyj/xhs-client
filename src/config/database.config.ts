/**
 * @description 数据库配置
 */

import { ConfigType, registerAs } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { env, envBoolean, envNumber } from '~/common/global/env';
import dotenv from 'dotenv';
export const dbRegToken = 'database';

// 加载环境变量
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const currentScript = process.env.npm_lifecycle_event;
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: env('DB_HOST', '127.0.0.1'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  // 指示是否在每次应用程序启动时自动创建数据库架构
  synchronize: envBoolean('DB_SYNCHRONIZE', false),
  multipleStatements: currentScript === 'typeorm',
};

export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions,
);

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
