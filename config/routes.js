(function () {
  'use strict';

  var adminControllers = require('./../server/controllers/admins.js'),
      recapControllers = require('./../server/controllers/recap.js'),
      talksControllers = require('./../server/controllers/talks.js');

  module.exports = [
  	{ method: 'GET', path: '/', config: recapControllers.index },

    { method: 'GET', path: '/admin', config: adminControllers.index },
    { method: ['GET', 'POST'], path: '/admin/login', config: adminControllers.login },
    { method: 'GET', path: '/admin/logout', config: adminControllers.logout },

    { method: 'GET', path: '/talks', config: talksControllers.index },
    { method: 'POST', path: '/talks', config: talksControllers.create },

    // Set the site assets
    require('./assets')
  ];

}).call(this);
