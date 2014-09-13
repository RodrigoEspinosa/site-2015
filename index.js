var Hapi = require('hapi');

console.log(__dirname + '/templates');

var server = new Hapi.Server(3000, {
  views: {
    engines: { html: require('handlebars') },
    path: __dirname + '/templates'
  }
});

// var assetOptions = {
//   development: {
//     js: ['js/one.js', 'js/two.js'],
//     css: ['css/one.css', 'css/two.css']
//   },
//   production: {
//     js: ['js/scripts.js'],
//     css: ['css/styles.css']
//   }
// };
//
// server.pack.require('hapi-assets', assetOptions, function(err){
//   if(err){
//     console.log('Failed loading plugin cache-buster');
//   }
// });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index.html', {});
  }
});


var loremIpsum = [
  'Lorem ipsum doLorem ipsum dolor sit amet, consectetur adipisicing',
  'elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor',
  'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla',
  'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
  'culpa qui officia deserunt mollit anim id est laborum.'
];

var dummyProposal = {
  title: 'Talk name',
  description: loremIpsum
};

server.route({
  method: 'GET',
  path: '/admin',
  handler: function (request, reply) {
    reply.view('admin/index.html', {
      proposals: new Array(20).join(dummyProposal)
    });
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'assets',
      listing: true
    }
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
