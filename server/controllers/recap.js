(function () {
  'use strict';

  var talkPlaceholderText = [
    '# TALK NAME',
    '',
    'Please write your talk description here, explaining what\'s about... this is markdown powered.',
    'Remember that everyone in the conference must adhere to the code of conduct',
    '',
    '------------',
    'Let us know if you or your company can cover your expenses or if you need us to assist you.'
  ].join('\n');

  exports.index = {
    handler: function (request, reply) {
      return reply.view('index.html', {
        talkPlaceholder: talkPlaceholderText
      });
    }
  };
  exports.codeOfConduct = {
    handler: function(request, reply) {
      return reply.view('code-of-conduct.html');
    }
  };

}).call(this);
