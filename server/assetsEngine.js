(function () {
  'use strict';

  var Fs = require('fs'),
      Path = require('path'),
      Sass = require('node-sass'),
      publicDirectory = Path.join(__dirname, '..','public'),
      assetsDirectory = Path.join(publicDirectory, 'assets'),
      adminScssPath = Path.join(assetsDirectory, 'admin', 'scss');

  module.exports = function () {
    Fs.readdirSync(adminScssPath).forEach(function (name) {
      if (Path.extname(name) === '.scss' || Path.extname(name) === '.sass') {
        Sass.renderFile({
          file: Path.join(adminScssPath, name),
          includePath: [adminScssPath, Path.join(adminScssPath, 'bootflat')],
          outputStyle: 'compressed',
          outFile: Path.join(assetsDirectory, 'admin', 'css', Path.basename(name, Path.extname(name)) + '.css'),
          sourceMaps: true,
          success: function (res) { console.log(res); },
          error: function (err) { console.error(err); }
        });
      }
    });
  };

}).call(this);
