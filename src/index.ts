import * as Hapi from 'hapi';
import * as logger from 'winston';

import { screenshotURL } from './util/chromeless';

async function pdfHandler(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
  try {
    const { url } = request.payload;
    const screenshot = await screenshotURL(url);
    return reply({ screenshot });
  } catch (err) {
    return reply({ error: err.message })
      .code(400);
  }
}

async function start() {
  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8000,
  });

  // Add the route
  server.route({
    method: 'POST',
    path: '/pdf',
    handler: (req, reply) => pdfHandler(req, reply),
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
