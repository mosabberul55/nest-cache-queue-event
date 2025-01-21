import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('Response');

  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const resTime = new Date().getTime();
      const duration = resTime - reqTime;
      this.logger.log(`${method} ${url} ${res.statusCode} ${duration}ms ${ip}`);
    });
    next();
  }
}
