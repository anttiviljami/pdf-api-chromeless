import * as logger from 'winston';
import { createServer } from './server';

(async function start() {
  const server = await createServer();
  try {
    await server.start();
    logger.info(`Server started at ${server.info.uri}`);
  } catch (e) {
    logger.error('Server failed to start', e);
    process.exit(1);
  }

  return server;
})();
