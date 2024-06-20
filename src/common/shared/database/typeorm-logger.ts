/**
 * @description 数据库日志
 */
import { Logger } from '@nestjs/common';
import { Logger as ITypeORMLogger, LoggerOptions, QueryRunner } from 'typeorm';
export class TypeORMLogger implements ITypeORMLogger {
  private logger = new Logger(TypeORMLogger.name);

  constructor(private options: LoggerOptions) {}

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    throw new Error('Method not implemented.');
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  log(level: 'warn' | 'info' | 'log', message: any, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
}
