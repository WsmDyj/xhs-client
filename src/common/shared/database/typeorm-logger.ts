/**
 * @description 数据库日志
 */
import { Logger } from '@nestjs/common';
import { Logger as ITypeORMLogger, LoggerOptions } from 'typeorm';
export class TypeORMLogger implements ITypeORMLogger {
  private logger = new Logger(TypeORMLogger.name);

  constructor(private options: LoggerOptions) {}

  /**
   * 记录查询和其中使用的参数
   */
  logQuery(
    query: string,
    parameters?: any[],
    // queryRunner?: QueryRunner
  ) {
    if (!this.isEnable('query')) return;
    const sql =
      query + (parameters && parameters.length)
        ? `-- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '';
    this.logger.log(`[QUERY]: ${sql}`);
  }
  /**
   * 记录失败的查询。
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    // queryRunner?: QueryRunner,
  ) {
    if (!this.isEnable('error')) return;

    const sql =
      query +
      (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '');

    this.logger.error([`[FAILED QUERY]: ${sql}`, `[QUERY ERROR]: ${error}`]);
  }
  /**
   * 记录慢查询
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    // queryRunner?: QueryRunner,
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : '');

    this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`);
  }
  /**
   * 记录架构生成过程中的事件。
   */
  logSchemaBuild(
    message: string,
    // queryRunner?: QueryRunner
  ) {
    if (!this.isEnable('schema')) return;

    this.logger.log(message);
  }
  /**
   * 迁移运行过程中的事件。
   */
  logMigration(
    message: string,
    // queryRunner?: QueryRunner
  ) {
    if (!this.isEnable('migration')) return;

    this.logger.log(message);
  }
  log(
    level: 'warn' | 'info' | 'log',
    message: any,
    // _queryRunner?: QueryRunner,
  ) {
    if (!this.isEnable(level)) return;
    switch (level) {
      case 'warn':
        this.logger.warn(message);
        break;
      case 'info':
        this.logger.log(message);
        break;
      case 'log':
        this.logger.debug(message);
        break;
      default:
        break;
    }
  }

  /**
   * 将参数转换为字符串
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  private stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
  private isEnable(
    level: 'query' | 'schema' | 'error' | 'warn' | 'info' | 'log' | 'migration',
  ): boolean {
    return (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.includes(level))
    );
  }
}
