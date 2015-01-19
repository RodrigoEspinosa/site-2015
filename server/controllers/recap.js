(function () {
  'use strict';

  var talkPlaceholderText = [
    '# TALK NAME',
    '',
    'Talk description here... this is markdown powered.',
    '',
    '------------',
    'My company can pay for my expenses? Yes, no, partialy.'
  ].join('\n');

  exports.index = {
    handler: function (request, reply) {
      return reply.view('index.html', {
        talkPlaceholder: talkPlaceholderText
      });
    }
  };

}).call(this);
