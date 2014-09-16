module.exports = function (server) {
  'use strict';

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index.html', {});
    }
  });
};
