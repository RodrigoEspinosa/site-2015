module.exports = function (server) {
  'use strict';

  var loremIpsum = [
    'Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing',
    'elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor',
    'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla',
    'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
    'culpa qui officia deserunt mollit anim id est laborum.'
  ];

  var dummyProposal = {
    title: 'Talk name',
    description: loremIpsum
  };

  var proposals = [];
  for (var i=0; i<20; i++) {
    proposals.push(dummyProposal);
  }

  server.route({
    method: 'GET',
    path: '/admin',
    handler: function (request, reply) {
      reply.view('admin/index.html', {
        proposals: proposals
      });
    }
  });
};
