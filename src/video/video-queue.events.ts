import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@QueueEventsListener('video')
export class VideoQueueEvents extends QueueEventsHost {
  logger = new Logger('VideoQueueEvents');

  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    this.logger.log(
      `Job ${job.jobId} has been added to the queue from ${job.name}`,
    );
  }
}
