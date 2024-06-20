import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, LoggerOptions } from 'typeorm';
import { ConfigKeyPaths } from '~/config';
import { IDatabaseConfig, dbRegToken } from '~/config/database.config';
import { TypeORMLogger } from './typeorm-logger';
import { env } from '~/common/global/env';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const loggerOptions: LoggerOptions = env('DB_LOGGING') as 'all';
        console.log('--->loggerOptions', JSON.parse(loggerOptions));
        return {
          ...configService.get<IDatabaseConfig>(dbRegToken),
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions),
        };
      },
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
