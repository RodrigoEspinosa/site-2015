(function () {
  'use strict';

  var Talk = require('./../database').Talk;

  var getProposals = function () {
    return Talk.find({});
  };

  // Set the site administration
  exports.index = {
    handler: function (request, reply) {
      reply.view('admin/index.html', {
        proposals: getProposals()
      });
    },
    // auth: 'github'
  };

  exports.login = {
    auth: {
      strategy: 'github',
      mode: 'try'
    },
    handler: function (request, reply) {
      request.auth.session.set(request.auth.credentials);
      return reply.redirect('/admin');
    }
  };

  exports.logout = {
    auth: 'github',
    handler: function (request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  };

}).call(this);
