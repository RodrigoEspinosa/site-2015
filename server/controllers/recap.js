(function () {
  'use strict';

  exports.index = {
    handler: function (request, reply) {
      return reply.view('index.html', {
        talkPlaceholder: 'This is the form.'
      });
    }
  };

}).call(this);
