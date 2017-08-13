import 'mocha';
import * as chai from 'chai';

import { createServer } from '../src/server';

chai.should();

describe('our api', function describe() {
  it('should return a swagger.json from GET /swagger.json', async function test() {
    const server = await createServer();
    await server.initialize();

    const response = await server.inject({
      method: 'GET',
      url: '/swagger.json',
    });

    const { result } = response;
    result.should.have.property('swagger');
  });
});
