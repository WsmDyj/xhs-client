import { AppConfig, IAppConfig, appRegToken } from './app.config';
import { DatabaseConfig, IDatabaseConfig, dbRegToken } from './database.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [dbRegToken]: IDatabaseConfig;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig,
  DatabaseConfig,
};
