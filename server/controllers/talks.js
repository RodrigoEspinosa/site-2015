(function () {
  'use strict';

  var Talk = require('./../database').Talk,
      Proposal = require('./../database').Proposal;

  module.exports.index = {
    handler: function (request, reply) {
      Talk.find({}, function (err, data) {
        return reply(data).type('application/json');
      });
    }
  };

  module.exports.create = {
    handler: function (request, reply) {
      var talk = new Proposal ({
        speaker: {
          name: request.payload['speaker-name'],
          email: request.payload['speaker-email']
        },
        description: request.payload['talk-description']
      });

      talk.save(function (err, talk) {
        if (err) { console.error(err); }
        console.log('New proposal: ', talk);
      });

      return reply.view('created-talk.html', {
        talk: talk
      });
    }
  };

}).call(this);
