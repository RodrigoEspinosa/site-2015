(function () {
  'use strict';

  var Talk = require('./../database').Talk;

  module.exports.index = {
    handler: function (request, reply) {
      Talk.find({}, function (err, data) {
        return reply(data).type('application/json');
      });
    }
  };

  module.exports.create = {
    handler: function (request, reply) {
      reply('POST');
    }
  };

}).call(this);
