/* eslint-env node, es2017 */
'use strict';
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');
const cssHandler = require('..').Handler;

const {expect} = Code;
const lab = exports.lab = Lab.script();

lab.test('returns css body from cookie', async () => {
  const server = Hapi.server({});
  server.route({
    method: 'GET',
    path: '/css',
    handler: cssHandler(),
  });
  await server.start();
  const response = await server.inject({
    'method': 'GET',
    'url': `${server.info.uri}/css`,
    'headers': {
      'Cookie': 'css_consent=foo',
    },
  });
  expect(response.statusCode).to.equal(200);
  expect(response.payload).to.equal('foo\n');
});
