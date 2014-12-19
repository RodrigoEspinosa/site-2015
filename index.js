/*
 * Tick, tack, toe.
 * App access node.
 *
 */
var Hapi = require('hapi'),
    Good = require('good'),
    Path = require('path'),
    routes = require('./config/routes'),

    siteAuthentication = require('./server/auth'),

    // Set the server instance and configuration
    server = new Hapi.Server();

server.connection({ port: 3000 });

server.views({
  engines: {
    html: require('handlebars')
  },
  compileOptions: {
    pretty: true
  },
  relativeTo: __dirname,
  path: Path.join('public', 'templates'),
  layoutPath: Path.join('public', 'templates', 'layouts'),
  helpersPath: Path.join('public', 'templates', 'helpers'),
});

// Set the site authentication
siteAuthentication(server);

// Set the site routes
routes.forEach(function (route) {
  server.route(route);
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      args:[{ log: '*', response: '*' }]
    }]
  }
}, function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
