import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`Request from IP: ${ip}`);
    next();
  }
}


