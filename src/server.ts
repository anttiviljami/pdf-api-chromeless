import * as Hapi from 'hapi';

import * as inert from 'inert';
import * as vision from 'vision';
import * as blipp from 'blipp';
import * as swagger from 'hapi-swagger';

import { routes } from './routes';
export async function createServer() {
  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8000,
  });

  // Add the route
  server.route(routes);

  server.register([
    blipp, // show our routes on startup
    inert, // static file server
    vision, // template rendering plugin
    {
      register: swagger,
      options: {
      info: {
        title: 'PDF API Livecoding',
        version: '1.0.0',
      },
      swaggerUI: true,
      },
    },
  ]);

  return server;
}
