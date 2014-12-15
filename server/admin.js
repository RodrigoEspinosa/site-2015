module.exports = function (server) {
  'use strict';

  var Talk = require('./database').Talk;

  var getProposals = function () {
    return Talk.find({});
  };

  // Base admin route
  server.route({
    method: 'GET',
    path: '/admin',
    handler: function (request, reply) {
      reply.view('admin/index.html', {
        proposals: getProposals()
      });
    },
    config: {
     // auth: 'github'
    }
  });

};
