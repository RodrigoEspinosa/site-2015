(function () {
  'use strict';

  var markdown = require('markdown').markdown,
      Talk = require('./../database').Talk,
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
      var talk = new Proposal({
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
        talk: talk,
        description: markdown.toHTML(talk.description)
      });
    }
  };

  module.exports.view = {
    handler: function (request, reply) {
      Proposal.findOne({_id: request.params.id}, function (err, proposal) {
        if (err) {
          console.error(err);
          return reply(err);
        }

        console.log('Viewing proposal: ', proposal);
        return reply.view('created-talk.html', {
          talk: proposal,
          description: markdown.toHTML(proposal.description)
        });
      });
    }
  };

}).call(this);
