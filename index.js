/*
 * Tick, tack, toe.
 * App access node.
 *
 */
var Hapi = require('hapi'),
    Good = require('good'),
    Path = require('path'),
    routes = require('./config/routes'),

    // siteAssets = require('./server/assets'),
    // siteDatabase = require('./server/database'),
    siteAuthentication = require('./server/auth'),
    // siteAdministration = require('./server/admin');
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

// Set the site database
// siteDatabase(server);

// Set the site authentication
siteAuthentication(server);

// Set the site routes
routes.forEach(function (route) {
  server.route(route);
});

// Set the site assets
// siteAssets(server);

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
