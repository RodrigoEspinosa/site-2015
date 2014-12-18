/*
 * Models definitions
 */
(function () {
  'use strict';

  // Require the mongoose mongodb drive
  var mongoose = require('mongoose');

  // Connect to the database
  mongoose.connect('mongodb://localhost');

  module.exports.Proposal = mongoose.model('Proposal', {
    text: String
  });

  module.exports.Speaker = mongoose.model('Spekaer', {
    name: String,
    email: String
  });

  module.exports.Talk = mongoose.model('Talk', {
    title: String,
    description: String
  });

  module.exports.Organizer = mongoose.model('Organizer', {
    name: String
  });

  module.exports.TalkVote = mongoose.model('TalkVote', {
    talk: {
      type: mongoose.Schema.ObjectId,
      ref: 'Talk'
    },
    votedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organizer'
    }
  });

}).call(this);
