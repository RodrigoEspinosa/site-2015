(function () {
  'use strict';

  module.exports = function (server) {
    // Admin authentication. Register bell with the server
    server.register(require('bell'), function () {
      // Set the Github login strategy with bel
      server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'cookie_encryption_password',
        clientId: '03acf50fe95e83601527',
        clientSecret: '9b5792c5b78ab3256088d4ab60713096caaa11a2',
        isSecure: false
      });
    });
  };

}).call(this);


// module.exports = function (server) {
//   'use strict';
//
//   // Admin authentication. Register bell with the server
//   server.register(require('bell'), function () {
//     // Set the Github login strategy with bel
//     server.auth.strategy('github', 'bell', {
//       provider: 'github',
//       password: 'cookie_encryption_password',
//       clientId: '03acf50fe95e83601527',
//       clientSecret: '17d5eb40281fdaaa9cf46a974fb5b4f4e34053bb',
//       isSecure: false
//     });
//
//     // server.auth.strategy('session', 'cookie', {
//     //   password: 'secret',
//     //   cookie: 'sid-example',
//     //   redirectTo: '/login',
//     //   isSecure: false
//     // });
//
//   });
// };
