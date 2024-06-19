import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import type { Logger as WinstonLogger } from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private winstonLogger: WinstonLogger;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    private configService: ConfigService<ConfigKeyPaths>,
  ) {
    super(context, options);
    this.initWinston();
  }

  protected initWinston(): void {}
}
