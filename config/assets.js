/*
 * Assets configuration.
 */
(function () {
  'use strict';

  module.exports = {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public/assets',
        listing: true
      }
    }
  };

}).call(this);
