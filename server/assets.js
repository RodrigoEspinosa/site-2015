module.exports = function (server) {
  'use strict';

  var fs = require('fs'),
      path = require('path'),
      sass = require('node-sass'),
      publicDirectory = path.join(__dirname, '..','public'),
      assetsDirectory = path.join(publicDirectory, 'assets'),
      adminScssPath = path.join(assetsDirectory, 'admin', 'scss');

  fs.readdirSync(adminScssPath).forEach(function (name) {
    if (path.extname(name) === '.scss' || path.extname(name) === '.sass') {
      sass.renderFile({
        file: path.join(adminScssPath, name),
        includePath: [adminScssPath, path.join(adminScssPath, 'bootflat')],
        outputStyle: 'compressed',
        outFile: path.join(assetsDirectory, 'admin', 'css', path.basename(name, path.extname(name)) + '.css'),
        sourceMaps: true,
        success: function (res) { console.log(res); },
        error: function (err) { console.error(err); }
      });
    }
  });

  // var assetOptions = {
  //   admin: {
  //     js: ['js/one.js', 'js/two.js'],
  //     css: ['css/one.css', 'css/two.css']
  //   },
  //   site: {
  //     js: ['js/scripts.js'],
  //     css: ['css/styles.css']
  //   }
  // };
  //
  // server.pack.require('hapi-assets', assetOptions, function (err) {
  //   if (err) {
  //     console.log('Failed loading plugin cache-buster');
  //   }
  // });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public/assets',
        listing: true
      }
    }
  });

};
