/*
 * This module dump dummy data to the database.
 * Implicit for testing only.
 */
(function () {
  'use strict';

  let Talk = require('./database').Talk;

  let loremIpsum = [
    'Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing',
    'elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor',
    'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla',
    'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
    'culpa qui officia deserunt mollit anim id est laborum.'
  ],
  dummyProposal = {
    title: 'Talk name',
    description: loremIpsum
  };

  var callback = function (err, instance) {
    if (err) {
      console.error('There was an error dumping the dummy data.');
      return false;
    }

    console.log(instance);
  };

  for (let i=0; i<20; i++) {
    Talk.create(dummyProposal, callback);
  }

}).call(this);
