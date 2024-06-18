import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('* * * * * *', {
    name: 'notifications',
  })
  triggerNotifications() {
    this.logger.debug('called when the current second is 5');
  }

  // @Interval(1000)
  // handleInterval() {
  //   this.logger.debug('called every 10 seconds');
  // }

  closed() {
    const job = this.schedulerRegistry.getCronJob('notifications');
    job.stop();
    this.logger.warn('notifications cakes is closed');
  }

  // addCronJob(name: string, seconds: string) {
  //   const job = new CronJob(`${seconds} * * * * *`, () => {
  //     this.logger.warn(`time (${seconds}) for job ${name} to run`);
  //   });
  //   console.log(name, seconds);
  // }
}
