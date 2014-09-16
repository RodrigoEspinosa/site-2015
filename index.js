var Hapi = require('hapi'),
    siteRoutes = require('./server/routes'),
    siteAssets = require('./server/assets'),
    siteAdministration = require('./server/admin');

// Set the server instance and configuration
var server = new Hapi.Server(3000, {
  // Set the view configuration
  views: {
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/public/templates'
  }
});

// Set the site routs
siteRoutes(server);

// Set the site assets
siteAssets(server);

// Set the site administration
siteAdministration(server);

// Start the server
server.start(function () {
  console.log('Server running at:', server.info.uri);
});
