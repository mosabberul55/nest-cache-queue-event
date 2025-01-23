import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { StudentModule } from './student/student.module';
import { redisStore } from 'cache-manager-redis-yet';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { BullModule } from '@nestjs/bullmq';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000,
      store: redisStore,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 3000,
      },
    }),
    StudentModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
