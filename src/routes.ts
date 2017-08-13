import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { pdfHandler } from './handlers/pdf';

export const routes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/pdf',
    config: {
      tags: ['api'],
      validate: {
      payload: Joi.object().keys({
        url: Joi.string().uri()
          .example('https://google.com'),
        html: Joi.string()
          .example('<h1>Title</h1><p>Hello World</p>'),
        options: Joi.object({
          userAgentString: Joi.string()
            .example('Mozilla'),
          }),
        }).xor('url', 'html'),
      },
      response: {
        schema: Joi.object().keys({
          pdf: Joi.string().example('https://s3.awscloud.com/google.pdf'),
        }),
      },
      handler: (req, reply) => pdfHandler(req, reply),
    },
  },
];
