import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000,
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
