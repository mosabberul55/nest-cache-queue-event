import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video', { concurrency: 3 })
export class VideoProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`job: ${job.name}`);
    switch (job.name) {
      case 'process':
        console.log('Processing video');
        break;
      case 'compress':
        console.log('Compressing video');
    }

    console.log(job.data);
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Job ${job.id} is active`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} is completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(`Job ${job.id} has failed with ${error.message}`);
  }
}
