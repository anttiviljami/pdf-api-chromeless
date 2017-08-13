import * as Hapi from 'hapi';
import * as Joi from 'joi';

import * as inert from 'inert';
import * as vision from 'vision';
import * as blipp from 'blipp';
import * as swagger from 'hapi-swagger';

import { pdfHandler } from './handlers/pdf';
export async function createServer() {
  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8000,
  });

  // Add the route
  server.route({
    method: 'POST',
    path: '/pdf',
    config: {
      tags: ['api'],
      validate: {
      payload: Joi.object().keys({
        url: Joi.string().uri().required()
          .example('https://google.com'),
        options: Joi.object({
          userAgentString: Joi.string()
            .example('Mozilla'),
          }),
        }),
      },
      response: {
        schema: Joi.object().keys({
          pdf: Joi.string().example('https://s3.awscloud.com/google.pdf'),
        }),
      },
      handler: (req, reply) => pdfHandler(req, reply),
    },
  });

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
