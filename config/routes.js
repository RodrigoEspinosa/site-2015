(function () {
  'use strict';

  var endpoints = [
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        return reply.view('index.html', {});
      }
    }
  ];

  module.exports = (function () {
    return endpoints;
  }).call(this);

  module.exports.endpoints = endpoints;

}).call(this);
