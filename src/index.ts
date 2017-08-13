import * as Hapi from 'hapi';
import * as logger from 'winston';

async function start() {
  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port: 8000,
  });

  // Add the route
  server.route({
    method: 'GET',
    path: '/test',
    handler: (request, reply) => {
      return reply({ test: 1 });
    },
  });

  try {
    await server.start();
    logger.info(`Server started at ${server.info.uri}`);
  } catch (e) {
    logger.error('Server failed to start', e);
    process.exit(1);
  }

  return server;
}

start();
