import { LogIpMiddleware } from './logger.middleware';

describe('LogIpMiddleware', () => {
  it('should be defined', () => {
    expect(new LogIpMiddleware()).toBeDefined();
  });
});
