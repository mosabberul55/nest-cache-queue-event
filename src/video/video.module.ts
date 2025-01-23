import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessor } from './video.processor';
import { VideoQueueEvents } from './video-queue.events';

@Module({
  imports: [BullModule.registerQueue({ name: 'video' })],
  controllers: [VideoController],
  providers: [VideoService, VideoProcessor, VideoQueueEvents],
})
export class VideoModule {}
