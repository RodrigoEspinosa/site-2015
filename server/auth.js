module.exports = function (server) {
  'use strict';

  // Admin authentication. Register bell with the server
  server.pack.register(require('bell'), function () {
    // Set the Github login strategy with bel
    server.auth.strategy('github', 'bell', {
      provider: 'github',
      password: 'cookie_encryption_password',
      clientId: '03acf50fe95e83601527',
      clientSecret: '17d5eb40281fdaaa9cf46a974fb5b4f4e34053bb',
      isSecure: false
    });

    // server.auth.strategy('session', 'cookie', {
    //   password: 'secret',
    //   cookie: 'sid-example',
    //   redirectTo: '/login',
    //   isSecure: false
    // });

    server.route({
      method: ['GET', 'POST'],
      path: '/admin/login',
      config: {
        auth: {
          strategy: 'github',
          mode: 'try'
        },
        handler: function (request, reply) {
          request.auth.session.set(request.auth.credentials);
          return reply.redirect('/admin');
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/admin/logout',
      config: {
        auth: 'github',
        handler: function (request, reply) {
          request.auth.session.clear();
          return reply.redirect('/');
        }
      }
    });

  });
};
